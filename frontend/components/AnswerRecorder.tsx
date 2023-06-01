import Webcam from "react-webcam";
import React, { useCallback, useRef, useState } from "react";
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

  const handleDataAvailable = useCallback(( data: any ) => {
      console.log(data.data);
      if (data.data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data.data));
      }
  }, [setRecordedChunks]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {

      const blob = new Blob(recordedChunks, {
        type: "video/webm;codecs=vp9,opus",
      });

      props.onVideoSave(blob);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const handleRecordStartAnswer = () => {
    const video = webCamRef.current as Webcam;
    const stream = video.stream as MediaStream;
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm;codecs=vp9,opus"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
    console.log("grabando");
  };

  const handleRecordStopAnswer = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      console.log("parando");
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
  };

  const handleUploadAnswer = () => {
    if (recordedChunks.length) {

      const blob = new Blob(recordedChunks, {
        type: "video/webm;codecs=vp9,opus",
      });

      props.onVideoSave(blob);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
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