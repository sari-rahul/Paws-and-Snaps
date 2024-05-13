import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";

import Asset from "../../components/Assets";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { axiosReq } from "../../api/axiosDefault";
import ArticlePage from "../articles/ArticlePage";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { id } = useParams();
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const [profileArticles, setProfileArticles] = useState({ results: [] });
  const [selectedArticle, setSelectedArticle] = useState(null);
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

  const handleCardClick = (selectedArticle) => {
    setSelectedArticle(selectedArticle);
    history.push(`/articles/${selectedArticle.id}`);
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
