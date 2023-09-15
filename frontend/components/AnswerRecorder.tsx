import Webcam from "react-webcam";
import React, { useRef, useState, useEffect } from "react";
import AnswerRecorderBar from "./AnswerRecorderBar";

import styles from "./AnswerRecorder.module.css";
import Stepper from "./Stepper";

export default function RecordVideo(props: { onCharacterSave: () =>void, onVideoSave: (pQuestionId: string, pQuestionContent: string, pBlob: Blob) => void, questions: any[]}) {

  const webCamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder>();
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [answersSize, setAnswersSize] = useState<number>(0);
  const [actualQuestion, setActualQuestion]  = useState<string>(props.questions[questionIndex]?.text);

  const constraints = {
    //width:  { min: 320, ideal: 1920, max: 1920 },
    //height: { min: 400, ideal: 1080 },
    aspectRatio: 0.5625,
    frameRate: { max: 30 },
    facingMode:  "user"
  };

  useEffect(() => {
    setActualQuestion(props.questions[questionIndex]?.text);
  });

  const handleRecordStartAnswer = () => {
    if(mediaRecorderRef.current === undefined) {        
      const video = webCamRef.current as Webcam
      const stream = video?.stream as MediaStream;
      mediaRecorderRef.current = new MediaRecorder(stream, {mimeType: "video/webm;codecs=vp9,opus"});
      mediaRecorderRef.current.ondataavailable = (event) => {
        props.onVideoSave(props.questions[questionIndex]?.id, props.questions[questionIndex]?.text, event.data);
        mediaRecorderRef.current = undefined;
        //const videoObj = document.getElementById("videoPlay") as HTMLVideoElement;
        //videoObj.src = URL.createObjectURL(event.data);
      };
      mediaRecorderRef.current.start();
      //console.log("start");
    } else {
      mediaRecorderRef.current.resume();
      //console.log("resume");
    }  
  };

  const handleRecordStopAnswer = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.pause();
      //console.log("pause");
    }
  };

  const handlePreviewQuestion = () => {
    if (questionIndex === 0) return; 
    setQuestionIndex(questionIndex - 1);
    //console.log("handlePreviewQuestion");
  };

  const handleNextQuestion = () => {
    if (questionIndex === props.questions.length - 1) return;
    setQuestionIndex(questionIndex + 1);
    //console.log("handleNextQuestion");
  };

  const handleDeleteAnswer = () => {
    mediaRecorderRef.current = undefined;
  };

  const handleUploadAnswer = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setAnswersSize(answersSize + 1);
      if (answersSize === props.questions.length - 1) {
        console.log("finished");
        props.onCharacterSave();
      }
      //console.log("stop");
    }
  };

  //<video id="videoPlay" className={styles.webcam} autoPlay controls></video>

  return (
    <div className={styles.container}>
      <div className={styles.question}>{actualQuestion}</div>
      <Stepper steps={props.questions.length} activeStep={questionIndex}/>
      <div className={styles.webcamcontainer}>
        <Webcam className={styles.webcam} ref={webCamRef} audio={true} muted={true} mirrored={true} videoConstraints={constraints}/>
      </div>    
      <AnswerRecorderBar 
        onRecordStartAnswer={handleRecordStartAnswer}
        onRecordStopAnswer={handleRecordStopAnswer}
        onPreviewQuestion={handlePreviewQuestion} 
        onNextQuestion={handleNextQuestion} 
        onDeleteAnbswer={handleDeleteAnswer} 
        onUploadAnswer={handleUploadAnswer}
      />
    </div>
  );
}