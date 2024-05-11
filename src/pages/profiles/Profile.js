import React from "react";
import styles from "../../styles/Profile.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Profile = (props) => {
  const { profile,  imageSize = 55 } = props;
  const { id,  image, owner,created_at } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <div
      className={`my-3 d-flex align-items-center flex-column`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      <div> Member since : {created_at}</div>
    </div>
  );
};

export default Profile;