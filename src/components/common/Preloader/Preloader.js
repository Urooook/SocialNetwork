import React from 'react';
import preloader from '../../../assets/images/preloader.svg';
import styles from './Preloader.module.css';

const Preloader = (props) =>{
    return(
        <div className={styles.preloader}>
        <div className={styles.spinner}></div>
      </div>
    )
}

export default Preloader