import React from "react";
import img from "../images/login.jpg";
const UserDetailCard = () => {
  return (
    <>
  
      <div className="user-profile-grid">
        
        {/* <div className="card mb-3"> */}
       <div className="card mb-6 w-1 m-1">
          <img
            className="card-img-top"
            src={img}
            alt="Card image cap"
            style={{ width: "200px", height: "200px"}}
          />
          <div className="card-body">
            <h className="card-title">Card title</h>
            <p className="card-text">
              This is a wider card with supporting text below as a natural\ lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailCard;
