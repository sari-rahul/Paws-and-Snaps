import React from "react";
import styles from "../../styles/Article.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Image from "react-bootstrap/Image";


const Article = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    title,
    article,
    image,
    updated_at,
    postPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;


  return (
    <div className={styles.Article}>
      <Image src={image} alt="Article Image" fluid  className={styles.Article}/>
      <h1 className={styles.Title}>{title}</h1>
      <div className={styles.Author}>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={120} />
            {owner}
        </Link>
      </div>
      <p className={styles.Updation}>Last Updated: {updated_at}</p>
      <div dangerouslySetInnerHTML={{ __html: article }}
        className={styles.Content}></div>
    </div>
  );
}

export default Article;

    
