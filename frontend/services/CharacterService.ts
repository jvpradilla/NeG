import { v4 } from "uuid";

export type Answer = {
  id: string;
  questionId: string;
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

export const createAnswer = async (pQuestionId: string, pAnswer: Blob) => {
  console.log("pQuestionId: ", pQuestionId);
  const response = await fetch("http://localhost:5000/answer/video/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: pAnswer
    });
    if( response.status !== 200 ) {
      console.log(await response.json());
    } else {
      const answerVideoURLData = (await response.json()).url as string;  
      const answerId = v4();
      const answer: Answer = {
        id: answerId,
        questionId: pQuestionId,
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