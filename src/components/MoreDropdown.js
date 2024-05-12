import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import btnStyles from "../styles/Button.module.css";
import  {useHistory} from 'react-router';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis-v"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));
const ButtonComponent = React.forwardRef(({ onClick }, ref) => (
  <button
    className={`${btnStyles.Button}`}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >Edit
  </button>));

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
        <i className="fa fa-pencil" 
          aria-hidden="true"></i>
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <i className="fa fa-trash-o" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export function ProfileEditDropdown({id}) {
  const history = useHistory();
  return(
    <Dropdown>
       <Dropdown.Toggle as={ButtonComponent}/>
        <Dropdown.Menu>
          <Dropdown.Item 
            onClick={()=>history.push(`/profiles/${id}/edit`)}
              aria-label="edit-profile">
            <i className="fas fa-edit" aria-hidden="true"/>Edit Profile
          </Dropdown.Item>
          <Dropdown.Item
            onClick={()=> history.push(`/profiles/${id}/edit/username`)}
            aria-label="edit-username">
            <i className="fas fa-id-card" aria-hidden="true"/>Edit Username
          </Dropdown.Item>
          <Dropdown.Item
          onClick={()=>history.push(`/profiles/${id}/edit/password`)}>
            <i className="fa fa-key" aria-hidden="true"></i>Edit Password
          </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  )
}