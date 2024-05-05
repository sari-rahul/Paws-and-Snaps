import React from 'react';
import { Container,Form } from 'react-bootstrap';
import styles from '../styles/Footer.module.css';

const Footer = () => {
    function handlePinterstIconClick() {
        window.open('https://www.pinterest.com', '_blank');
      }
      function handleFacebookIconClick() {
        window.open('https://www.facebook.com', '_blank');
      }
      function handleInstagramIconClick() {
        window.open('https://www.Instagram.com', '_blank');
      }
  return (

    <Container className={styles.FooterContainer}>
    <div className={styles.FooterBlocks}>
        <h5>CATEGORIES</h5>
        <hr />
        <Form.Group className={styles.SearchBar}>
            <Form.Control size="lg" type="text" 
                placeholder="Search Category"/>        
        </Form.Group>
    </div>
    <div className={styles.FooterBlocks}> 
        <h5>FOLLOW US</h5>
        <hr />
        <div className={styles.IconOutterDiv}>
            <div className={styles.IconDiv} onClick={handlePinterstIconClick}>
                <i class="fa fa-pinterest-square" aria-hidden="true"></i>
            </div>
            <div className={styles.IconDiv} onClick={handleFacebookIconClick}>
                <i class="fa fa-facebook" aria-hidden="true"></i>
            </div>
            <div className={styles.IconDiv} onClick={handleInstagramIconClick}>
                <i class="fa fa-instagram" aria-hidden="true"></i>
            </div>
        </div>
    </div>
    <div className={styles.FooterBlocks}>
        <h5>AFFILIATE DISCLOSURE</h5>
        <hr />
        <p>Paws & Snaps is a participant in the Amazon Services LLC 
            Associates Program, an affiliate advertising program 
            designed to provide a means for sites to earn advertising 
            fees by advertising & linking to Amazon.com</p>
    </div>
    </Container> 
   
    );
    };

export default Footer

