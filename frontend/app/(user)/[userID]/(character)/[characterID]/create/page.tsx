"use client"

import AnswerRecorder from "../../../../../../components/AnswerRecorder";
import { createAnswer, createCharacter, readQuestions, publishCharacter, deleteCharacter } from "../../../../../../services/CharacterService";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'

export default function CharacterCreate ({ params } : { params: {userID: string, characterID: string }}) {

  const { push } = useRouter();

  const { userID, characterID } = params;
  const type = useSearchParams().get("type") as unknown as number;

  const [showMe, setShowMe] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    loadQuestions(type);
  }, []);

  

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
  
  return (
    <div>
      <div style={{display: showMe?"block":"none"}}>
        <AnswerRecorder onCharacterSave={handleCharacterSave} onVideoSave={handleAnswerSave} questions={questions}/>
      </div>
      <div className="formContainer" style={{display: showMe?"none":"grid"}}>
        <h3>Ingresa las etiquetas de tu personaje</h3>
        <button type="button" className="button" onClick={handlePublish}>Publicar</button>
        <button type="button" className="button" onClick={handleDelete}>Descartar</button>
      </div>
    </div>
  );
}