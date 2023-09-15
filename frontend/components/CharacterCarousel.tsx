"use client"

import { useEffect, useState } from "react";
import AnswerViewer from "./AnswerViewer";
import { readAnswerdByCharacterId } from "../services/AnswerService";

export default function CharacterCarousel(props: { characters: any[], onEnded: () => void }){
  const [characterIndex, setCharacterIndex] = useState<number>(0);
  const [answers, setAnswers] = useState([]);
  
  useEffect(() => {
    loadAnswersByCharacterId(props.characters[characterIndex]?.id)
  }, []);

  useEffect(() => {
    loadAnswersByCharacterId(props.characters[characterIndex]?.id)
  }, [characterIndex]);

  const loadAnswersByCharacterId = async (characterID: string) => {
    const answersData = await readAnswerdByCharacterId(characterID);
    setAnswers(answersData);
  };

  const handleNext = async () => {
    if (characterIndex == props.characters.length - 1) {
      props.onEnded();
      setCharacterIndex(0);
      return;
    }
    setCharacterIndex(characterIndex + 1);
  };

  if (answers.length == 0) {
    return (
      <div className="loaderPage">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <AnswerViewer answers={answers} onEnded={handleNext}/>
  );
}