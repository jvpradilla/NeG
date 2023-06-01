import { useState } from "react";

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
    <div>
      <button hidden={recording} onClick={handlePreviewQuestion}>Prev</button>
      <button hidden={!recording} onClick={handleDeleteAnswer}>Delete</button>
      <button onMouseDown={handleStartRecordAnswer} onMouseUp={handleStopRecordAnswer}>Rec</button>
      <button hidden={!recording} onClick={handleUploadAnswer}>Upload</button>
      <button hidden={recording} onClick={handleNextQuestion}>Next</button>
    </div>
  );
}