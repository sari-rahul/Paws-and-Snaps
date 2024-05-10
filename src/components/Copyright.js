//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Imports from React
import React from 'react';

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Internal imports
import styles from '../styles/Copyright.module.css';

const Copyright = () => {
  return (
    <div className={styles.CopyrightContainer}>
        <p> 
        <i className="fa fa-copyright" aria-hidden="true"></i>
        Copyright <strong>  Paws & Snaps</strong> :All rights Reserved
        </p>
    </div>
  )
}

export default Copyright