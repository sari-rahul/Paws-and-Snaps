//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports from React 
import React from "react";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Internal Imports 
import styles from "../styles/Asset.module.css";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports from React Bootstrap 
import Spinner from 'react-bootstrap/Spinner';

const Asset = ({ spinner,smallSpinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && (
        <img
          src="https://cdn.dribbble.com/users/5484/screenshots/2145786/for_dribbble.gif"
          alt="Loading"
          className={styles.Spinner}
        />
      )}
      {smallSpinner && (
        <Spinner animation="grow" className={styles.smallSpinner} />
      )}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;

