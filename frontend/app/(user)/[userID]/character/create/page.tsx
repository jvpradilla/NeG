"use client"

import AnswerRecorder from "../../../../../components/AnswerRecorder";
import { createCharacter } from "../../../../../services/CharacterService";

export default function CharacterCreate () {

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



  return (
    <div>
      <form>
        <h1>Character - Create</h1>
        <button type="button" onClick={handleSubmit}>Crear Personaje</button>
      </form>
      <AnswerRecorder onVideoSave={handleVideoSave} />
    </div>
  );
}