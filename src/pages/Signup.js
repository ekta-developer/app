import React, { useState, useEffect } from "react";
import Head from "../component/Head/Head";
import Header from "../component/header/Header";
import CreatableSelect from "react-select/creatable";
import { useNavigate } from "react-router-dom";
import { SlClose } from "react-icons/sl";
import {
  Container,
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  FormGroup,
} from "reactstrap";
import { useForm } from "react-hook-form";
import Navbar from "../component/navbar/Navbar";

// Function to validate date format
const isValidDate = (dateString) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return false; // Invalid date
  return true;
};

// Function to calculate age
const calculateAge = (dob) => {
  const dobDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < dobDate.getDate())
  ) {
    age--;
  }
  return age;
};

const style = { color: "#e85347", fontSize: "11px", fontStyle: "italic" };

const container = {
  width: "100%" /* You can adjust the width as needed */,
  margin: " 0 auto" /* Center the container horizontally */,
  padding: "20px" /* Add padding for spacing */,
  boxSizing: "border-box",
  marginTop: "10px" /* Include padding in the width calculation */,
};
const formContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "126vh",
  marginTop: "20px",
  backgroundColor: "white",
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setValue,

    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm();
  const navigate=useNavigate();
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [documentFile, setDocumentFile] = useState(null);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedHobbies,setSelectedHobbies]= useState([]);
   // Simulated data for countries, states, and cities
  const countries = [
    { value: 'usa', label: 'USA' },
    { value: 'canada', label: 'Canada' },
    { value: 'uk', label: 'UK' }
  ];

  const states = [
    { value: 'ny', label: 'New York', country: 'usa' },
    { value: 'ca', label: 'California', country: 'usa' },
    { value: 'on', label: 'Ontario', country: 'canada' }
  ];

  const cities = [
    { value: 'nyc', label: 'New York City', state: 'ny' },
    { value: 'la', label: 'Los Angeles', state: 'ca' },
    { value: 'toronto', label: 'Toronto', state: 'on' }
  ];
  
  
  useEffect(() => {
    setCountryOptions(countries);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const filteredStates = states.filter(state => state.country === selectedCountry);
      setStateOptions(filteredStates);
      setValue('State', ''); // Reset state value when country changes
      setValue('City', ''); // Reset city value when country changes
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const filteredCities = cities.filter(city => city.state === selectedState);
      setCityOptions(filteredCities);
      setValue('City', ''); // Reset city value when state changes
    }
  }, [selectedState]);


  const handleCountryChange = selectedOption => {
    setSelectedCountry(selectedOption.value);
    setValue("Country", selectedOption);
    trigger("Country");
  };

  const handleStateChange = selectedOption => {
    setSelectedState(selectedOption.value);
    setValue("State" ,selectedOption);
    trigger("State");
  };

  const handleCityChange=(selectedOption)=>{
    setValue("City",selectedOption);
    trigger("City");
  }
  const handleInputChange = (e) => {
    // Trigger validation for the "name" field
    setValue("name", e.target.value);
    trigger("name");
  };
  const handleMiddleName = (e) => {
    setValue("middle_name", e.target.value);
    trigger("middle_name");
  };
  const handleLastName = (e) => {
    setValue("last_name", e.target.value);
    trigger("last_name");
  };
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    if (!isValidDate(newDate)) {
      setError("Invalid date format. Please use yyyy-MM-dd.");
    } else if (new Date(newDate) > new Date()) {
      setError("Date cannot be in the future.");
    } else {
      setError("");
      setDob(newDate);
      const age = calculateAge(newDate);
      if (age < 18) {
        setError("Age must be greater than 18 years.");
      }
    }
  };

  const handleEmailChange = (e) => {
    setValue("email", e.target.value);
    trigger("email");
  };

  // useEffect(() => {
  //   if (password && confirmPassword && password !== confirmPassword) {
  //     setPasswordError("Passwords don't match");
  //   } else {
  //     setPasswordError("");
  //   }
  // }, [password, confirmPassword]);

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  //   trigger("password");
  // };

  // const handleConfirmPasswordChange = (event) => {
  //   setConfirmPassword(event.target.value);
  // };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

const handleGender=(selectedOption)=>{
  setValue("gender",selectedOption);
  trigger("gender");
}

const handleCheckBox=(event)=>{
  const hobby = event.target.value;
  if (event.target.checked) {
      setSelectedHobbies([...selectedHobbies, hobby]);
  } else {
      setSelectedHobbies(selectedHobbies.filter(selectedHobby => selectedHobby !== hobby));
  }
};
const areEnoughHobbiesSelected = () => {
  return selectedHobbies.length >= 2;
}

  const onFormSubmit = (e) => {
    console.log(e,"data");
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
    }
    // setValue("profile",event.target.value);
    // trigger("profile");
  }

  function removeImage() {
    setImageUrl("");
  }
  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    // You can perform additional checks or validations on the file here if needed
    setDocumentFile(file);
    trigger("")
  };

  const handleStatus=(selectedOption)=>{
    setValue("status",selectedOption)
    trigger("status");
  }
 const handleLogin=()=>{
  navigate("/")
 }
  return (
    <>
      <Head title={"Register"} />
      <Navbar />
      <div className="container" style={container}>
        <Header
          mainHeading={"User Registration"}
          subHeading={"Task | Register "}
        />

        <div className="formContainer" style={formContainer}>
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
                <Form onSubmit={handleSubmit(console.log("Data"))} id="form">
                  <Row className={`gy-4`}>
                    <Col size="4">
                      <div className="form-group">
                        <Label htmlFor="default-0" className="form-label">
                          <h5> First name</h5>
                        </Label>
                      </div>
                      <div className="form-control-wrap">
                        <Input
                          type="text"
                          id="name"
                          {...register("name", {
                            required: true,
                            pattern: /^[a-zA-Z\s]*$/,
                          })}
                          value={watch(`name`)}
                          onChange={handleInputChange}
                        />
                        {errors.name?.type === "required" && (
                          <span style={style}>Name field is required</span>
                        )}

                        {errors.name?.type === "pattern" && (
                          <span style={style}>Digits are not allowed</span>
                        )}
                      </div>
                    </Col>
                    <Col size="4">
                      <div className="form-group">
                        <Label className="from-label" htmlFor="department_name">
                          <h5> Middle Name</h5>
                        </Label>
                      </div>
                      <div className="form-control-wrap">
                        <Input
                          type="text"
                          id="middle_name"
                          {...register("middle_name", {
                            required: true,
                            pattern: /^[a-zA-Z\s]*$/,
                          })}
                          value={watch(`middle_name`)}
                          onChange={handleMiddleName}
                        />
                        <span className="invalid">
                          {errors.middle_name?.type === "required" && (
                            <span style={style}>
                              middle_name field is required
                            </span>
                          )}
                          {errors.middle_name?.type === "pattern" && (
                            <span style={style}>Digits are not allowed</span>
                          )}
                        </span>
                      </div>
                    </Col>
                    <Col size="4">
                      <div className="form-group">
                        <Label
                          className="from-label"
                          htmlFor="designation_name"
                        >
                          <h5> Last Name</h5>
                        </Label>
                      </div>
                      <div className="form-control-wrap">
                        <Input
                          type="text"
                          id="last_name"
                          {...register("last_name", {
                            required: true,
                            pattern: /^[a-zA-Z\s]*$/,
                          })}
                          value={watch(`last_name`)}
                          onChange={handleLastName}
                        />
                        <span className="invalid">
                          {errors.last_name?.type === "required" && (
                            <span style={style}>
                              last_name field is required
                            </span>
                          )}
                          {errors.last_name?.type === "pattern" && (
                            <span style={style}>Digits are not allowed</span>
                          )}
                        </span>
                      </div>
                    </Col>
                  </Row>
                  <Row className={`gy-4 mt-1`}>
                    <Col sm="4">
                      <div className="form-group">
                        <Label>
                          <h5> DOB</h5>
                        </Label>
                      </div>
                      <div className="form-control-wrap">
                        <Input
                          className="form-control date-picker"
                          id="date"
                          value={watch(`dob`)}
                          onChange={handleDateChange}
                        />
                        {error && <span style={style}>{error}</span>}
                        <div className="form-note">
                          Date Format <code>yyyy-MM-dd</code>
                        </div>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="form-group">
                        <Label htmlFor="default-1" className="form-label">
                          <h5>Mobile no.</h5>
                        </Label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            id="mobile"
                            {...register("mobile", {
                              required: true,
                              minLength: 10,
                              maxLength: 10,
                              pattern: /^[6-9]\d{9}$/,
                            })}
                            className="form-control"
                          />
                          {errors.mobile &&
                            errors.mobile.type === "required" && (
                              <span className="invalid" style={style}>
                                Mobile field is required
                              </span>
                            )}
                          {errors.mobile &&
                            errors.mobile.type === "minLength" && (
                              <span className="invalid" style={style}>
                                Invalid input.Min- 10 digits are allowed
                              </span>
                            )}
                          {errors.mobile &&
                            errors.mobile.type === "maxLength" && (
                              <span className="invalid" style={style}>
                                Invalid input.Max- 10 digits are allowed
                              </span>
                            )}
                          {errors.mobile &&
                            errors.mobile.type === "pattern" && (
                              <span className="invalid" style={style}>
                                Recheck number!. Starts from (6-9) only.
                              </span>
                            )}
                        </div>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="form-group">
                        <Label htmlFor="default-1" className="form-label">
                          <h5> Email-ID:</h5>
                        </Label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            id="email"
                            {...register("email", {
                              required: true,
                              pattern:
                                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            })}
                            className="form-control"
                            value={watch(`email`)}
                            onChange={handleEmailChange}
                          />
                          {errors.email && errors.email.type === "required" && (
                            <span className="invalid" style={style}>
                              Email field is required
                            </span>
                          )}
                          {errors.email && errors.email.type === "pattern" && (
                            <span className="invalid" style={style}>
                              Invalid input.Format: (xyz@gmail.com)
                            </span>
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className={`gy-4 mt-1`}>
                    <Col sm="4">
                      <div className="form-group">
                        <Label htmlFor="default-1" className="form-label">
                          <h5> Username</h5>
                        </Label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            id="username"
                            {...register("username", {
                              required: true,
                              pattern: /^[a-zs]*$/,
                            })}
                            className="form-control"
                          />
                          {errors.username &&
                            errors.username.type === "required" && (
                              <span className="invalid" style={style}>
                                username field is required.(lowercase Only)
                              </span>
                            )}
                          {errors.username &&
                            errors.username.type === "pattern" && (
                              <span className="invalid" style={style}>
                                Invalid input. Only lowerCase are allowed
                              </span>
                            )}
                        </div>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="form-group">
                        <Label htmlFor="default-1" className="form-label">
                          <h5> Password</h5>
                        </Label>
                        <div className="form-control-wrap">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                         
                            {...register("password", {
                              required: true,
                              pattern:
                                /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\-]).*(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*\d).{6}$/,
                              minLength: 6,
                              maxLength: 8,
                            })}
                            value={watch(`password`)}
                            // onChange={handlePasswordChange}
                            className="form-control"
                          />
                          <span
                            className={`eye-icon ${
                              showPassword
                                ? "fa-solid fa-eye"
                                : "fa-solid fa-eye-slash"
                            }`}
                            onClick={toggleShowPassword}
                          ></span>
                          {errors.password &&
                            errors.password.type === "minLength" && (
                              <span className="error-message" style={style}>
                                Invalid input. Min-6 digits are allowed
                              </span>
                            )}
                          {errors.password &&
                            errors.password.type === "maxLength" && (
                              <span className="error-message" style={style}>
                                Invalid input. Max-8 digits are allowed
                              </span>
                            )}
                          {errors.password &&
                            errors.password.type === "required" && (
                              <span className="error-message" style={style}>
                                Password field is required.
                              </span>
                            )}
                          {errors.password &&
                            errors.password.type === "pattern" && (
                              <span className="error-message" style={style}>
                                Include digits, lowercase, uppercase, and
                                special character
                              </span>
                            )}
                        </div>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="form-group">
                        <Label htmlFor="default-1" className="form-label">
                          <h5> Confirm Password</h5>
                        </Label>
                        <div className="form-control-wrap">
                          <input
                            type="password"
                            id="confirmpassword"
                            value={watch(`confirmpassword`)}
                            // onChange={handleConfirmPasswordChange}
                            className="form-control"
                          />
                        </div>
                        {passwordError && <p style={style}>{passwordError}</p>}
                      </div>
                    </Col>
                  </Row>
                  <Row className={`gy-4 mt-1`}>
                    <Col>
                      <Label>
                        <h5>Gender</h5>
                      </Label>
                      <div style={{ display: "flex" }}>
                        <br />
                        <FormGroup check>
                          <Input
                            name="gender"
                            type="radio"
                            {...register("gender", { required: true })} // Use register to include validation rules
                             value={watch(`gender`)}
                            onChange={handleGender}
                        />
                          <Label check>Male</Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input
                            name="gender"
                            type="radio"
                            {...register("gender", { required: true })} // Use register to include validation rules
                            value={watch(`gender`)}
                           onChange={handleGender}
                       />
                          <Label check>Female</Label>
                        </FormGroup>
                      </div>
                      {errors.gender && (
                        <span className="error-message" style={style}>
                          Gender is required.
                        </span>
                      )}{" "}
                      {/* Display error message if gender is required */}
                    </Col>
                    <Col>
                      <Label>
                        <h5>Hobbies:&nbsp;&nbsp; &nbsp;</h5>{" "}
                      </Label>
                      <div style={{ display: "flex" }}>
                        <FormGroup check>
                          <Input
                            type="checkbox"
                            id="hobby1"
                            {...register("hobbies", { required: true })}
                            value="Singing"
                            onChange={handleCheckBox}
                            checked={selectedHobbies.includes('Singing')} 
                          />
                          <Label check for="hobby1">
                            Singing
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input
                            type="checkbox"
                            id="hobby2"
                            {...register("hobbies", { required: true })}
                            value="Dancing"
                            onChange={handleCheckBox}
                            checked={selectedHobbies.includes('Dancing')} 
                          />
                          <Label check for="hobby2">
                            Dancing
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input
                            type="checkbox"
                            id="hobby3"
                            {...register("hobbies", { required: true })}
                            value="Reading"
                            onChange={handleCheckBox}
                            checked={selectedHobbies.includes('Reading')} 
                          />
                          <Label check for="hobby3">
                            Reading
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input
                            type="checkbox"
                            id="hobby4"
                            {...register("hobbies", { required: true })}
                            value="Coding"
                            onChange={handleCheckBox}
                            checked={selectedHobbies.includes('Coding')} 
                          />
                          <Label check for="hobby3">
                            Coding
                          </Label>
                        </FormGroup>
                      </div>
                      {!areEnoughHobbiesSelected() && <span
                                                        className="invalid"
                                                        style={style}
                                                    >
                                                        Please select at least two hobbies</span>}

                    </Col>
                    <Col></Col>
                  </Row>
                  <h5>Address:</h5>
                  <Row className={`gy-4 mt-1`}>
                    <Col size="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="tower">
                          <h5>Country</h5>
                        </label>
                        <div className="form-control-wrap">
                          <CreatableSelect
                            className=""
                            id="Country"
                            options={countryOptions}
                            {...register("Country", { required: true })}
                           onChange={handleCountryChange}
                            value={countryOptions.find(option => option.value === selectedCountry)}
                            
                          />
                          {errors.Country && (
                            <span style={style}>Country field is required</span>
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col size="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="tower">
                          <h5>State</h5>
                        </label>
                        <div className="form-control-wrap">
                          <CreatableSelect
                            className=""
                            id="State"
                            options={stateOptions}
                            {...register("State", { required: true })}
                           
                            value={stateOptions.find(option => option.value === selectedState)}
                            onChange={handleStateChange}
                          />
                          {errors.State && (
                            <span style={style}>State field is required</span>
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col size="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="tower">
                          <h5>City</h5>
                        </label>
                        <div className="form-control-wrap">
                          <CreatableSelect
                            className=""
                            id="City"
                            options={cityOptions}
                            {...register("City", { required: true })}
                         
                            value={watch(`City`)}
                            onChange={handleCityChange}
                          />
                          {errors.City && (
                            <span style={style}>City field is required</span>
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className={`gy-4 mt-1`}>
                    <Col size="4">
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
                          <h5> Document:</h5>
                        </Label>
                      </div>
                      <div className="form-control-wrap">
                        <input
                          type="file"
                          id="document"
                          {...register("document", { required: true })}
                          onChange={handleDocumentChange}
                          accept=".pdf,.doc,.docx,.txt" // Specify accepted file formats if needed
                        />
                          {/* {errors.document && <p style={style}>Document is required.</p>} */}
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
                            { label: "Active", value: "Active" },
                            { label: "Inactive", value: "Inactive" },
                          ]}
                          {...register("status", { required: true })}
                          value={watch(`status`)}
                          onChange={handleStatus}
                        />
                           {errors.status && <p style={style}>Status is required.</p>}
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
                    <Col md="4" className={`mt-auto`}>
                      <div
                        className="form-group"
                        style={{ verticalAlign: "bottom" }}
                      >
                        <Button color="primary" size="md"onClick={handleLogin}>
                          Login
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default SignUp;
