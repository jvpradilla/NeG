import Webcam from "react-webcam";
import React, { useRef, useState, useEffect } from "react";
import AnswerRecorderBar from "./AnswerRecorderBar";

export default function RecordVideo(props: { onVideoSave: (pQuestionId: string, pBlob: Blob) => void, questions: any[]}) {

  const webCamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder>();
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [actualQuestion, setActualQuestion]  = useState<string>(props.questions[questionIndex]?.text);

  const constraints = {
    //width:  { min: 640, ideal: 1920, max: 1920 },
    //height: { min: 400, ideal: 1080 },
    //aspectRatio: 1.777777778,
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
        props.onVideoSave(props.questions[questionIndex]?.id, event.data);
        mediaRecorderRef.current = undefined;
      };
      mediaRecorderRef.current.start();
      console.log("start");
    } else {
      mediaRecorderRef.current.resume();
      console.log("resume");
    }  
  };

  const handleRecordStopAnswer = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.pause();
      console.log("pause");
    }
  };

  const handlePreviewQuestion = () => {
    if (questionIndex === 0) return; 
    setQuestionIndex(questionIndex - 1);
    console.log("handlePreviewQuestion");
  };

  const handleNextQuestion = () => {
    if (questionIndex === props.questions.length - 1) return;
    setQuestionIndex(questionIndex + 1);
    console.log("handleNextQuestion");
  };

  const handleDeleteAnswer = () => {
    mediaRecorderRef.current = undefined;
  };

  const handleUploadAnswer = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      console.log("stop");
    }
  };

  return (
    <div>
      <div>{actualQuestion}</div>
      <Webcam ref={webCamRef} audio={true} muted={true} mirrored={true} videoConstraints={constraints}/>
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