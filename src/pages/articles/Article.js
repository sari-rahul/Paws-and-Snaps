//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports from React 
import React from "react";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports from  React Bootstrap
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Internal Imports 
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Article.module.css";
import {MoreDropdown} from '../../components/MoreDropdown';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefault";


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
    articlePage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = ()=>{
    history.push(`/articles/${id}/edit`)
  };
  const handleDelete = async ()=>{
    try {
      await axiosRes.delete(`/articles/${id}`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.Articlebackground}>
      <Image src={image} alt="Article Image" 
        fluid  className={styles.Photo}
      />
      <div className={styles.Article}>
      <h1 className={styles.Title}>{title}</h1>

      <div className={styles.Author}>
        <div>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={120} />
            {owner}
        </Link>
        <p className={styles.Updation}>Last Updated: {updated_at} </p>
        </div>
        <div className={styles.Margin}>
          {is_owner && articlePage && (
            <MoreDropdown 
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            />
          )}
        </div>

      </div>


      <div dangerouslySetInnerHTML={{ __html: article }}
        className={styles.Content}></div>
      </div>
    </div>
  );
}

export default Article;

    
