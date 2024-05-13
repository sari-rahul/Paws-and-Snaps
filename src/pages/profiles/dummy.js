const mainProfileArticles = (
    <Row noGutters className="justify-content-center text-center">
      <Container>
        <Col>
          <hr />
          <h3>{profile?.owner}'s Articles</h3>
          <hr />
          <Row className="d-none d-lg-flex justify-content-center">
            {hasLoaded && profileArticles.results.length > 0 ? (
              profileArticles.results.map((profileArticle) => (
                <Col key={profileArticle.id} lg={4}>
                  <Card className={`${styles.SmallCard} my-3`} onClick={() => handleCardClick(profileArticle)}>
                    <Card.Img variant="top" src={profileArticle.image} className={styles.SmallCardImage} />
                    <Card.Body>
                      <Card.Title className={styles.SmallCardTitle}>{profileArticle.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No articles yet</p>
            )}
          </Row>
          <Row noGutters className="h-100 d-flex d-lg-none justify-content-center">
            <Col className="py-2 p-0">
              {hasLoaded ? (
                <>
                  {profileArticles.results.length > 0 ? (
                    profileArticles.results.map((profileArticle) => (
                      <Card className={`${styles.Card} my-3`} key={profileArticle.id} onClick={() => handleCardClick(profileArticle)}>
                        <Card.Img variant="top" src={profileArticle.image} className={styles.SmallScreenCardImage} />
                        <Card.Body>
                          <Card.Title>{profileArticle.title}</Card.Title>
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <p>No articles yet</p>
                  )}
                </>
              ) : (
                <Container className={appStyles.Content}>
                  <Asset spinner />
                </Container>
              )}
            </Col>
          </Row>
        </Col>
      </Container>
    </Row>
  );