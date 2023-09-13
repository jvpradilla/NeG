import Step from "./Step";

import { useState, useEffect } from "react";
import styles from "./Stepper.module.css";

export default function Stepper (props: { steps: number, activeStep: number }) {

  //const stepsElements = [props.steps];

  // index < props.activeStep ? 100 : 0
  /*
  {stepsElements.map((step, index) => {
        return <Step key={index} percent={0}/>
      })}
  */

  return (
    <div className={styles.stepper}>
      {
        Array.apply(0, Array(props.steps)).map(function (x, i) {
          return <Step key={i} percent={i <= props.activeStep ? 100 : 0} widthComponent={100/props.steps}/>
        })
      }
      <p></p>
    </div>
  ) 
}