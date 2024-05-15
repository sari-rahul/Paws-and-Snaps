import React from 'react';
import Notfound from '../assets/not found.jpg';
import { Container } from 'react-bootstrap';
import Asset from '../components/Assets.js';
import appStyles from "../App.module.css"
const NotFound = () => {
  return (
    <Container className={appStyles.AssetContainer}>
        <Asset src={Notfound} message={'The Page Is Not Found'}/>
    </Container>
  )
}

export default NotFound