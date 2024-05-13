import React, { useState, useEffect } from "react";
import Head from "../component/Head/Head";
import Header from "../component/header/Header";
import CreatableSelect from "react-select/creatable";
import classNames from "classnames";
import { useNavigate, useLocation } from "react-router-dom";
import { SlClose } from "react-icons/sl";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
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

const style = { color: "#e85347", fontSize: "11px", fontStyle: "italic" };

const container = {
  width: "100%" /* You can adjust the width as needed */,
  margin: " 0 auto" /* Center the container horizontally */,
  padding: "20px" /* Add padding for spacing */,
  boxSizing: "border-box",
  marginTop: "10px" /* Include padding in the width calculation */,
};

const UpdateUser = ({ data }) => {
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
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [StateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedcity, setSelectedCity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [formDataObject, setFormDataObject] = useState({});
  const [gender, setGender] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [user, setUser] = useState([]);
  const formClass = classNames({
    "form-validate": true,
    "is-alter": "",
  });

  useEffect(() => {
    try {
      const Uuser = JSON.parse(data);
      console.log(Uuser.name, "=======================");
      setUser(Uuser);
    } catch (error) {
      console.error("Failed to parse user data", error);
    }
  }, [data]); // Only re-run the effect if `data` changes

  useEffect(() => {
    console.log(user, "user Variable"); // This will log after `user` is updated
    setImageUrl(user.pic);
    if (user && user.gender) {
      const genderValue = user.gender; // Assuming gender is either "male" or "female"
      setGender(genderValue);
    }
    if (user && user.hobbies) {
      const hobbiesValue = user.hobbies; // Assuming hobbies is either "male" or "female"
      setSelectedHobbies(hobbiesValue);
    }
    setDocumentFile(user.document);
    setSelectedStatus({
      value: user.status ? true : false,
      label: user.status ? "Active" : "Inactive",
    });
  }, [user]);

  // Simulated data for countries, States, and cities
  const States = [
    { value: "UP", label: "UP" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Harayana", label: "Harayana" },
  ];

  const districts = [
    { value: "lko", label: "Lucknow", States: "UP" },
    { value: "ba", label: "Ballia", States: "UP" },
    { value: "gn", label: "Gandhinagar", States: "Gujarat" },
    { value: "pa", label: "Panipat", States: "Harayana" },
  ];

  const cities = [
    { value: "lk", label: "Lucknow", districts: "lko" },
    { value: "un", label: "Unnao", districts: "lko" },
    { value: "rs", label: "Rasra", districts: "ba" },
    { value: "sp", label: "Sikandarpur", districts: "ba" },
    { value: "ga", label: "Gandhinagar", districts: "gn" },
    { value: "kl", label: "Kolal", districts: "gn" },
    { value: "pc", label: "Panipat City", districts: "pa" },
    { value: "sk", label: "Samalkha", districts: "pa" },
  ];

  useEffect(() => {
    setStateOptions(States);
  }, []);

  useEffect(() => {
    if (selectedState) {
      const filteredDistrict = districts.filter(
        (districts) => districts.States === selectedState
      );
      setDistrictOptions(filteredDistrict);
      setValue("District", ""); // Reset State value when country changes
      setValue("City", ""); // Reset city value when country changes
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) {
      const filteredCities = cities.filter(
        (cities) => cities.districts === selectedDistrict
      );
      setCityOptions(filteredCities);
      setValue("City", ""); // Reset city value when State changes
    }
  }, [selectedDistrict]);

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption.value);
    setValue("State", selectedOption);
    trigger("State");
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption.value);
    setValue("District", selectedOption);
    trigger("District");
  };

  const handleCityChange = (selectedOption) => {
    setValue("City", selectedOption);
    trigger("City");
  };
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

  // Handler for date change
  const handleDateChange = (date) => {
    const now = moment();
    const pickedDate = moment(date);
    const yearsDifference = now.diff(pickedDate, "years");

    if (yearsDifference < 18) {
      setError("You must be at least 18 years old.");
      setSelectedDate(null); // Optionally reset the date
    } else if (pickedDate.isAfter(now)) {
      setError("Future dates are not allowed.");
      setSelectedDate(null); // Optionally reset the date
    } else {
      // setValue("dob", date);
      setError("");
      setSelectedDate(date);
    }
  };

  const handlemobileChange = (e) => {
    setValue("mobile", e.target.value);
    trigger("mobile");
  };

  const handleEmailChange = (e) => {
    setValue("email", e.target.value);
    trigger("email");
  };

  const handleUsername = (e) => {
    setValue("username", e.target.value);
    trigger("username");
  };

  const handlePassChange = (e) => {
    const newPassword = e.target.value;
    setValue("password", newPassword);
    trigger("password");

    // Check confirm password match on password change
    const confirmPassword = watch("confirmpassword");
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setValue("confirmpassword", confirmPassword);
    trigger("confirmpassword");

    const password = watch("password");
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  // Update the type of input field dynamically based on `passwordShown` state
  const inputType = passwordShown ? "text" : "password";
  const iconClass = passwordShown ? "fa-solid fa-eye" : "fa-solid fa-eye-slash";

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleCheckBox = (event) => {
    const hobby = event.target.value;
    const isChecked = event.target.checked;

    setSelectedHobbies((currentHobbies) => {
      if (isChecked) {
        // Add the selected hobby to the array if checked
        return [...currentHobbies, hobby];
      } else {
        // Remove the hobby from the array if unchecked
        return currentHobbies.filter((item) => item !== hobby);
      }
    });
  };

  const areEnoughHobbiesSelected = () => {
    return selectedHobbies.length >= 2;
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
  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    // You can perform additional checks or validations on the file here if needed
    setDocumentFile(file);
    trigger("document");
  };

  const handleStatus = (selectedOption) => {
    setValue("status", selectedOption);
    trigger("status");
  };
  const handleLogin = () => {
    navigate("/user-list");
  };

  const onFormSubmit = (data) => {
    console.log("data", data);
    alert("Update Success!");
    console.log(gender);
  };

  const onError = (errors) => {
    console.log("Errors:", errors);
  };

  return (
    <>
      <Head title={"Register"} />
      <Navbar />
      <div className="container" style={container}>
        <Header
          mainHeading={"User Registration"}
          subHeading={"Task | Register "}
        />

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
              User Updation Form
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
                            First name <span style={{ color: "red" }}>*</span>
                          </h5>
                        </Label>
                      </div>
                      <div className="form-control-wrap">
                        <Input
                          type="text"
                          id="name"
                          {...register("name", {
                            required: true,
                            pattern: /^[a-zA-Z\s]*$/,
                            minLength: 3,
                            maxLength: 8,
                          })}
                          value={watch(`name`)}
                          onChange={handleInputChange}
                          placeholder={user.name}
                        />
                        {errors.name?.type === "required" && (
                          <span style={style}>Name field is required</span>
                        )}

                        {errors.name?.type === "pattern" && (
                          <span style={style}>
                            Digits and Special Char. are not allowed
                          </span>
                        )}
                        {errors.name?.type === "minLength" && (
                          <span style={style}>Minimum 3 letters.</span>
                        )}
                        {errors.name?.type === "maxLength" && (
                          <span style={style}>Maximum 8 letters</span>
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
                            pattern: /^[a-zA-Z\s]*$/,
                            minLength: 3,
                            maxLength: 15,
                          })}
                          value={watch(`middle_name`)}
                          onChange={handleMiddleName}
                          placeholder={user.middlename}
                        />

                        {errors.middle_name?.type === "pattern" && (
                          <span style={style}>
                            Digits and Special Char. are not allowed
                          </span>
                        )}
                        {errors.middle_name?.type === "minLength" && (
                          <span style={style}>Minimum 3 letters.</span>
                        )}
                        {errors.middle_name?.type === "maxLength" && (
                          <span style={style}>Maximum 15 letters</span>
                        )}
                      </div>
                    </Col>
                    <Col size="4">
                      <div className="form-group">
                        <Label
                          className="from-label"
                          htmlFor="designation_name"
                        >
                          <h5>
                            {" "}
                            Last Name <span style={{ color: "red" }}>*</span>
                          </h5>
                        </Label>
                      </div>
                      <div className="form-control-wrap">
                        <Input
                          type="text"
                          id="last_name"
                          {...register("last_name", {
                            required: true,
                            pattern: /^[a-zA-Z\s]*$/,
                            minLength: 3,
                            maxLength: 15,
                          })}
                          value={watch(`last_name`)}
                          onChange={handleLastName}
                          placeholder={user.last_name}
                        />
                        {errors.last_name?.type === "required" && (
                          <span style={style}>last name field is required</span>
                        )}

                        {errors.last_name?.type === "pattern" && (
                          <span style={style}>
                            Digits and Special Char. are not allowed
                          </span>
                        )}
                        {errors.last_name?.type === "minLength" && (
                          <span style={style}>Minimum 3 letters.</span>
                        )}
                        {errors.last_name?.type === "maxLength" && (
                          <span style={style}>Maximum 15 letters</span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row className={`gy-4 mt-1`}>
                    <Col sm="4">
                      <div className="form-group">
                        <Label>
                          <h5>
                            {" "}
                            DOB <span style={{ color: "red" }}>*</span>
                          </h5>
                        </Label>
                      </div>
                      <div className="form-control-wrap">
                        <DatePicker
                          className="form-control date-picker"
                          selected={selectedDate}
                          onChange={handleDateChange}
                          maxDate={new Date()}
                          showYearDropdown
                          placeholderText={user.dob}
                          dropdownMode="select"
                          dateFormat="dd-MM-yyyy"
                        />
                        {error && <div style={style}>{error}</div>}
                        <div className="form-note">
                          Date Format <code>yyyy-MM-dd</code>
                        </div>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="form-group">
                        <Label htmlFor="default-1" className="form-label">
                          <h5>
                            Mobile no. <span style={{ color: "red" }}>*</span>
                          </h5>
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
                            value={watch(`mobile`)}
                            onChange={handlemobileChange}
                            placeholder={user.mobile}
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
                          <h5>
                            {" "}
                            Email-ID <span style={{ color: "red" }}>*</span>
                          </h5>
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
                            placeholder={user.email}
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
                          <h5>
                            {" "}
                            Username <span style={{ color: "red" }}>*</span>
                          </h5>
                        </Label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            id="username"
                            {...register("username", {
                              required: true,
                              pattern: /^[a-z0-9s]*$/,
                            })}
                            className="form-control"
                            value={watch`username`}
                            onChange={handleUsername}
                            placeholder={user.username}
                          />
                          {errors.username &&
                            errors.username.type === "required" && (
                              <span className="invalid" style={style}>
                                username field is required.(lowercase & digits
                                Only)
                              </span>
                            )}
                          {errors.username &&
                            errors.username.type === "pattern" && (
                              <span className="invalid" style={style}>
                                Invalid input. Only lowerCase & digits are
                                allowed.
                              </span>
                            )}
                        </div>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="form-group">
                        <Label htmlFor="default-1" className="form-label">
                          <h5>
                            {" "}
                            Password <span style={{ color: "red" }}>*</span>
                          </h5>
                        </Label>
                        <div className="form-control-wrap">
                          <input
                            type={inputType}
                            id="password"
                            {...register("password", {
                              required: true,
                              pattern:
                                /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\-]).*(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*\d).{6}$/,
                              minLength: 6,
                              maxLength: 8,
                            })}
                            className="form-control"
                            value={watch("password")}
                            onChange={handlePassChange}
                            placeholder={user.password}
                          />
                          <span
                            className={iconClass}
                            id="toggle-password"
                            onClick={togglePasswordVisibility}
                          ></span>
                          {passwordError && (
                            <span className="error-message" style={style}>
                              {passwordError}
                            </span>
                          )}
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
                          <h5>
                            {" "}
                            Confirm Password{" "}
                            <span style={{ color: "red" }}>*</span>
                          </h5>
                        </Label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            id="confirmpassword"
                            value={watch(`confirmpassword`)}
                            onChange={handleConfirmPasswordChange}
                            className="form-control"
                          />
                        </div>
                        {/* {passwordError && <p style={style}>{passwordError}</p>} */}
                        {passwordError && <p style={style}>{passwordError}</p>}
                      </div>
                    </Col>
                  </Row>
                  <Row className={`gy-4 mt-1`}>
                    <Col>
                      <Label>
                        <h5>
                          Gender <span style={{ color: "red" }}>*</span>
                        </h5>
                      </Label>
                      <div style={{ display: "flex" }}>
                        <br />
                        <input
                          type="radio"
                          className="form-radio"
                          value="male"
                          onChange={handleGenderChange}
                          checked={gender === "male"}
                        />
                        <span className="ml-2">Male</span>

                        <input
                          type="radio"
                          className="form-radio"
                          value="female"
                          onChange={handleGenderChange}
                          checked={gender === "female"}
                        />
                        <span className="ml-2">Female</span>
                      </div>
                      {/* {errors.gender && (
                    <span className="error-message" style={style}>
                      Gender is required.
                    </span>
                  )}{" "} */}
                      {/* Display error message if gender is required */}
                    </Col>
                    <Col>
                      <Label>
                        <h5>Hobbies:&nbsp;&nbsp; &nbsp;</h5>
                      </Label>
                      <div style={{ display: "flex" }}>
                        <FormGroup check>
                          <Input
                            type="checkbox"
                            id="hobby1"
                            value="Singing"
                            onChange={handleCheckBox}
                            checked={selectedHobbies.includes("Singing")}
                          />
                          <Label check for="hobby1">
                            Singing
                          </Label>
                        </FormGroup>
                        <br />
                        <FormGroup check>
                          <Input
                            type="checkbox"
                            id="hobby2"
                            value="Dancing"
                            onChange={handleCheckBox}
                            checked={selectedHobbies.includes("Dancing")}
                          />
                          <Label check for="hobby2">
                            Dancing
                          </Label>
                        </FormGroup>
                        <br />
                        <FormGroup check>
                          <Input
                            type="checkbox"
                            id="hobby3"
                            value="Reading"
                            onChange={handleCheckBox}
                            checked={selectedHobbies.includes("Reading")}
                          />
                          <Label check for="hobby3">
                            Reading
                          </Label>
                        </FormGroup>
                        <br />
                        <FormGroup check>
                          <Input
                            type="checkbox"
                            id="hobby4"
                            value="Coding"
                            onChange={handleCheckBox}
                            checked={selectedHobbies.includes("Coding")}
                          />
                          <Label check for="hobby4">
                            Coding
                          </Label>
                        </FormGroup>
                      </div>
                      {!areEnoughHobbiesSelected() && (
                        <span className="invalid" style={style}>
                          Please select at least two hobbies
                        </span>
                      )}
                    </Col>

                    <Col></Col>
                  </Row>
                  <h5>Address: </h5>
                  <Row className={`gy-4 mt-1`}>
                    <Col size="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="tower">
                          <h5>
                            State <span style={{ color: "red" }}>*</span>
                          </h5>
                        </label>
                        <div className="form-control-wrap">
                          <CreatableSelect
                            className=""
                            id="State"
                            options={StateOptions}
                            {...register("State", { required: true })}
                            value={StateOptions.find(
                              (option) => option.value === selectedState
                            )}
                            onChange={handleStateChange}
                            placeholder={user.state}
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
                          <h5>
                            District <span style={{ color: "red" }}>*</span>
                          </h5>
                        </label>
                        <div className="form-control-wrap">
                          <CreatableSelect
                            className=""
                            id="District"
                            options={districtOptions}
                            {...register("District", { required: true })}
                            value={districtOptions.find(
                              (option) => option.value === selectedDistrict
                            )}
                            onChange={handleDistrictChange}
                            placeholder={user.district}
                          />
                          {errors.District && (
                            <span style={style}>
                              District field is required
                            </span>
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col size="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="tower">
                          <h5>
                            City <span style={{ color: "red" }}>*</span>
                          </h5>
                        </label>
                        <div className="form-control-wrap">
                          <CreatableSelect
                            className=""
                            id="City"
                            options={cityOptions}
                            {...register("City", { required: true })}
                            value={watch(`City`)}
                            onChange={handleCityChange}
                            placeholder={user.city}
                          />
                          {errors.City && (
                            <span style={style}>City field is required</span>
                          )}
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
                            // placeholder={data.pic}
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
                        {user.document && (
                          <p>
                            Current File:{" "}
                            <a
                              href={
                                user.documentUrl ||
                                `path/to/files/${user.document}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {user.document}
                            </a>
                          </p>
                        )}
                      </div>
                      <div className="form-control-wrap">
                        <input
                          type="file"
                          id="document"
                          {...register("document", { required: true })}
                          onChange={handleDocumentChange}
                          accept=".pdf,.doc,.docx,.txt" // Specify accepted file formats if needed
                          // placeholder={user.document}
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
                            { label: "Active", value: true },
                            { label: "Inactive", value: false },
                          ]}
                          {...register("status", { required: true })}
                          value={selectedStatus}
                          onChange={handleStatus}
                          placeholder={selectedStatus.label}
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
                          Update
                        </Button>
                      </div>
                    </Col>
                    <Col md="4" className={`mt-auto`}>
                      <div
                        className="form-group"
                        style={{ verticalAlign: "bottom" }}
                      >
                        <Button color="primary" size="md" onClick={handleLogin}>
                          Cancel
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

export default UpdateUser;
