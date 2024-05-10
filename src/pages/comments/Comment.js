import React, { useState } from "react";
import { Media } from "react-bootstrap";

import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import CommentEditForm from "./CommentsEditForm";
import styles from "../../styles/Comment.module.css";
import { MoreDropdown } from '../../components/MoreDropdown';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefault";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setArticle,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}`);
      setArticle((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {}
  };

  return (
    <div className={styles.Comment}>
      <div className={styles.OwnerDetails}>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={70} />
          </Link>
          <div className={styles.NameAndTime}>
            <span className={styles.Owner}>{owner}</span>
            <span className={styles.Date}>{updated_at}</span>
          </div>
      </div>
      <div className={styles.CommentBody}>
        <div  className={styles.CommentContent}>
          {showEditForm ? 
            <CommentEditForm
            id={id}
            profile_id={profile_id}
            content={content}
            profileImage={profile_image}
            setComments= {setComments}
            setShowEditForm={setShowEditForm}
            /> : 
            <p>{content}</p>}
        </div>
        <div className={styles.CommentDropDown}>{is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
