import React from "react";
import styles from "../styles/Asset.module.css";

const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <img src="https://cdn.dribbble.com/users/5484/screenshots/2145786/for_dribbble.gif" 
      alt="Loading"  className={styles.Spinner}
      />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;
