import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Assets";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { axiosReq } from "../../api/axiosDefault";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const {id}= useParams();
  const setProfileData = useSetProfileData();
  const {pageProfile} = useProfileData();
  const [profile] = pageProfile.results;


  useEffect(() => {
    const fetchData = async ()=>{
        try{
            const [{data : pageProfile}] = await Promise.all([
                axiosReq.get(`/profiles/${id}`),
            ]);
            setProfileData((prevState)=>({
                ...prevState,
                pageProfile:{results:[pageProfile]}
            }));
            setHasLoaded(true);
        }catch(err){
            console.log(err);
        }
    };
      fetchData();
  }, [id,setProfileData]);

  const mainProfile = (
    <Row noGutters className="justify-content-center text-center">
      <Col lg={10} className="text-lg-center">
        <Image src={profile?.image} className={styles.ProfileImage}/>

        <h3 className="m-2">Profile username</h3>
        <p>Member since</p>
        <p>Bio</p>
      </Col>
    </Row>
  );

  const mainProfilePosts = (
    <Row noGutters className="justify-content-center text-center">
      <Col>
        <hr />
        <p>Profile owner's posts</p>
        <hr />
      </Col>
    </Row>
  );

  return (
    <Row className="justify-content-center">
      <Col className="py-2 p-0 p-lg-2 m-auto">
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
      </Col>
    </Row>
  );
}

export default ProfilePage;
