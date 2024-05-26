import {  ThreeCircles } from 'react-loader-spinner'
import styles from './Loader.module.css'
import React from 'react'

const Loader = ({text="Loading ...",size=80}) => {
  return (
    <>
     <div className={styles.loaderWrapper}>
        <h2>{text}</h2>
        <ThreeCircles
        height={size}
        width={size}
        color={"#3861fb"}
      
        />
        </div> 
    </>
  )
}

export default Loader
