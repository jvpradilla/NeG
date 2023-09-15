import { useState } from "react";

import styles from "./AnswerRecorderBar.module.css";

export default function AnswerRecorderBar(props: {onRecordStartAnswer: () => void, onRecordStopAnswer: () => void, onPreviewQuestion: () => void, onNextQuestion: () => void, onDeleteAnbswer: () => void, onUploadAnswer: () => void,  }) {

  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleStartRecordAnswer = () => {
    setRecording(true);
    setProcessing(true);
    props.onRecordStartAnswer();
  };

  const handleStopRecordAnswer = () => {
    setRecording(false);
    props.onRecordStopAnswer();
  };

  const handlePreviewQuestion = () => {
    props.onPreviewQuestion();
  };

  const handleNextQuestion = () => { 
    props.onNextQuestion();
  };

  const handleDeleteAnswer = () => {
    setProcessing(false);
    props.onDeleteAnbswer();
  };

  const handleUploadAnswer = () => {
    setProcessing(false);
    props.onUploadAnswer();
    handleNextQuestion();
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <div className={styles.navigation_item} hidden={recording || processing} onClick={handlePreviewQuestion}><i className="bi bi-skip-start-fill"></i></div>
        <div className={styles.navigation_item} hidden={recording || !processing} onClick={handleDeleteAnswer}><i className="bi bi-trash3"></i></div>
        <div className={styles.record_item} onMouseDown={handleStartRecordAnswer} onMouseUp={handleStopRecordAnswer}><i className="bi bi-record-circle"></i></div>
        <div className={styles.navigation_item} hidden={recording || !processing} onClick={handleUploadAnswer}><i className="bi bi-cloud-upload"></i></div>
        <div className={styles.navigation_item} hidden={recording || processing} onClick={handleNextQuestion}><i className="bi bi-skip-end-fill"></i></div>
      </div>
    </div>
  );
}