//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports from React 
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports from React 
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Internal Imports 
import Asset from "../../components/Assets";
import { axiosReq } from "../../api/axiosDefault";
import Article from "./Article";
import styles from '../../styles/ArticlePage.module.css'
import CommentCreateForm from "../comments/CommentsCreateForm";
import Comment from "../comments/Comment";

function ArticlePage() {
    const { id } = useParams()
    const [article,setArticle] = useState({results:[]});
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(()=>{
        const handleMount = async ()=>{
            try{
                const [{data:article},{ data: comments }] = await Promise.all([
                    axiosReq.get(`/articles/${id}`),
                    axiosReq.get(`/comments/?article=${id}`),
                ])
                setArticle({results:[article]})
                setComments(comments)
                console.log(article)
                setHasLoaded(true);
            }catch(err){
                console.log(err)
            } 
        };
        handleMount();
    }, [id]);
  return (
    <Container >
      <Row className="h-100">
        <Col className=" p-0 " lg={12}>
          {hasLoaded ?(
            <>  
              <div className={styles.Container}>
                <Article { ...article.results[0]} articlePage/>
              </div>
              <div className={styles.CommentContainer}>
                <h4>COMMENTS</h4>
                <br /><br />
                {comments.results.length ? (
                  comments.results.map((comment) => (
                    <Comment
                      key={comment.id}
                      {...comment}
                      setArticle={setArticle}
                      setComments={setComments}
                    />
                  ))
                ) : 'No comments yet !!!'}
              </div>
              {currentUser ? (
                <CommentCreateForm
                  profile_id={currentUser.profile_id}
                  profileImage={profile_image}
                  article={id}
                  setArticle={setArticle}
                  setComments={setComments}
                />
              ) : comments.results.length ? (
                "Comments"
              ) : null}
            </>
          ):<Asset spinner />}  
        </Col>
      </Row>
    </Container>
  );
}

export default ArticlePage;
