import Webcam from "react-webcam";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { on } from "events";
import AnswerRecorderBar from "./AnswerRecorderBar";

export default function RecordVideo(props: { onVideoSave: (pBlob: Blob) => void}) {

  const webCamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder>();
  const [url, setUrl] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const constraints = {
    //width:  { min: 640, ideal: 1920, max: 1920 },
    // height: { min: 400, ideal: 1080 },
    //aspectRatio: 1.777777778,
    frameRate: { max: 30 },
    facingMode:  "user"
  };

  const handleRecordStartAnswer = () => {
    if(mediaRecorderRef.current === undefined) {        
      const video = webCamRef.current as Webcam
      const stream = video?.stream as MediaStream;
      mediaRecorderRef.current = new MediaRecorder(stream, {mimeType: "video/webm;codecs=vp9,opus"});
      mediaRecorderRef.current.ondataavailable = (event) => {
        props.onVideoSave(event.data);
        setRecordedChunks([]);
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
    console.log("handlePreviewQuestion");
  };

  const handleNextQuestion = () => {
    console.log("handleNextQuestion");
  };

  const handleDeleteAnswer = () => {
    setRecordedChunks([]);
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