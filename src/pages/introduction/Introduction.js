//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports from React 
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports from React Bootstrap 
import { Col } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Internal Imports 
import image from '../../assets/introimage.jpg';
import { axiosReq } from "../../api/axiosDefault";
import Asset from "../../components/Assets";
import styles from "../../styles/Introduction.module.css";
import ArticlePage from "../articles/ArticlePage";


const Introduction = (filter = "") => {
  const [article, setArticles] = useState({ results: [] });
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const history = useHistory();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchRecentArticles = async () => {
      try {
        const { data } = await axiosReq.get("/articles/", {
          params: {
            _limit: 10, // Limit the number of articles to 10
            _sort: "created_at", // Sort articles by creation date in descending order
            _order: "desc"
          }
        });
        setArticles(data);
        setHasLoaded(true);
      } catch (error) {
        console.error("Error fetching recent articles:", error);
      }
    };

    setHasLoaded(false);
    fetchRecentArticles();
  }, []);

  // Function to handle click on a question
  const handleClick = (selectedQuestion) => {
    setSelectedQuestion(selectedQuestion);
    // Redirect to the ArticlePage with the selected article's ID
    history.push(`/articles/${selectedQuestion.id}`);
  };

  return (
      <Row className={`${styles.Container} justify-content-center`}
        onClick={() => setSelectedQuestion(null)}>
        <Col lg={10} className={styles.IntroContainer}>
          <h3>Start Here – Paws&Snaps 101</h3>
          <div className={styles.ImageContainer}>
            <img src={image} alt='dogimage' 
            className={`${styles.Image} img-fluid`} />
          </div>
          <br />
          <h3>What Is Paws&Snaps?</h3>
          <br />
          <p>Paws&Snaps is about living a happy, simple life 
              with our dogs. This blog is my way of sharing all
              the tips I’ve learned over the years that make
              dog ownership easier.
          </p>
          <h3>What topics are you eager to contribute to our blog community?</h3>
          <br />
          <p>"Hey there! Are you ready to share your knowledge 
            and experiences with the world? We believe your 
            insights are incredibly valuable, and what better
            way to showcase them than through blogs? Whether 
            you have tips, stories, or expertise to share, 
            our platform is the perfect place to contribute.
            Join us in creating an enriching community where 
            we learn from each other's unique perspectives. 
            Let's inspire and empower others with your valuable 
            information. Start blogging today and make your voice heard!"
          </p>
          <h5>Here are some helpful links to our most popular 
              content to get you started:
          </h5>
          <br />
          <h3>Our Most Popular Articles</h3>
          <br />
          {hasLoaded && article.results.length > 1 ? (
            article.results.slice(1).map((article) => (
              <div key={article.id} lg={4}>
                <div className={`${styles.Question} my-3`}
                  onClick={() => handleClick(article.results[0])}>
                    <p onClick={() => history.push(`/articles/${article.id}`)}>
                    <i class="fa fa-paw" aria-hidden="true"></i> 
                      {  article.title}
                    </p>
                </div>
              </div>
            ))
          ): <Asset smallSpinner />}
          {/* Render Article component if an article is selected */}
          {selectedQuestion && <ArticlePage {...selectedQuestion} />}
        </Col>
      </Row>
  )
}

export default Introduction;
