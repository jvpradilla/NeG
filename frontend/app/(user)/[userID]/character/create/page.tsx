"use client"

import AnswerRecorder from "../../../../../components/AnswerRecorder";
import { createCharacter } from "../../../../../services/CharacterService";

export default function CharacterCreate () {

  const handleSubmit = async () => {
    await createCharacter();
  };
  return (
    <div>
      <form>
        <h1>Character - Create</h1>
        <button type="button" onClick={handleSubmit}>Crear Personaje</button>
      </form>
      <AnswerRecorder />
    </div>
  );
}