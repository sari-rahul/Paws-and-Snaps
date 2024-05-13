//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports from React 
import React, { useState } from "react";
import { Link } from "react-router-dom";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports from React Bootstrap 
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Internal Imports 
import styles from "../../styles/CommentsCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefault";
import btnStyles from "../../styles/Button.module.css"


function CommentCreateForm(props) {
  const { article, setArticle, setComments, profileImage, profile_id, article_owner} = props;
  const [content, setContent] = useState("");


  const handleChange = (event) => {
    if (!article_owner)
      setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        article,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setArticle((prevArticle) => ({
        results: [
          {
            ...prevArticle.results[0],
            comments_count: prevArticle.results[0].comments_count + 1,
          },
          console.log('Current article',prevArticle)
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form  onSubmit={handleSubmit} className={ `${styles.CommentForm} mt-4`}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} height={40} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="Add Your Comment"
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={0}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${btnStyles.Button} ${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        <i className="fa fa-paper-plane" aria-hidden="true"></i>
      </button>
      
    </Form>
  );
}

export default CommentCreateForm;