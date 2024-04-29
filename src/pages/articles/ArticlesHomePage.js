import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Asset from "../../components/Assets";
import appStyles from "../../App.module.css";
import styles from "../../styles/ArticlesHomePage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefault";

function ArticlesHomePage({ message, filter = "" }) {
  const [article, setArticles] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/articles/?${filter}`);
        setArticles(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchPosts();
  }, [filter, pathname]);

  return (
    <Container>
      {/* Larger screen layout */}
      <Row className="d-none d-lg-flex justify-content-center">
        <Col>
          {/* Large card covering 60% of the screen */}
          {hasLoaded && article.results.length > 0 ? (
            <Card className={`${styles.LargeCard} my-3`} key={article.results[0].id}>
              <Card.Img variant="top" src={article.results[0].image} />
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
              <Card className={`${styles.SmallCard} my-3`}>
                <Card.Img variant="top" src={article.image} />
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        ):null}
      </Row>

      {/* Mobile layout */}
      <Row className="h-100 d-flex d-lg-none justify-content-center">
        <Col className="py-2 p-0 ">
          <p>Popular profiles mobile</p>
          {hasLoaded ? (
            <>
              {article.results.length ? (
                article.results.map((article) => (
                  <Card className={`${styles.Card} my-3`} key={article.id}>
                    <Card.Img variant="top" src={article.image} />
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
    </Container>
  );
}

export default ArticlesHomePage;
