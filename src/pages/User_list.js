import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigateavigate } from "react-router-dom";
import { Badge, Button, Form, Label, Modal, Row, ModalBody } from "reactstrap";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import Header from "../component/header/Header";
import DataTable from "react-data-table-component";
import Head from "../component/Head/Head";
import Navbar from "../component/navbar/Navbar";
import img1 from "../images/login.jpg";
import { useForm } from "react-hook-form";
import { getUserListApi } from "../api/Api";
const container = {
  width: "100%" /* You can adjust the width as needed */,
  margin: " 0 auto" /* Center the container horizontally */,
  padding: "20px" /* Add padding for spacing */,
  boxSizing: "border-box",
  marginTop: "10px" /* Include padding in the width calculation */,
};

const User_list = () => {
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userData, setUserData]= useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    trigger,
    reset,
  } = useForm();
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const handleEdit = (data) => {
    navigate("/register", { state: JSON.stringify(data) });
  };

  const handleDelete = () => {
    toggleDeleteModal();
    setIsOpen(false);
    setDeleteModal(true);
    setRowData(data);
    setValue("id", data.id);
    console.log(data);
    console.log("delete", data, deleteModal);
  };

  const deleteRow = () => {
    const bodyData = {
      id: watch("id"),
    };
    console.log(bodyData, "del");
    setDeleteModal(false);
  };
  const [columns, setColumns] = useState([
    {
      name: <h4>Name</h4>,
      selector: (row) => row.name,
      // selector: (row) => {
      //   const { firstname, middlename, lastname } = row;
      //   let fullName = firstname || '';  // Start with firstname or empty string
    
      //   if (middlename) {
      //     fullName += (fullName.length > 0 ? ' ' : '') + middlename;
      //   }
      //   if (lastname) {
      //     fullName += (fullName.length > 0 ? ' ' : '') + lastname;
      //   }
    
      //   return fullName;
      // },
      sortable: true,
    },    
    {
      name: <h4>Gender</h4>,
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: <h4>DOB</h4>,
      selector: (row) => row.dob,
      sortable: true,
    },
    {
      name: <h4>Mobile</h4>,
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: <h4>E-mail</h4>,
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: <h4>Username</h4>,
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: <h4>Hobbies</h4>,
      selector: (row) => row.hobbies,
      sortable: true,
    },
    {
      name: <h4>State</h4>,
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: <h4>District</h4>,
      selector: (row) => row.district,
      sortable: true,
    },
    {
      name: <h4>City</h4>,
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: <h4>Profile Picture</h4>,
      selector: (row) => row.profile,
      sortable: true,
      // cell: (row) => (
      //   <div style={{ width: "50rem" }}>
      //     <img src={`http://localhost:8000/api/img/${row.profile}`} alt="Profile" style={{ width: "100%", height: "auto" }} />
      //   </div>
      cell: (row) => (
        <div style={{ width: "50rem" }}>
          <img src={img1} alt="Profile" style={{ width: "20px%", height: "20px" }} />
        </div>
      ),
    },
    {
      name: <h4>Document</h4>,
      selector: (row) => row.document,
      sortable: true,
      cell: (row) => <div>
        <a href={row.document} target="_blank">{row.document}</a>
      </div>,
    },
    {
      name: <h4>Status</h4>,
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        // <Badge color={`outline-${row.status === true ? "success" : "danger"}`}>
        //   <h3>{row.status === true ? "Active" : "Inactive"}</h3>
        // </Badge>
        <Badge className={`badge bg-${row.status === true ? "success":"danger" }` }>
          <h6>{row.status === true ? "Active" : "Inactive"}</h6>
        </Badge>
      ),
    },
    {
      name: <h4>Action</h4>,
      cell: (row) => (
        <div style={{ display: "flex" }}>
          <Button
            outline
            color={`warning`}
            className={`me-1`}
            onClick={() => handleEdit(row)}
          >
            {" "}
            <FiEdit />
          </Button>
          <Button outline color={`danger`} onClick={() => handleDelete(row)}>
            {" "}
            <MdDeleteOutline />
          </Button>
        </div>
      ),
    },
  ]);
 
  const [data, setData] = useState([
    {
      id: "1",
      name: "ekta",
      middlename:"kapoor",
      last_name:"Srivastava",
      gender: "female",
      dob: "20/03/2002",
      mobile: "657876545",
      email: "admin@gmail.com",
      username: "xyz",
      password: "123456",
      hobbies: ["Singing","Dancing"],
      state:"up",
      district: "lucknow",
      city: "lucknow",
      pic: img1, // Store the image URL instead of JSX element
      document:"https://www.hse.ie/eng/about/who/acute-hospitals-division/woman-infants/clinical-guidelines/guideline-developer-information-sheet.pdf",
      status: true,
    },
    {
      id: "2",
      name: "Keshav ",
      middlename:"kumar",
      last_name:"mohan",
      gender: "male",
      dob: "12/06/1999",
      mobile: "9877654554",
      email: "admin@gmail.com",
      username: "xyz",
      password: "123456",
      hobbies: ["Reading","Coding"],
      state: "up",
      district: "lucknow",
      city: "lucknow",
      pic:img1, // Store the image URL instead of JSX element
      document:"https://www.hse.ie/eng/about/who/acute-hospitals-division/woman-infants/clinical-guidelines/guideline-developer-information-sheet.pdf",
      status: false,
    },
  ]);
  
// useEffect(()=>{
//   getUserData();
// },[])

const getUserData=()=>{
    getUserListApi()
      .then((res) => {
        console.log(res);
        console.log(res.data,"table-data")
        setUserData(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Head title={"User-List"} />
      <Navbar />
      <div className="container" style={container}>
        <Header
          mainHeading={"Displayed User Data"}
          subHeading={"Task | User-List "}
        />
        <DataTable
          data={data}
          columns={columns}
          striped={true}
          responsive={true}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader={true}
          persistTableHead
          onColumnOrderChange
          paginationRowsPerPageOptions={[6, 12, 18]}
          paginationPerPage={6}
        />
      </div>
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalBody className="modal-body-lg text-center">
          <div className="nk-modal">
            <icon
              className={`nk-modal-icon icon-circle icon-circle-xxl ni ni-cross bg-danger`}
            ></icon>
            <h4 className="nk-modal-title">{rowData?.id}</h4>
            <div className="nk-modal-text">
              <p className="lead">
                Are you sure? You won't be able to revert this!
              </p>
            </div>
            <div className="nk-modal-action mt-5">
              <Button
                size="lg"
                className={`btn-mw`}
                color={`danger`}
                onClick={() => {
                  deleteRow(data);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default User_list;
