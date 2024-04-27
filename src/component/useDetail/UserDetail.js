import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Badge, Button } from 'reactstrap';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import '../../UserDetail.css';
const UserDetailsPage = () => {
  const [users, setUsers] = useState([
    // Sample user data, replace with your actual data
    {
      id: 1,
      name: 'John Doe',
      gender: 'Male',
      dob: '1990-01-01',
      mobile: '1234567890',
      email: 'john@example.com',
      username: 'johndoe',
      password: '********',
      hobbies: 'Reading, Swimming',
      state: 'California',
      district: 'Los Angeles',
      city: 'Los Angeles',
      pic: 'user.jpg',
      document: 'doc.pdf',
      status: 'active',
    },
    // Add more users as needed
  ]);

  const handleEdit = (user) => {
    // Implement edit functionality
    console.log('Edit user:', user);
  };

  const getStatusColor = (status) => {
    // Implement logic to determine color based on status
    return status === 'active' ? 'success' : 'danger';
  };

  const getStatusText = (status) => {
    // Implement logic to return text based on status
    return status === 'active' ? 'Active' : 'Inactive';
  };

  return (
    <div className="user-profile-grid">
      {users.map((user) => (
        <Card key={user.id} className="user-profile-card">
          <CardBody>
            <CardTitle tag="h5">{user.name}</CardTitle>
            <CardText>
              <strong>Gender:</strong> {user.gender}
              <br />
              <strong>DOB:</strong> {user.dob}
              <br />
              <strong>Mobile:</strong> {user.mobile}
              <br />
              <strong>Email:</strong> {user.email}
              <br />
              <strong>Username:</strong> {user.username}
              <br />
              <strong>Password:</strong> {user.password}
              <br />
              <strong>Hobbies:</strong> {user.hobbies}
              <br />
              <strong>Location:</strong> {user.city}, {user.district}, {user.state}
              <br />
              <strong>Status:</strong> <Badge color={`outline-${getStatusColor(user.status)}`}>{getStatusText(user.status)}</Badge>
            </CardText>
            <div className="user-profile-actions">
              <Button
                outline
                color={`warning`}
                className={`me-1`}
                onClick={() => handleEdit(user)}
              >
                {' '}
                <FiEdit />
              </Button>
              <Button
                outline
                color={`danger`}
                onClick={() => handleEdit(user)}
              >
                {' '}
                <MdDeleteOutline />
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default UserDetailsPage;
