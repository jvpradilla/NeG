import { v4 } from "uuid";

export const readQuestions = async (pQuantity: number): Promise<any> => {
  const response = await fetch(`http://localhost:5000/questionnaire/?quantity=${pQuantity}`);
  if (response.status !== 200) {
    console.log(await response.json());
  } else {
    const questions = await response.json();
    return questions;
  }
};

export const createCharacter = async () => {
  const characterId = v4();

  const character = {
    "id" : characterId
  };

  const response = await fetch("http://localhost:5000/character", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(character)
  });
  
  if( response.status !== 200 ) {
    console.log(await response.json());
  } else {
    console.log("Character created");
  }
};
