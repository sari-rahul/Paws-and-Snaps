//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports from React 
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";

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
import { fetchMoreData } from "../../utils/utils";
import appStyles from '../../App.module.css'

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
                console.log (article)
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
                {hasLoaded ? 
                  (comments.results.length ? (
                    <div className={styles.CommentInfinitescroll}>
                      <InfiniteScroll 
                        dataLength={comments.results.length}
                        loader={<Asset spinner />}
                        hasMore={!!comments.next}
                        next={() => fetchMoreData(comments, setComments)}
                      >
                        {comments.results.map((comment) => (
                          <Comment
                            key={comment.id}
                            {...comment}
                            setArticle={setArticle}
                            setComments={setComments}
                          />
                        ))}
                      </InfiniteScroll>
                    </div>
                  ) : (
                    <Container >
                      No comments yet !!!
                    </Container>
                  ))
                : (
                  <Container className={appStyles.Content}>
                    <Asset spinner />
                  </Container>
                )}

              </div>
              {currentUser ? (
                <CommentCreateForm
                  profile_id={currentUser.profile_id}
                  profileImage={profile_image}
                  article={id}
                  article_owner={article.results[0].is_owner}
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
