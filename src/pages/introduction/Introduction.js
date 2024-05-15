//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports from React 
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports from React Bootstrap 
import { Col, Container} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Internal Imports 
import image from '../../assets/introimage.jpg';
import { axiosReq } from "../../api/axiosDefault";
import Asset from "../../components/Assets";
import styles from "../../styles/Introduction.module.css";
import appStyles from "../../App.module.css";
import ArticlePage from "../articles/ArticlePage";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import EmptyFolder from '../../assets/emptyfolder.webp';
import {useRedirect} from '../../hooks/useRedirect'

const Introduction = () => {
  useRedirect('loggedOut')

  const [articles, setArticles] = useState({ results: [] });
  const [selectedArticle, setSelectedArticle] = useState(null);
  const history = useHistory();
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    let isMounted = true;
    const fetchRecentArticles = async () => {
      try {
        const { data } = await axiosReq.get("/articles/", {
          params: {
            _limit: 10, // Limit the number of articles to 10
            _sort: "created_at", // Sort articles by creation date in descending order
            _order: "desc"
          }
        });
        if (isMounted){
          setArticles(data);
          setHasLoaded(true);
        }
        
      } catch (error) {
        console.error("Error fetching recent articles:", error);
      }
    };

    setHasLoaded(false);
    fetchRecentArticles();

  // Cleanup function to set isMounted to false when component unmounts
  return () => {
    isMounted = false;
  };
}, [currentUser]);

  // Function to handle click on an article
  const handleClick = (selectedArticle) => {
    setSelectedArticle(selectedArticle);
    if (currentUser) {
      // Redirect to the ArticlePage with the selected article's ID
      history.push(`/articles/${selectedArticle.id}`);
    }
  };

  return (
    <Row className={`${styles.Container} justify-content-center`} onClick={() => setSelectedArticle(null)}>
      <Col lg={10} className={styles.IntroContainer}>
        <h3>Start Here – Paws&Snaps 101</h3>
        <div className={styles.ImageContainer}>
          <img src={image} alt='dogimage' className={`${styles.Image} img-fluid`} />
        </div>
        <br />
        <h3>What Is Paws&Snaps?</h3>
        <br />
        <p>Paws&Snaps is about living a happy, simple life with our dogs. 
          This blog is my way of sharing all the tips I’ve learned over the years that make 
          dog ownership easier.
        </p>
        <h3>What topics are you eager to contribute to our blog community?</h3>
        <br />
        <p>"Hey there! Are you ready to share your knowledge and experiences 
          with the world? We believe your insights are incredibly valuable, 
          and what better way to showcase them than through blogs? Whether you 
          have tips, stories, or expertise to share, our platform is the perfect 
          place to contribute. Join us in creating an enriching community where 
          we learn from each other's unique perspectives. Let's inspire and 
          empower others with your valuable information. Start blogging today 
          and make your voice heard!"</p>

        <h5>Here are some helpful links to our most popular content to get you started:</h5>
        <br />
        <h3>Our Most Popular Articles</h3>
        <br />
        {hasLoaded ?
         articles.results.length > 0 ? (
          articles.results.map((article) => (
            <Col key={article.id}>
              <div className={`${styles.Question} my-3`} 
              onClick={() => handleClick(article)}>
                <p><i className="fa fa-paw" aria-hidden="true"></i> {article.title}</p>
              </div>
            </Col>
          ))
        ): <Asset src={EmptyFolder} message={'No articles added'}/>
        :<Container className={appStyles.AssetContainer}>
          <Asset spinner />
         </Container>}
        {/* Render ArticlePage component if an article is selected */}
        {selectedArticle && <ArticlePage {...selectedArticle} />}
      </Col>
    </Row>
  );
};

export default Introduction;
