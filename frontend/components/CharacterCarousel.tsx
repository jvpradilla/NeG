"use client"

import { useEffect, useState } from "react";
import AnswerViewer from "./AnswerViewer";
import { readAnswerdByCharacterId } from "../services/AnswerService";

export default function CharacterCarousel(props: { characters: any[] }){
  const [characterIndex, setCharacterIndex] = useState<number>(0);
  const [answers, setAnswers] = useState([]);
  const [yCoord, setYCoord] = useState<number>(0);

  useEffect(() => {
    loadAnswersByCharacterId(props.characters[characterIndex]?.id)
  }, []);

  const loadAnswersByCharacterId = async (characterID: string) => {
    const answersData = await readAnswerdByCharacterId(characterID);
    setAnswers(answersData);
  };

  const handleNext = async () => {
    console.log("handleNext");
  };

  return (
    <AnswerViewer answers={answers} onEnded={handleNext}/>
  );
}