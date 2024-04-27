import React from 'react'
import Head from '../component/Head/Head';
import ProfileDropdown from '../component/Items/Profile';
import { useNavigate } from "react-router-dom";
import UserDetailsPage from '../component/useDetail/UserDetail';

const Dashboard = () => {
  const navigate= useNavigate();
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
    <Head title={"Dashboard"}/>
    <ProfileDropdown
        handleUserListClick={handleUserListClick} 
        handleLogoutClick={handleLogoutClick} 
      />
<h1>USER DETAILS</h1>
<div className="containerS">
  <UserDetailsPage />
</div>
    </>
  )
}

export default Dashboard;