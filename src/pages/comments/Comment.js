import React from "react";
import { Media } from "react-bootstrap";

import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
  const { profile_id, profile_image, owner, updated_at, content } = props;

  return (
    <div className={styles.Comment}>      
      <Media>
        <div className={styles.OwnerDetails}>
            <Link to={`/profiles/${profile_id}`}>
                <Avatar src={profile_image} height={70} />
            </Link>
            <div className={styles.OwnerDetailsInnerDiv}>
            <span className={styles.Owner}>{owner}</span>    
            <span className={styles.Date}>{updated_at}</span>
            </div>
        </div>
      </Media>
      <Media.Body className="pl-3 pt-3 ml-2">
          <p>{content}</p>
      </Media.Body>
    </div>
  );
};

export default Comment;