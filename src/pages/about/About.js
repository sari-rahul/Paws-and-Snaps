import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
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
    <div className={styles.Background}>
      <Card className="text-center p-3 shadow-lg mt-5" style={{ width: "40rem" }}>
        <Card.Body>
          <h1 className={`${appStyles.Handwritten} ${styles.Heading1}`}>Pawfect Pics</h1>
          
          <Card.Text  className={`text-muted pt-3 ${styles.Content}`}>
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

          {/*
           * Show send us a message button if user is logged in
           * Otherwise, show sign up and sign in buttons
           */}
          {
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
          }
        </Card.Body>
      </Card>
    </div>
  );
};

export default About;