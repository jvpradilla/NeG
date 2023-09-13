import React, { useState } from "react";

import Stepper from "./Stepper";

import styles from "./AnswerViewer.module.css";

export default function AnswerViewer(props: { answers: any[] }) {

  const [answerIndex, setAnswerIndex] = useState<number>(0);

  const handlePrevious = async () => {
   if (answerIndex > 0) {
    setAnswerIndex(answerIndex - 1);
   }
  };

  const handleNext = async () => {
    if (answerIndex < props.answers.length - 1) {
      setAnswerIndex(answerIndex + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.question}>{props.answers[answerIndex]?.questionContent}</div>
      <Stepper steps={props.answers.length} activeStep={answerIndex}/>
      <div className={styles.videocontainer}>
        <div className={styles.previousControl} onClick={handlePrevious} hidden={answerIndex == 0}><i className="bi bi-circle-fill"><span className="bi bi-arrow-left-short"></span></i></div>
        <div className={styles.nextControl} onClick={handleNext} hidden={answerIndex == props.answers.length - 1}><i className="bi bi-circle-fill"><span className="bi bi-arrow-right-short"></span></i></div>
        <video className={styles.video} id="videoPlay" src={"http://localhost:5000" + props.answers[answerIndex]?.answerVideoURL} autoPlay></video>
      </div>  
    </div>
  );
}