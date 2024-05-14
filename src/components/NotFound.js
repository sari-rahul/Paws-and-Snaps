import React from 'react';
import Notfound from '../assets/not found.jpg';
import { Container } from 'react-bootstrap';
import Asset from '../components/Assets.js';
import styles from '../styles/NotFound.module.css';

const NotFound = () => {
  return (
    <Container className={styles.NotFoundContainer}>
        <Asset src={Notfound} message={'The Page Is Not Found'}/>
    </Container>
  )
}

export default NotFound