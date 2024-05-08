import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import styles from "../../styles/About.module.css";
import btnStyles from "../../styles/Button.module.css";
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
