import React,{useState} from "react";
import { Row,Col,Button,Label, Container,Form,Input } from "reactstrap";
import CreatableSelect from "react-select/creatable";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { SlClose } from "react-icons/sl";
const style = { color: "#e85347", fontSize: "11px", fontStyle: "italic" };
const TempForm = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [formDataObject, setFormDataObject] = useState({});

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        reset,
        trigger,
        watch,
        formState: { errors },
      } = useForm();

      const formClass = classNames({
        "form-validate": true,
        "is-alter": "",
      });
      
      const handleStatus = (selectedOption) => {
        setValue("status", selectedOption);
        trigger("status");
      };


      
  function handleImageChange(event) {
    const file = event.target.files[0];
    const fileType = file.type;

    // Check if the file type is one of the accepted types
    if (
      fileType === "image/jpeg" ||
      fileType === "image/png" ||
      fileType === "image/jpg"
    ) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImageUrl(e.target.result);
        setErrorMessage("");
      };
      reader.readAsDataURL(file);
      setErrorMessage("");
    } else {
      // If the file type is not accepted, show an error message
      setErrorMessage(
        "Invalid file type. Please upload a JPG, PNG, or JPEG file."
      );

      formDataObject.profile = file;
    }
    // setValue("profile",event.target.value);
    // trigger("profile");
  }

  function removeImage() {
    setImageUrl("");
  }
      
  const onFormSubmit = (data) => {
    console.log("data", data);
   
  };
  const onError = (errors) => {
    console.log("Errors:", errors);
  };
  return (
    <>
      <div className="formContainer">
        <Container>
          <h2
            style={{
              textAlign: "center",
              backgroundColor: "#A461B0",
              height: "55px",
              color: "white",
              paddingBottom: "2px",
              marginBottom: "20px",
              paddingTop: "11px",
            }}
          >
            {" "}
            User Registration Form
          </h2>
          <span style={{ paddingBottom: "20px" }}></span>
          <Row className={`gy-4 mb-1`}>
            <Col lg={12} xxl={12} md={12}>
              <Form
                action="/createUser"
                method="post"
                enctype="multipart/form-data"
                className={formClass}
                onSubmit={handleSubmit(onFormSubmit, onError)}
              >
                <Row className={`gy-4`}>
                  <Col size="4">
                    <div className="form-group">
                      <Label htmlFor="default-0" className="form-label">
                        <h5>
                          {" "}
                          Param. ID <span style={{ color: "red" }}>*</span>
                        </h5>
                      </Label>
                    </div>
                    <div className="form-control-wrap">
                      <Input type="number" id="num" />
                    </div>
                  </Col>
                  <Col size="4">
                    <div className="form-group">
                      <Label className="from-label" htmlFor="department_name">
                        <h5>Name</h5>
                      </Label>
                    </div>
                    <div className="form-control-wrap">
                      <Input type="text" id="name" />
                    </div>
                  </Col>
                  <Col size="4">
                    <div className="form-group">
                      <Label className="from-label" htmlFor="designation_name">
                        <h5>
                          {" "}
                          Slug <span style={{ color: "red" }}>*</span>
                        </h5>
                      </Label>
                    </div>
                    <div className="form-control-wrap">
                      <Input type="text" id="slug" />
                    </div>
                  </Col>
                </Row>
                <Row className={`gy-4 mt-1`}>
                  <Col sm="4">
                    <div className="form-group">
                      <Label>
                        <h5>
                          {" "}
                          meta Title <span style={{ color: "red" }}>*</span>
                        </h5>
                      </Label>
                    </div>
                    <div className="form-control-wrap">
                      <Input type="text" id="m_title" />
                    </div>
                  </Col>
                  <Col sm="4">
                    <div className="form-group">
                      <Label htmlFor="default-1" className="form-label">
                        <h5>
                          Meta Description{" "}
                          <span style={{ color: "red" }}>*</span>
                        </h5>
                      </Label>
                      <div className="form-control-wrap">
                        <input type="text" id="m_desc" />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className={`gy-4 mt-1`}>
                  <Col className="col-sm-4">
                    <div className="form-group">
                      <Label htmlFor="default-0" className="form-label">
                        <h5> Profile</h5>
                      </Label>

                      <div className="form-control-wrap">
                        <input
                          type="file"
                          id="profile"
                          {...register("profile", { required: true })}
                          onChange={handleImageChange}
                          accept=".jpg, .png, .jpeg"
                        />
                        {imageUrl && (
                          <div>
                            <img
                              src={imageUrl}
                              alt="Preview"
                              style={{ maxWidth: "100%", maxHeight: "200px" }}
                            />
                            <Button onClick={removeImage} style={{}}>
                              <SlClose />
                            </Button>
                          </div>
                        )}
                        {errorMessage && <p>{errorMessage}</p>}
                        {/* {errors.profile && <span style={style}>Profile is required.</span>} */}
                      </div>
                    </div>
                  </Col>

                  <Col sm="4">
                    <div className="form-group">
                      <Label htmlFor="default-1" className="form-label">
                        <h5> Status:</h5>
                      </Label>
                    </div>
                    <div className="form-control-wrap">
                      <CreatableSelect
                        id="status"
                        options={[
                          { label: "1", value: "Active" },
                          { label: "0", value: "Inactive" },
                        ]}
                        {...register("status", { required: true })}
                        value={watch(`status`)}
                        onChange={handleStatus}
                      />
                      {errors.status && (
                        <p style={style}>Status is required.</p>
                      )}
                    </div>
                  </Col>
                </Row>

                <Row className={`gy-4 mt-1`}>
                  <Col className={`gy-4 mt-1`}></Col>
                  <Col className={`gy-4 mt-1`}>
                    <div
                      className="form-group"
                      style={{ verticalAlign: "bottom" }}
                    >
                      <Button color="primary" size="md">
                        Register
                      </Button>
                    </div>
                  </Col>
               
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default TempForm;
