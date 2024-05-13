//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports from React 
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Import from React Bootstrap 
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Internal Imports 
import Asset from "../../components/Assets";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { axiosReq } from "../../api/axiosDefault";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import { fetchMoreData } from "../../utils/utils";
import ArticlePage from "../articles/ArticlePage";



function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { id } = useParams();
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const [profileArticles, setProfileArticles] = useState({ results: [] });
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileArticles }] = await Promise.all([
          axiosReq.get(`/profiles/${id}`),
          axiosReq.get(`/articles/?owner__profile=${id}`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] }
        }));
        setProfileArticles(profileArticles);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const handleCardClick = (selectedProfileArticle) => {
    history.push(`/articles/${selectedProfileArticle.id}`);
  };

  const openLinkInNewTab = (link) => {
    window.open(link, "_blank");
  };

  const mainProfile = (
    <Row noGutters className="justify-content-center text-center">
      <Col lg={10} className="text-lg-center">
        <Image src={profile?.image} roundedCircle className={styles.ProfileImage} />
        <h3 className="m-2">{profile?.owner}</h3>
        <p className={styles.MemberSince}>Member since: {profile?.created_at}</p>
        <div className={styles.ContactIcons}>
          <div className={styles.ProfileContactIcons} onClick={() => openLinkInNewTab(profile?.linked_in)}>
            <i className="fa fa-linkedin" aria-hidden="true"></i>
          </div>
          <div className={styles.ProfileContactIcons} onClick={() => openLinkInNewTab(profile.facebook)}>
            <i className="fa fa-facebook" aria-hidden="true"></i>
          </div>
          <div className={styles.ProfileContactIcons} onClick={() => openLinkInNewTab(profile.instagram)}>
            <i className="fa fa-instagram" aria-hidden="true"></i>
          </div>
        </div>
        {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
        <p className={styles.Bio}>{profile?.bio}</p>
      </Col>
    </Row>
  );

  const mainProfileArticles = (
    <Row noGutters className="justify-content-center text-center">
      <Container>
        <Col>
          <hr />
          <h3>{profile?.owner}'s Articles</h3>
          <hr />
      {/* Larger screen layout */}
        <Row className="d-none d-lg-flex justify-content-center">
          {/* Render three cards in a row  */}
          {hasLoaded && profileArticles.results.length > 0 ? (
            <InfiniteScroll
              dataLength={profileArticles.results.length}
              loader={<Asset spinner />}
              hasMore={!!profileArticles.next}
              next={() => fetchMoreData(profileArticles, setProfileArticles)}
            >
              <div className="d-flex flex-wrap justify-content-center">
                {profileArticles.results.map((profileArticle) => (
                  <Col lg={4} key={profileArticle.id}>
                    <Card className={`${styles.SmallCard} my-3`} onClick={() => handleCardClick(profileArticle)}>
                      <Card.Img variant="top" src={profileArticle.image} className={styles.SmallCardImage} />
                      <Card.Body>
                        <Card.Title className={styles.SmallCardTitle}>{profileArticle.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </div>
            </InfiniteScroll>
          ) : <Asset spinner />}
        </Row>
        {/* Medium  screen layout */}
          <Row className="d-none d-md-flex  d-lg-none justify-content-center">
        {/* Render three cards in a row  */}
        {hasLoaded && profileArticles.results.length > 1 ? (
          <InfiniteScroll
            dataLength={profileArticles.results.length}
            loader={<Asset spinner />}
            hasMore={!!profileArticles.next}
            next={() => fetchMoreData(profileArticles, setProfileArticles)}
          >
            <div className="d-flex flex-wrap justify-content-center">
              {profileArticles.results.map((profileArticles) => (
                <Col md={6} key={profileArticles.id}>
                  <Card className={`${styles.SmallCard} my-3`} onClick={() => handleCardClick(profileArticles)}>
                    <Card.Img variant="top" src={profileArticles.image} className={styles.SmallCardImage} />
                    <Card.Body>
                      <Card.Title className={styles.SmallCardTitle}>{profileArticles.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </div>
          </InfiniteScroll>
        ) : <Asset spinner />}
          </Row>
      {/* Mobile layout */}
          <Row className="h-100 d-flex d-lg-none justify-content-center">
          <Col className="py-2 p-0 ">
            {hasLoaded && profileArticles.results.length > 1 ? (
              <InfiniteScroll
              dataLength={profileArticles.results.length}
              loader={<Asset spinner />}
              hasMore={!!profileArticles.next}
              next={() => fetchMoreData(profileArticles, setProfileArticles)}
            >
            {profileArticles.results.map((profileArticles) => (
                <Col lg={4} key={profileArticles.id}>
                  <Card className={`${styles.SmallCard} my-3`} onClick={() => handleCardClick(profileArticles)}>
                    <Card.Img variant="top" src={profileArticles.image} className={styles.SmallCardImage}/>
                    <Card.Body>
                      <Card.Title className={styles.SmallCardTitle}>{profileArticles.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
            ))}
              </InfiniteScroll>
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

  return (
    <>
      <Row className="justify-content-center">
        <Col>
          {hasLoaded ? (
            <Container className={styles.ProfileContainer}>
              {mainProfile}
              {mainProfileArticles}
            </Container>
          ) : (
            <Asset spinner />
          )}
        </Col>
      </Row>
      
    </>
  );
}

export default ProfilePage;
