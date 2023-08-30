"use client"

import AnswerRecorder from "../../../../../../components/AnswerRecorder";
import { createAnswer, createCharacter, readQuestions } from "../../../../../../services/CharacterService";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'

export default function CharacterCreate ({ params } : { params: {characterID: string }}) {
  const {characterID} = params;
  const type = useSearchParams().get("type") as unknown as number;

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    loadQuestions(type);
  }, []);

  const loadQuestions = async (pType: number) => {
    const questionsData = await readQuestions(pType);
    setQuestions(questionsData.questions);
  };

  const handleAnswerSave = async (pQuestionId: string, pBlob: Blob) => {
    createAnswer(characterID, pQuestionId, pBlob);
  };

  const handlePublish = async () => {
    
  };

  const handleDelete = async () => {
    
  };


  //<AnswerRecorder onVideoSave={handleAnswerSave} questions={questions}/>
  
  return (
    <div>
      <div>
        
      </div>
      <div className="formContainer">
        <h3>Ingresa las etiquetas de tu personaje</h3>
        
        <label htmlFor="tags" className="inputTextLabel">
          <span>Etiquetas</span>
        </label>
        <input id="tags" type="text" autoComplete="off" placeholder="#Tag" className="inputText" autoFocus/>
        <button type="button" className="button" onClick={handlePublish}>Publicar</button>
        <button type="button" className="button" onClick={handleDelete}>Descartar</button>
      </div>
    </div>
  );
}