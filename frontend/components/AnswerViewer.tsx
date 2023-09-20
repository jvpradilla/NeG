import { useState } from "react";

import Stepper from "./Stepper";
import styles from "./AnswerViewer.module.css";

const API_URL = process.env.NEXT_PUBLIC_HOST;

export default function AnswerViewer(props: { answers: any[], onEnded: () => void }) {

  const [answerIndex, setAnswerIndex] = useState<number>(0);
  const [xCoord, setXCoord] = useState<number>(0);

  const handlePrevious = async () => {
   if (answerIndex > 0) {
    setAnswerIndex(answerIndex - 1);
   }
  };

  const handleNext = async () => {
    if (answerIndex < props.answers.length - 1) {
      setAnswerIndex(answerIndex + 1);
    } else {
      props.onEnded();
      setAnswerIndex(0);
    }
  };

  const handleTouchStart = async (e: React.TouchEvent<HTMLDivElement>) => {
    setXCoord(e.changedTouches[0]?.clientX);
  };

  const handleTouchEnd = async (e: React.TouchEvent<HTMLDivElement>) => {
    const dist = xCoord - e.changedTouches[0]?.clientX;
    if ( dist > 30) {
      handleNext();
    } else if (dist < -30){
      handlePrevious();
    }
    setXCoord(0);
  };

  /*
<div className={styles.previousControl} onClick={handlePrevious} hidden={answerIndex == 0}><i className="bi bi-circle-fill"><span className="bi bi-arrow-left-short"></span></i></div>
        <div className={styles.nextControl} onClick={handleNext} hidden={answerIndex == props.answers.length - 1}><i className="bi bi-circle-fill"><span className="bi bi-arrow-right-short"></span></i></div>
  */

  return (
    <div className={styles.container} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className={styles.headercontainer}>      
        <Stepper steps={props.answers.length} activeStep={answerIndex}/>
        <div className={styles.question}>{props.answers[answerIndex]?.questionContent}</div>
      </div>
      <div className={styles.videocontainer}>        
        <video className={styles.video} id="videoPlay" src={API_URL + props.answers[answerIndex]?.answerVideoURL} autoPlay onEnded={handleNext} controls></video>
      </div>  
    </div>
  );
}