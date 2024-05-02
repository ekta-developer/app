import ProfileDropdown from "../component/Items/Profile";
import React, { useState, useEffect } from "react";
import Head from "../component/Head/Head";
import Header from "../component/header/Header";
import CreatableSelect from "react-select/creatable";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
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
import img1 from "../images/demo.jpg.jpg";
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
  marginTop: "2px" /* Include padding in the width calculation */,
};
const formContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "126vh",
  marginTop: "2px",
  backgroundColor: "white",
};

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm();

  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState([]);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [documentFile, setDocumentFile] = useState(null);
  const [StateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [gender, setGender] = useState("");

  const formClass = classNames({
    "form-validate": true,
    "is-alter": "",
  });

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

  const handlePasswordChange = (e) => {
    setValue("password", e.target.value);
    trigger("password");
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleCheckBox = (event) => {
    const hobby = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the selected hobby to the selectedHobbies array
      setSelectedHobbies([...selectedHobbies, hobby]);
    } else {
      // Remove the selected hobby from the selectedHobbies array
      setSelectedHobbies(selectedHobbies.filter((item) => item !== hobby));
    }
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
        // setImageUrl(e.target.result);
        setImageUrl(img1);
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
    trigger("document");
  };

  const handleStatus = (selectedOption) => {
    setValue("status", selectedOption);
    trigger("status");
  };
  const handleLogin = () => {
    navigate("/");
  };

  const onFormSubmit = (data) => {
    // Convert selectedHobbies array to a comma-separated string
    data.hobbies = selectedHobbies.join(", ");

    // Log the form data
    console.log("Form Data:", data);

    // Further processing or handling of form submission can be done here
  };

  const [data, setData] = useState([
    {
      id: "1",
      name: "Ekta",
      middle_name: "kapoor",
      last_name: "Srivastava",
      gender: "female",
      dob: "12/3/2009",
      mobile: "657876545",
      email: "admin@gmail.com",
      username: "xyz",
      password: "123456",
      hobbies: ["Singing", "Coding"],
      state: "up",
      district: "lucknow",
      city: "lucknow",
      pic: (
        <div>
          <a href="#" class="avatar">
            <img
              // src={img1}
              alt="User Image"
              style={{ width: "20px", height: "20px" }}
            />
          </a>
        </div>
      ),
      picture: "demo.jpg.jpg",
      document: "resume.pdf",
      status: "active",
    },
  ]);

  const handleUserListClick = () => {
    // Handle User List action
    navigate("/user-list");
    console.log("User List clicked");
  };

  const handleLogoutClick = () => {
    // Handle Logout action
    navigate("/");
    console.log("Logout clicked");
  };

  return (
    <>
      <Head title={"Dashboard"} />
      <ProfileDropdown
        handleUserListClick={handleUserListClick}
        handleLogoutClick={handleLogoutClick}
      />
      <div className="container" style={container}>
        <Header
          mainHeading={"User Dashboard"}
          subHeading={"Task | dashboard "}
        />
        <div className="formContainer">
          <Container>
            <div>
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
                User Details
              </h2>
              <span style={{ paddingBottom: "2px" }}></span>
            </div>

            <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
              <Row className={`gy-4`}>
                <Col size="6">
                  <div className="form-group">
                    <Label htmlFor="default-0" className="form-label">
                      <h5>
                        {" "}
                        First name <span style={{ color: "red" }}>*</span>
                      </h5>
                    </Label>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-control-wrap">
                    <Input
                      disabled
                      type="text"
                      id="name"
                      {...register("name", {
                        required: true,
                        pattern: /^[a-zA-Z\s]*$/,
                        minLength: 3,
                        maxLength: 8,
                      })}
                      value={data[0].name}
                      //value={watch(`name`)}
                      onChange={handleInputChange}
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
              </Row>
              <Row className={`gy-4`}>
                <Col size="6">
                  <div className="form-group">
                    <Label className="from-label" htmlFor="department_name">
                      <h5> Middle Name</h5>
                    </Label>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-control-wrap">
                    <Input
                      disabled
                      type="text"
                      id="middle_name"
                      {...register("middle_name", {
                        pattern: /^[a-zA-Z\s]*$/,
                        minLength: 3,
                        maxLength: 15,
                      })}
                      value={data[0].middle_name}
                      // value={watch(`middle_name`)}
                      onChange={handleMiddleName}
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
              </Row>
              <Row className={`gy-4`}>
                <Col size="6">
                  <div className="form-group">
                    <Label className="from-label" htmlFor="designation_name">
                      <h5>
                        {" "}
                        Last Name <span style={{ color: "red" }}>*</span>
                      </h5>
                    </Label>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-control-wrap">
                    <Input
                      disabled
                      type="text"
                      id="last_name"
                      {...register("last_name", {
                        required: true,
                        pattern: /^[a-zA-Z\s]*$/,
                        minLength: 3,
                        maxLength: 15,
                      })}
                      value={data[0].last_name}
                      // value={watch(`last_name`)}
                      onChange={handleLastName}
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
                <Col size="6">
                  <div className="form-group">
                    <Label>
                      <h5>
                        {" "}
                        DOB <span style={{ color: "red" }}>*</span>
                      </h5>
                    </Label>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-control-wrap">
                    <Input
                      disabled
                      className="form-control date-picker"
                      id="date"
                      value={data[0].dob}
                      // value={watch(`dob`)}
                      onChange={handleDateChange}
                    />
                    {error && <span style={style}>{error}</span>}
                    <div className="form-note">
                      Date Format <code>yyyy-MM-dd</code>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className={`gy-4`}>
                <Col size="6">
                  <div className="form-group">
                    <Label htmlFor="default-1" className="form-label">
                      <h5>
                        Mobile no. <span style={{ color: "red" }}>*</span>
                      </h5>
                    </Label>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-control-wrap">
                    <input
                      disabled
                      type="text"
                      id="mobile"
                      {...register("mobile", {
                        required: true,
                        minLength: 10,
                        maxLength: 10,
                        pattern: /^[6-9]\d{9}$/,
                      })}
                      className="form-control"
                      value={data[0].mobile}
                      // value={watch(`mobile`)}
                      onChange={handlemobileChange}
                    />
                    {errors.mobile && errors.mobile.type === "required" && (
                      <span className="invalid" style={style}>
                        Mobile field is required
                      </span>
                    )}
                    {errors.mobile && errors.mobile.type === "minLength" && (
                      <span className="invalid" style={style}>
                        Invalid input.Min- 10 digits are allowed
                      </span>
                    )}
                    {errors.mobile && errors.mobile.type === "maxLength" && (
                      <span className="invalid" style={style}>
                        Invalid input.Max- 10 digits are allowed
                      </span>
                    )}
                    {errors.mobile && errors.mobile.type === "pattern" && (
                      <span className="invalid" style={style}>
                        Recheck number!. Starts from (6-9) only.
                      </span>
                    )}
                  </div>
                </Col>
              </Row>
              <Row className={`gy-4`}>
                <Col size="6">
                  <div className="form-group">
                    <Label htmlFor="default-1" className="form-label">
                      <h5>
                        {" "}
                        Email-ID <span style={{ color: "red" }}>*</span>
                      </h5>
                    </Label>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-control-wrap">
                    <input
                      disabled
                      type="text"
                      id="email"
                      {...register("email", {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      })}
                      className="form-control"
                      value={data[0].email}
                      // value={watch(`email`)}
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
                </Col>
              </Row>

              <Row className={`gy-4 mt-1`}>
                <Col size="6">
                  <div className="form-group">
                    <Label htmlFor="default-1" className="form-label">
                      <h5>
                        {" "}
                        Username <span style={{ color: "red" }}>*</span>
                      </h5>
                    </Label>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-control-wrap">
                    <input
                      disabled
                      type="text"
                      id="username"
                      {...register("username", {
                        required: true,
                        pattern: /^[a-z0-9s]*$/,
                      })}
                      className="form-control"
                      value={data[0].username}
                      // value={watch`username`}
                      onChange={handleUsername}
                    />
                    {errors.username && errors.username.type === "required" && (
                      <span className="invalid" style={style}>
                        username field is required.(lowercase & digits Only)
                      </span>
                    )}
                    {errors.username && errors.username.type === "pattern" && (
                      <span className="invalid" style={style}>
                        Invalid input. Only lowerCase & are allowed.
                      </span>
                    )}
                  </div>
                </Col>
              </Row>
              <Row className={`gy-4`}>
                <Col size="6">
                  <div className="form-group">
                    <Label htmlFor="default-1" className="form-label">
                      <h5>
                        {" "}
                        Password <span style={{ color: "red" }}>*</span>
                      </h5>
                    </Label>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-control-wrap">
                    <input
                      disabled
                      // type={showPassword ? "text" : "password"}
                      type="text"
                      id="password"
                      {...register("password", {
                        required: true,
                        pattern:
                          /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\-]).*(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*\d).{6}$/,
                        minLength: 6,
                        maxLength: 8,
                      })}
                      value={data[0].password}
                      // value={watch(`password`)}
                      onChange={handlePasswordChange}
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
                    {errors.password && errors.password.type === "required" && (
                      <span className="error-message" style={style}>
                        Password field is required.
                      </span>
                    )}
                    {errors.password && errors.password.type === "pattern" && (
                      <span className="error-message" style={style}>
                        Include digits, lowercase, uppercase, and special
                        character
                      </span>
                    )}
                  </div>
                </Col>
              </Row>
              <Row className={`gy-4`}>
                <Col size="6">
                  <div className="form-group">
                    <Label htmlFor="default-1" className="form-label">
                      <h5>
                        {" "}
                        Confirm Password <span style={{ color: "red" }}>*</span>
                      </h5>
                    </Label>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-control-wrap">
                    <input
                      disabled
                      type="password"
                      id="state"
                      // value={watch(`state`)}

                      // onChange={handlestateChange}
                      className="form-control"
                    />
                  </div>
                  {passwordError && <p style={style}>{passwordError}</p>}
                </Col>
              </Row>
              <Row className={`gy-4 mt-1`}>
                <Col size="6">
                  <Label>
                    <h5>
                      Gender <span style={{ color: "red" }}>*</span>
                    </h5>
                  </Label>
                </Col>
                <Col size="6">
                  <div style={{ display: "flex" }}>
                    <br />
                    <input
                      disabled
                      type="radio"
                      className="form-radio"
                      value="male"
                      onChange={handleGenderChange}
                      checked={false}
                      // checked={gender === "male"}
                    />
                    <span className="ml-2">Male</span>

                    <input
                      disabled
                      type="radio"
                      className="form-radio"
                      value="female"
                      onChange={handleGenderChange}
                      checked={true}
                      // checked={gender === "female"}
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
              </Row>
              <Row className={`gy-4`}>
                <Col size="6">
                  <Label>
                    <h5>
                      Hobbies <span style={{ color: "red" }}>*</span>{" "}
                      &nbsp;&nbsp; &nbsp;
                    </h5>{" "}
                  </Label>
                </Col>
                <Col size="6">
                  <div style={{ display: "flex" }}>
                    <FormGroup check>
                      <Input
                        disabled
                        type="checkbox"
                        id="hobby1"
                        {...register("hobbies", { required: true })}
                        value="Singing"
                        onChange={handleCheckBox}
                        checked={false}
                        // checked={selectedHobbies.includes("Singing")}
                      />
                      <Label check for="hobby1">
                        Singing
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        disabled
                        type="checkbox"
                        id="hobby2"
                        {...register("hobbies", { required: true })}
                        value="Dancing"
                        onChange={handleCheckBox}
                        checked={true}
                        // checked={selectedHobbies.includes("Dancing")}
                      />
                      <Label check for="hobby2">
                        Dancing
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        disabled
                        type="checkbox"
                        id="hobby3"
                        {...register("hobbies", { required: true })}
                        value="Reading"
                        onChange={handleCheckBox}
                        checked={false}
                        // checked={selectedHobbies.includes("Reading")}
                      />
                      <Label check for="hobby3">
                        Reading
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        disabled
                        type="checkbox"
                        id="hobby4"
                        {...register("hobbies", { required: true })}
                        value="Coding"
                        onChange={handleCheckBox}
                        checked={true}
                        // checked={selectedHobbies.includes("Coding")}
                      />
                      <Label check for="hobby3">
                        Coding
                      </Label>
                    </FormGroup>
                  </div>
                  {!areEnoughHobbiesSelected() && (
                    <span className="invalid" style={style}>
                      {/* Please select at least two hobbies */}
                    </span>
                  )}
                </Col>
              </Row>
              <h5>Address: </h5>
              <Row className={`gy-4 mt-1`}>
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="tower">
                      <h5>
                        State <span style={{ color: "red" }}>*</span>
                      </h5>
                    </label>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-control-wrap">
                    <input
                      disabled
                      type="text"
                      id="state"
                      {...register("state", {
                        required: true,
                        pattern: /^[a-z0-9s]*$/,
                      })}
                      className="form-control"
                      value={data[0].state}
                    />

                    {errors.State && (
                      <span style={style}>State field is required</span>
                    )}
                  </div>
                </Col>
              </Row>
              <Row className={`gy-4`}>
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="tower">
                      <h5>
                        District <span style={{ color: "red" }}>*</span>
                      </h5>
                    </label>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-control-wrap">
                    <input
                      disabled
                      type="text"
                      id="district"
                      {...register("district", {
                        required: true,
                        pattern: /^[a-z0-9s]*$/,
                      })}
                      className="form-control"
                      value={data[0].district}
                    />
                    {errors.District && (
                      <span style={style}>District field is required</span>
                    )}
                  </div>
                </Col>
              </Row>
              <Row className={`gy-4`}>
                <Col size="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="tower">
                      <h5>
                        City <span style={{ color: "red" }}>*</span>
                      </h5>
                    </label>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-control-wrap">
                    <input
                      disabled
                      type="text"
                      id="city"
                      {...register("city", {
                        required: true,
                        pattern: /^[a-z0-9s]*$/,
                      })}
                      className="form-control"
                      value={data[0].city}
                    />
                    {errors.City && (
                      <span style={style}>City field is required</span>
                    )}
                  </div>
                </Col>
              </Row>
              <Row className={`gy-4 mt-1`}>
                <Col size="6">
                  <div className="form-group">
                    <Label htmlFor="default-0" className="form-label">
                      <h5>
                        {" "}
                        Profile <span style={{ color: "red" }}>*</span>
                      </h5>
                    </Label>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-control-wrap">
                    <input
                      disabled
                      type="file"
                      id="profile"
                      {...register("profile", { required: true })}
                      onChange={handleImageChange}
                      accept=".jpg, .png, .jpeg"
                    />
                    {/* {imageUrl && ( */}
                    <div>
                      <img
                        src={img1}
                        alt="Preview"
                        style={{ maxWidth: "100%", maxHeight: "200px" }}
                      />
                      <Button onClick={removeImage} style={{}}>
                        <SlClose />
                      </Button>
                    </div>
                    {/* )} */}
                    {errorMessage && <p>{errorMessage}</p>}
                    {/* {errors.profile && <span style={style}>Profile is required.</span>} */}
                  </div>
                </Col>
              </Row>
              <Row className={`gy-4`}>
                <Col size="6">
                  <div className="form-group">
                    <Label htmlFor="default-1" className="form-label">
                      <h5>
                        {" "}
                        Document <span style={{ color: "red" }}>*</span>
                      </h5>
                    </Label>
                  </div>
                </Col>
                <Col size="6">
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
              </Row>
              <Row className={`gy-4`}>
                <Col size="6">
                  <div className="form-group">
                    <Label htmlFor="default-1" className="form-label">
                      <h5>
                        {" "}
                        Status <span style={{ color: "red" }}>*</span>
                      </h5>
                    </Label>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-control-wrap">
                    <input
                      disabled
                      type="text"
                      id="status"
                      {...register("status", {
                        required: true,
                        pattern: /^[a-z0-9s]*$/,
                      })}
                      className="form-control"
                      value={data[0].status}
                    />
                    {errors.status && <p style={style}>Status is required.</p>}
                  </div>
                </Col>
              </Row>

              {/* <Row className={`gy-4 mt-1`}>
               
                    <Col sm="4" className={`mt-auto`}>
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
                        <Button color="primary" size="md" onClick={handleLogin}>
                          Login
                        </Button>
                      </div>
                   
                  </Row> */}
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
