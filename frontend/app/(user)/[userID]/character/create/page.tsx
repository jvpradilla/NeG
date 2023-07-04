"use client"

import CharacterType from "@/components/CharacterType";
import AnswerRecorder from "../../../../../components/AnswerRecorder";
import { createAnswer, createCharacter, readQuestions } from "../../../../../services/CharacterService";
import { useState } from "react";

export default function CharacterCreate () {

  const [characterType, setCharacterType] = useState(0);
  const [questions, setQuestions] = useState([]);

  const handleSubmit = async () => {
    await createCharacter();    
  };

  const handleVideoSave = async (pQuestionId: string, pBlob: Blob) => {
    createAnswer(pQuestionId, pBlob);
  };

  const handleCharacterTypeChange = async (pCharacterType: number) => {
    setCharacterType(pCharacterType);
    const questionsData = await readQuestions(pCharacterType);
    //console.log("Data: ", questionsData.questions);
    setQuestions(questionsData.questions);
  };

  //<h1>Character - Create</h1>
  //<button type="button" onClick={handleSubmit}>Crear Personaje</button>

  return (
    <div>
      { characterType === 0 ? (
        <CharacterType onCharacterTypeChange={handleCharacterTypeChange}/>
      ) : (
        <AnswerRecorder onVideoSave={handleVideoSave} questions={questions}/>
      )}
    </div>
  );
}