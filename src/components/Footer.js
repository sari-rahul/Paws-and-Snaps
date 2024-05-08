import React from 'react';
import { Container } from 'react-bootstrap';
import styles from '../styles/Footer.module.css';
import { useCurrentUser } from "../contexts/CurrentUserContext";
import logo from '../assets/logo.png';

const Footer = () => {
    const currentUser = useCurrentUser();

    // Function which redirects user to Facebook, Pinterest, and Instagram pages
    function handlePinterestIconClick() {
        window.open('https://www.pinterest.com', '_blank');
    }

    function handleFacebookIconClick() {
        window.open('https://www.facebook.com', '_blank');
    }

    function handleInstagramIconClick() {
        window.open('https://www.instagram.com', '_blank'); // corrected URL
    }

    return (
        <>
            {currentUser && (
                <Container className={styles.FooterContainer}>
                    <div className={styles.FooterBlocks}>
                        <h5>FOLLOW US</h5>
                        <hr />
                        <div className={styles.IconOutterDiv}>
                            <div className={styles.IconDiv} onClick={handlePinterestIconClick}>
                                <i className="fa fa-pinterest-square" aria-hidden="true"></i>
                            </div>
                            <div className={styles.IconDiv} onClick={handleFacebookIconClick}>
                                <i className="fa fa-facebook" aria-hidden="true"></i>
                            </div>
                            <div className={styles.IconDiv} onClick={handleInstagramIconClick}>
                                <i className="fa fa-instagram" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                    <div className={styles.FooterBlocks}>
                        <img src={logo} alt="logo" height="140"/>
                    </div>
                    <div className={styles.FooterBlocks}>
                        <h5>AFFILIATE DISCLOSURE</h5>
                        <hr />
                        <p>Paws & Snaps is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising & linking to Amazon.com</p>
                    </div>
                </Container>
            )}
        </>
    );
};

export default Footer;
