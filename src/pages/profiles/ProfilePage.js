//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports from React 
import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports from React Bootstrap 
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Card } from "react-bootstrap";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Internal Imports 
import Asset from "../../components/Assets";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { axiosReq } from "../../api/axiosDefault";
import ArticlePage from "../articles/ArticlePage";


function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const {id}= useParams();
  const setProfileData = useSetProfileData();
  const {pageProfile} = useProfileData();
  const [profile] = pageProfile.results;
  const [profileArticles, setProfileArticles] = useState({ results: [] });
  const [selectedArticle, setSelectedArticle] = useState(null);
  const history = useHistory(); 

  useEffect(() => {
    const fetchData = async ()=>{
        try{
            const [{data : pageProfile},{data:profileArticles}] = await Promise.all([
                axiosReq.get(`/profiles/${id}`),
                axiosReq.get(`/articles/?owner__profile=${id}`),
            ]);
            setProfileData((prevState)=>({
                ...prevState,
                pageProfile:{results:[pageProfile]}
            }));
            setProfileArticles(profileArticles);
            setHasLoaded(true);
        }catch(err){
            console.log(err);
        }
    };
      fetchData();
  }, [id,setProfileData]);

  // Function to handle click on a card
  const handleCardClick = (selectedArticle) => {
    setSelectedArticle(selectedArticle);
    // Redirect to the ArticlePage with the selected article's ID
    history.push(`/articles/${selectedArticle.id}`);
  };
   // Function to open a link in a new tab
  const openLinkInNewTab = (link) => {
    window.open(link, "_blank");
  };
//The profile data of the users
  const mainProfile = (
    <Row noGutters className="justify-content-center text-center">
      <Col lg={10} className="text-lg-center">
        <Image src={profile?.image} roundedCircle className={styles.ProfileImage}/>

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
        <p className={styles.Bio}> Bio:Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
           nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
           sed diam voluptua. At vero eos et accusam et justo duo dolores et ea 
           rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem 
           ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing 
           et.{profile?.bio}</p>
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
      {/* Large screen layout layout */}
        <Row className="d-none d-lg-flex justify-content-center">
        {/* Render  cards in a row  */}
        {hasLoaded && profileArticles.results.length > 1 ? (
           profileArticles.results.map(( profileArticles) => (
            <Col key={ profileArticles.id} lg={4}>
              <Card className={`${styles.SmallCard} my-3`} onClick={() => handleCardClick(profileArticles)} >
                <Card.Img variant="top" src={ profileArticles.image} className={styles.SmallCardImage}/>
                <Card.Body>
                  <Card.Title className={styles.SmallCardTitle}>{ profileArticles.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        ):<Asset spinner />}
        </Row>
      {/* Mobile layout */}
        <Row noGutters className="h-100 d-flex d-lg-none justify-content-center">
          <Col className="py-2 p-0 ">
            {hasLoaded ? (
              <>
                {profileArticles.results.length ? (
                  profileArticles.results.map((profileArticles) => (
                    <Card className={`${styles.Card} my-3`} key={profileArticles.id} onClick={() => handleCardClick(profileArticles)}>
                      <Card.Img variant="top" src={profileArticles.image}className={styles.SmallScreenCardImage} />
                      <Card.Body>
                        <Card.Title>{profileArticles.title}</Card.Title>

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
      </Col>
      {/* Render Article component if an article is selected */}
      {selectedArticle && <ArticlePage {...selectedArticle} />}
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
