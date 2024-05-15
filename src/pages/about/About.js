//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Imports from React
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Import from react-bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Internal imports
import styles from "../../styles/About.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useRedirect } from "../../hooks/useRedirect";

const About = () => {
  useRedirect("loggedIn");

  return (
    <Container className={styles.OutterContainer}>
      <Card className={styles.CardContainer}>
        <Card.Body>
          <div>
            <h4 className={styles.Quote}>
              "Unleash Your Stories, Frame Your Memories: Paws & Snaps, Where
              Pets Meet Pixels!"
            </h4>
            <br />
            <div className={styles.CardText}>
              Join our vibrant community to share stories, photos, and valuable
              insights. Whether you're a seasoned writer or just starting out,
              Paws & Snaps welcomes you to showcase your passion and creativity.
              <br />
              <br />
              Sign up now to celebrate the bond between humans and animals, one
              blog post and snapshot at a time.
            </div>
          </div>
          <div className={styles.ButtonContainer}>
            <Link to="/signup">
              <Button className={btnStyles.Button} variant="primary">
                Sign Up
              </Button>
            </Link>
            <br />
            <Link to="/signin">
              <Button className={btnStyles.Button} variant="primary">
                Sign In
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;
