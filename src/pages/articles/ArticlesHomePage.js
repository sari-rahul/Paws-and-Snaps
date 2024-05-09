//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports from React 
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Internal React Bootstrap 
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Internal Imports 
import Asset from "../../components/Assets";
import appStyles from "../../App.module.css";
import styles from "../../styles/ArticlesHomePage.module.css";
import { axiosReq } from "../../api/axiosDefault";
import ArticlePage from "./ArticlePage";


function ArticlesHomePage({ message }) {
  const [article, setArticles] = useState({ results: [] });
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory(); // Initialize useHistory
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/articles/?search=${query}`);
        setArticles(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchPosts();
  }, [pathname,query,]);

  // Function to handle click on a card
  const handleCardClick = (selectedArticle) => {
    setSelectedArticle(selectedArticle);
    // Redirect to the ArticlePage with the selected article's ID
    history.push(`/articles/${selectedArticle.id}`);
  };

  return (
    <Container className={styles.Container}onClick={() => setSelectedArticle(null)}>      
      {/* Larger screen layout */}
      <Row className="d-none d-lg-flex justify-content-center">        
        <Col>
        {/*Search Bar*/}
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            placeholder="Search Articles"
          />
        </Form>
          {/* Large card covering 60% of the screen */}
          {hasLoaded && article.results.length > 0 ? (
            <Card className={`${styles.LargeCard} my-3`}
               key={article.results[0].id} 
               onClick={() => handleCardClick(article.results[0])}>
              <Card.Img variant="top" src={article.results[0].image} className={styles.LargeCardImage}/>
              <Card.Body>
                <Card.Title>{article.results[0].title}</Card.Title>
              </Card.Body>
            </Card>
          ): <Asset spinner />}
        </Col>
      </Row>
      <Row className="d-none d-lg-flex justify-content-center">
        {/* Render smaller cards in a row below the large card */}
        {hasLoaded && article.results.length > 1 ? (
          article.results.slice(1).map((article) => (
            <Col key={article.id} lg={4}>
              <Card className={`${styles.SmallCard} my-3`} onClick={() => handleCardClick(article)}>
                <Card.Img variant="top" src={article.image} className={styles.SmallCardImage}/>
                <Card.Body>
                  <Card.Title className={styles.SmallCardTitle}>{article.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        ):null}
      </Row>
      {/* Mobile layout */}
      <Row className="h-100 d-flex d-lg-none justify-content-center">
        <Col className="py-2 p-0 ">
          {/*Search Bar*/}
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            placeholder="Search Articles"
          />
        </Form>
          {hasLoaded ? (
            <>
              {article.results.length ? (
                article.results.map((article) => (
                  <Card className={`${styles.Card} my-3`} key={article.id} onClick={() => handleCardClick(article)}>
                    <Card.Img variant="top" src={article.image}className={styles.SmallScreenCardImage} />
                    <Card.Body>
                      <Card.Title>{article.title}</Card.Title>

                    </Card.Body>
                  </Card>
                ))
              ) : <Asset spinner />}
            </>
          ) : (
            <Container className={appStyles.Content}>
              <Asset spinner />
            </Container>
          )}
        </Col>
      </Row>

      {/* Render Article component if an article is selected */}
      {selectedArticle && <ArticlePage {...selectedArticle} />}
    </Container>
  );
}

export default ArticlesHomePage;
