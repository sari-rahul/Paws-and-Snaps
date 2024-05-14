//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports from React 
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";

import InfiniteScroll from "react-infinite-scroll-component";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Import from React Bootstrap 
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
import { fetchMoreData } from "../../utils/utils";
import useDebounce from "../../hooks/useDebounce";
import NoResults from "../../assets/not found.jpg";



function ArticlesHomePage({ message }) {
  const [article, setArticles] = useState({ results: [] });
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory(); 
  const [query, setQuery] = useState("");
  const debouncedQuery =useDebounce (query,500);// Debounce search query with a delay of 500ms

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/articles/?search=${debouncedQuery}`);
        setArticles(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchPosts();
  }, [pathname,debouncedQuery,]);

  // Function to handle click on a card
  const handleCardClick = (selectedArticle) => {
    setSelectedArticle(selectedArticle);
    // Redirect to the ArticlePage with the selected article's ID
    history.push(`/articles/${selectedArticle.id}`);
  };

  return (
    <Container className={styles.Container} onClick={() => setSelectedArticle(null)}>      
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
        </Col>
      </Row>
      <Row className="d-none d-lg-flex justify-content-center">
        {/* Render three cards in a row  */}
        {hasLoaded ? (
            article.results.length > 0 ? (
              <InfiniteScroll
                dataLength={article.results.length}
                loader={<Asset spinner />}
                hasMore={!!article.next}
                next={() => fetchMoreData(article, setArticles)}
              >
                <div className="d-flex flex-wrap justify-content-center">
                  {article.results.map((innerArticle) => (
                    <Col lg={4} key={innerArticle.id}>
                      <Card className={`${styles.SmallCard} my-3`} onClick={() => handleCardClick(innerArticle)}>
                        <Card.Img variant="top" src={innerArticle.image} className={styles.SmallCardImage} />
                        <Card.Body>
                          <Card.Title className={styles.SmallCardTitle}>{innerArticle.title}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </div>
              </InfiniteScroll>
            ) : (
            <Container className={appStyles.Content}>
              <Asset src={NoResults} message={"No Results Found"} />
            </Container>
                )
          ) : (
            <Container className={appStyles.Content}>
              <Asset spinner />
            </Container>
          )}
      </Row>
      
      {/* Medium screen layout */}
      <Row className=" d-none d-md-flex d-lg-none  justify-content-center">
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
      </Col>
      </Row>
      <Row className="d-none d-md-flex  d-lg-none justify-content-center">
        {/* Render three cards in a row  */}
        {hasLoaded ?
        article.results.length > 1 ? (
          <InfiniteScroll
            dataLength={article.results.length}
            loader={<Asset spinner />}
            hasMore={!!article.next}
            next={() => fetchMoreData(article, setArticles)}
          >
            <div className="d-flex flex-wrap justify-content-center">
              {article.results.map((article) => (
                <Col md={6} key={article.id}>
                  <Card className={`${styles.SmallCard} my-3`} onClick={() => handleCardClick(article)}>
                    <Card.Img variant="top" src={article.image} className={styles.SmallCardImage} />
                    <Card.Body>
                      <Card.Title className={styles.SmallCardTitle}>{article.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <Container className={appStyles.Content}>
            <Asset src={NoResults} message={"No Results Found"} />
          </Container>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
            )}
      </Row>

      {/* Mobile layout */}
      <Row className="h-100 d-flex d-md-none justify-content-center">
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
          article.results.length > 1 ? (
              <InfiniteScroll
                dataLength={article.results.length}
                loader={<Asset spinner />}
                hasMore={!!article.next}
                next={() => fetchMoreData(article, setArticles)}
              >
                {article.results.map((article) => (
                  <Col lg={4} key={article.id}>
                    <Card className={`${styles.SmallCard} my-3`} onClick={() => handleCardClick(article)}>
                      <Card.Img variant="top" src={article.image} className={styles.SmallCardImage} />
                      <Card.Body>
                        <Card.Title className={styles.SmallCardTitle}>{article.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </InfiniteScroll>
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={"No Results Found"} />
              </Container>
            )
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
