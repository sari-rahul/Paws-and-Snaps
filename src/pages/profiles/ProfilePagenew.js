import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
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
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import { fetchMoreData } from "../../utils/utils";
import EmptyFolder from "../../assets/emptyfolder.webp";
import NotFound from "../../assets/not found.jpg";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { id } = useParams();
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const [profileArticles, setProfileArticles] = useState({ results: [] });
  const history = useHistory();
  const currentUser = useCurrentUser();
  const isProfileOwner = currentUser === profile?.owner;

  useEffect(() => {
    let isMounted = true; 
    const fetchData = async () => {
      try {
        const pageProfileResponse = await axiosReq.get(`/profiles/${id}`);
        const pageProfileData = pageProfileResponse.data;
        
        // Fetch all articles initially
        let profileArticlesResponse = await axiosReq.get(`/articles/?owner__profile=${id}`);
        
        // If the user is not the profile owner, filter articles based on publication status
        if (!isProfileOwner) {
          profileArticlesResponse = profileArticlesResponse.data.results.filter(article => article.published);
        }
  
        if (isMounted) {
          setProfileData((prevState) => ({
            ...prevState,
            pageProfile: { results: [pageProfileData] }
          }));
          setProfileArticles(profileArticlesResponse);
          setHasLoaded(true);
        } 
      } catch (err) {
        console.log(err);
        if (isMounted) {
          setHasLoaded(true);
        }
      }
    };
    
    fetchData();
  
    return () => {
      isMounted = false;
    };
  }, [id, setProfileData, isProfileOwner]);
    
  
  const handleCardClick = (selectedProfileArticle) => {
    history.push(`/articles/${selectedProfileArticle.id}`);
  };

  const openLinkInNewTab = (link) => {
    window.open(link, "_blank");
  };

  const renderProfileArticles = () => {
    if (profileArticles.results && profileArticles.results.length > 0) {
      return (
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
      );
    } else {
      return (
        <Container className={styles.EmptyFolder}>
          <Asset src={EmptyFolder} message={"No Articles Yet"} />
        </Container>
      );
    }
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
        {isProfileOwner && <ProfileEditDropdown id={profile?.id} />}
        <p className={styles.Bio}>{profile?.bio}</p>
      </Col>
    </Row>
  );

  return (
    <Container className={styles.ProfileContainer}>
      {mainProfile}
      <hr />
      <h3>{profile?.owner}'s Articles</h3>
      <hr />
      <Row className="d-flex justify-content-center">
        {hasLoaded ? renderProfileArticles() : <Container className={appStyles.AssetContainer}><Asset spinner /></Container>}
      </Row>
    </Container>
  );
}

export default ProfilePage;
