//this is a simple 404 page with some custom styling
import React from "react";
import styles from "../css/P404.module.css"

//declaring the 404page function componenet
function P404() {
  return (
    <>
      <h1 className={styles.h1}>Error 404 page not found</h1>
    </>
  );
}
//exporting the 404 page
export default P404;
