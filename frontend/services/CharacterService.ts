import { v4 } from "uuid";

export type Answer = {
  id: string;
  characterId: string;
  questionId: string;
  questionContent: string,
  answerVideoURL: string;
}

export const readQuestions = async (pQuantity: number): Promise<any> => {
  const response = await fetch(`http://localhost:5000/questionnaire/?quantity=${pQuantity}`);
  if (response.status !== 200) {
    console.log(await response.json());
  } else {
    const questions = await response.json();
    return questions;
  }
};

export const createAnswer = async (pCharacterId: string, pQuestionId: string, pQuestionContent: string, pAnswer: Blob) => {
  const response = await fetch("http://localhost:5000/answer/video/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: pAnswer
    });
    if (response.status !== 200) {
      console.log(await response.json());
    } else {
      const answerVideoURLData = (await response.json()).url as string;  
      const answerId = v4();
      const answer: Answer = {
        id: answerId,
        characterId: pCharacterId,
        questionId: pQuestionId,
        questionContent: pQuestionContent,
        answerVideoURL: answerVideoURLData
      };
      const responseAnswer = await fetch("http://localhost:5000/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answer)
      });  
      if( responseAnswer.status !== 200 ) {
        console.log(await responseAnswer.json());
      } else {
        console.log("Answer created");
      }
    }
};

export const createCharacter = async (pName: string, pUserName: string): Promise<string> => {
  const characterId = v4();

  const character = {
    "id" : characterId,
    "name" : pName,
    "username" : pUserName
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
    return "";
  } else {
    return characterId;
  }
};

export const readAllCharacters = async (): Promise<any> => {
  const response = await fetch(`http://localhost:5000/character`);
  if (response.status !== 200) {
    console.log(await response.json());
  } else {
    const characters = await response.json();
    return characters;
  }
};

export const readCharactersByUserName = async (pUserName: string): Promise<any> => {
  const response = await fetch(`http://localhost:5000/character/${pUserName}`);
  if (response.status !== 200) {
    console.log(await response.json());
  } else {
    const characters = await response.json();
    console.log(characters);
    return characters;
  }
};

export const deleteCharacter = async (pId: string) => {
  const response = await fetch(`http://localhost:5000/character/${pId}`, {
    method: "DELETE"
  });
  if (response.status !== 200) {
    console.log(await response.json());
  } else {
    console.log("Character deleted");
  }
};

export const publishCharacter = async (pId: string) : Promise<boolean> => {
  const response = await fetch(`http://localhost:5000/character/${pId}`, {
    method: "PUT"
  });
  if (response.status !== 200) {
    console.log(await response.json());
    return false;
  } else {
    console.log("Character published");
    return true;
  }
};