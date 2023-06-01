"use client"

import CharacterType from "@/components/CharacterType";
import AnswerRecorder from "../../../../../components/AnswerRecorder";
import { createCharacter } from "../../../../../services/CharacterService";
import { useState } from "react";

export default function CharacterCreate () {

  const [characterType, setCharacterType] = useState(0);

  const handleSubmit = async () => {
    await createCharacter();
  };

  const handleVideoSave = async (pBlob: Blob) => {
    console.log(pBlob);
    console.log("handleVideoSave");
    const response = await fetch("http://localhost:5000/seed", {
      method: "POST",
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: pBlob
    });
    if( response.status !== 200 ) {
      console.log(await response.json());
    } else {
      return (await response.json()).url as string;    
    }
  };

  const handleCharacterTypeChange = (pCharacterType: number) => {
    console.log(pCharacterType);
    setCharacterType(pCharacterType);
  };

  return (
    <div>
      <h1>Character - Create</h1>
      <button type="button" onClick={handleSubmit}>Crear Personaje</button>
      { characterType === 0 ? (
        <CharacterType onCharacterTypeChange={handleCharacterTypeChange}/>
      ) : (
        <AnswerRecorder onVideoSave={handleVideoSave} />
      )}
    </div>
  );
}