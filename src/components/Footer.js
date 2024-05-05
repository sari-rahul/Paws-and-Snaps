import React from 'react';
import { Container,Form } from 'react-bootstrap';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
  <>
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
            <div className={styles.IconDiv}>
                <i class="fa fa-pinterest-square" aria-hidden="true"></i>
            </div>
            <div className={styles.IconDiv}>
                <i class="fa fa-facebook" aria-hidden="true"></i>
            </div>
            <div className={styles.IconDiv}>
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
    <Container>
    <p> <strong>Copyright:Paws & Snaps</strong> :All rights Reserved</p>
    </Container>
 </>
   
  );
};

export default Footer