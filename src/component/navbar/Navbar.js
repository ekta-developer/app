import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Navbar.css';
const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Logout');
        // Add your logout logic here
        // navigate('/login'); // Redirect to login after logout
    };

    return (
        <div className="navbar">
            <a href="/">My App</a>
            <div className="dropdown">
                {/* <button className="dropbtn">Profile</button>
                <div className="dropdown-content">
                    <a href="/user-list">User List</a>
                    <a href="#" onClick={handleLogout}>Logout</a>
                </div> */}
            </div>
        </div>
    );
};

export default Navbar;
