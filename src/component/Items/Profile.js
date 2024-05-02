import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'; // Import Dropdown components from Reactstrap

function ProfileDropdown({ handleUserListClick, handleLogoutClick }) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle caret color="primary">
        Menu
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={handleUserListClick}>User List</DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={handleLogoutClick}>Logout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default ProfileDropdown;
