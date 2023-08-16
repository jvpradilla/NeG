import { useState } from "react";

import styles from "./AnswerRecorderBar.module.css";

export default function AnswerRecorderBar(props: {onRecordStartAnswer: () => void, onRecordStopAnswer: () => void, onPreviewQuestion: () => void, onNextQuestion: () => void, onDeleteAnbswer: () => void, onUploadAnswer: () => void,  }) {

  const [recording, setRecording] = useState(false);

  const handleStartRecordAnswer = () => {
    setRecording(true);
    props.onRecordStartAnswer();
  };

  const handleStopRecordAnswer = () => {
    props.onRecordStopAnswer();
  };

  const handlePreviewQuestion = () => {
    props.onPreviewQuestion();
  };

  const handleNextQuestion = () => { 
    props.onNextQuestion();
  };

  const handleDeleteAnswer = () => {
    setRecording(false);
    props.onDeleteAnbswer();
  };

  const handleUploadAnswer = () => {
    setRecording(false);
    props.onUploadAnswer();
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <button className={styles.navigation_item} hidden={recording} onClick={handlePreviewQuestion}>Prev</button>
        <button className={styles.navigation_item} hidden={!recording} onClick={handleDeleteAnswer}>Delete</button>
        <button className={styles.navigation_item} onMouseDown={handleStartRecordAnswer} onMouseUp={handleStopRecordAnswer}>Rec</button>
        <button className={styles.navigation_item} hidden={!recording} onClick={handleUploadAnswer}>Upload</button>
        <button className={styles.navigation_item} hidden={recording} onClick={handleNextQuestion}>Next</button>
      </div>
    </div>
  );
}