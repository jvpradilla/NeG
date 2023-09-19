"use client"

import AnswerRecorder from "../../../../../../components/AnswerRecorder";
import { createAnswer, createCharacter, readQuestions, publishCharacter, deleteCharacter } from "../../../../../../services/CharacterService";
import { saveLocation } from "../../../../../../services/LocationService";
import { useRef, useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import Webcam from "react-webcam";

export default function CharacterCreate ({ params } : { params: {userID: string, characterID: string }}) {

  const { push } = useRouter();
  const webCamRef = useRef<Webcam>(null);

  const { userID, characterID } = params;
  const type = useSearchParams().get("type") as unknown as number;

  const [showMe, setShowMe] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    saveLocation("/new");
    loadQuestions(type);
  }, []);

  const constraints = {
    width:  { min: 200, ideal: 200, max: 200 },
    height: { min: 200, ideal: 200, max: 200 },
    aspectRatio: 0.5625,
    frameRate: { max: 30 },
    facingMode:  "user"
  };

  const loadQuestions = async (pType: number) => {
    const questionsData = await readQuestions(pType);
    setQuestions(questionsData.questions);
  };

  const handleAnswerSave = async (pQuestionId: string, pQuestionContent: string, pBlob: Blob) => {
    createAnswer(characterID, pQuestionId, pQuestionContent, pBlob);
  };

  const handlePublish = async () => {
    const isPublish = await publishCharacter(characterID);
    if (isPublish) {
      const urlRedirect = "/" + userID;
      handleRedirect(urlRedirect);
    }    
  };

  const handleDelete = async () => {
    deleteCharacter(characterID);
  };

  const handleCharacterSave = async () => {
    setShowMe(!showMe);
  };

  const handleRedirect = (pURLRedirect: string) => {
    const nextURL = localStorage.getItem("nextURL");
    if (nextURL !== null && nextURL !== undefined && nextURL !== "") {
      localStorage.removeItem("nextURL");
      push(nextURL);
    } else {
      push(pURLRedirect);
    }
  };

  /*
<div style={{display: showMe?"block":"none"}}>
        <AnswerRecorder onCharacterSave={handleCharacterSave} onVideoSave={handleAnswerSave} questions={questions}/>
      </div>
  */

      /*
      <div>
      <div className="formContainer" style={{display: showMe?"none":"grid"}}>
        <h1>Crea un nuevo personaje</h1>
        <div>
          <Webcam ref={webCamRef} audio={true} muted={true} mirrored={true} videoConstraints={constraints}/>
        </div>
        <div className="twoColumns">
          <button type="button" className="button" onClick={handlePublish}>Publicar</button>
          <button type="button" className="negativeButton" onClick={handleDelete}><i className="bi bi-trash3"></i></button>
        </div>
      </div>
    </div>
      
      */
  
  return (
    <div>
      <div style={{display: showMe?"block":"none"}}>
        <AnswerRecorder onCharacterSave={handleCharacterSave} onVideoSave={handleAnswerSave} questions={questions}/>
      </div>
      <div className="formContainer" style={{display: showMe?"none":"grid"}}>
        <h1>Crea un nuevo personaje</h1>
        <Webcam ref={webCamRef} audio={true} muted={true} mirrored={true} videoConstraints={constraints} className="video-circle"/> 
        <div className="twoColumns">
            <button type="button" className="button" onClick={handlePublish}>Publicar</button>
            <button type="button" className="negativeButton" onClick={handleDelete}><i className="bi bi-trash3"></i></button>
        </div>
    </div>
    </div>
  );
}

/*
<div className="formContainer">
      <h1>Crea un nuevo personaje</h1>
      <Webcam ref={webCamRef} audio={true} muted={true} mirrored={true} videoConstraints={constraints} className="video-circle"/> 
      <div className="twoColumns">
          <button type="button" className="button" onClick={handlePublish}>Publicar</button>
          <button type="button" className="negativeButton" onClick={handleDelete}><i className="bi bi-trash3"></i></button>
        </div>
    </div>
*/