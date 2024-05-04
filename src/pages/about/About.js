import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import styles from "../../styles/About.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom";

/**
 * Returns the About component with user-specific content and conditional rendering based on the currentUser state.
 *
 * @returns {JSX.Element} The About component JSX
 */
const About = () => {
  const currentUser = useCurrentUser();
  return (
    <Container className={styles.OutterContainer} >
      <Card className= {styles.CardContainer} >
        <Card.Body>
          <Card.Text>
            <h4 className={styles.Quote}> "Unleash Your Stories, Frame Your Memories: 
            Paws & Snaps, Where Pets Meet Pixels!"</h4> 
              <br />
              <p className={styles.CardText}>Join our vibrant community to share 
              stories, photos, and valuable insights.<br/> Whether you're a seasoned 
              writer or just starting out, Paws & Snaps welcomes you to showcase 
              your passion and creativity. <br /><br />Sign up now to celebrate the bond 
              between humans and animals, one blog post and snapshot at a time.</p>
          </Card.Text>
          {/*
           * Show send us a message button if user is logged in
           * Otherwise, show sign up and sign in buttons
           */}
          <>
              <Link to="/signup">
                <Button className={btnStyles.Button} variant="primary">
                  Sign Up
                </Button>
              </Link>
              <Link to="/signin">
                <Button className={btnStyles.Button} variant="primary">
                  Sign In
                </Button>
              </Link>
            </>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;

{/*<h1 className={` ${styles.Heading1}`}>PAWS & SNAPS</h1>
          
          <Card.Text  Introducing Paws & Snaps: your go-to hub for pet lovers and photography enthusiasts. Join our vibrant community to share stories, photos, and valuable insights. Whether you're a seasoned writer or just starting out, Paws & Snaps welcomes you to showcase your passion and creativity. Sign up now to celebrate the bond between humans and animals, one blog post and snapshot at a time.
            Introducing our pet-centric platform, the ultimate companion for sharing the 
            joyous moments of your furry friends' lives in just a few clicks.
          </Card.Text>
          <h2 className={`${styles.Heading2} text-muted`}>
            How did your furry friend bring joy into your day today?
          </h2>
          <Card.Text className={`text-muted pt-2 ${styles.Content}`}>
            Join our vibrant community of pet enthusiasts to spread smiles,
            forge connections, and create lasting memories. Welcome 
            to the ultimate destination where every wag, purr, 
            and tail flick is celebrated with joy and camaraderie.
          </Card.Text>

          
         {/*} {
            
          }*/}