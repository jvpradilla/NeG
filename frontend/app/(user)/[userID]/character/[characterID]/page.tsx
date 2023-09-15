
"use client";

import AnswerViewer from "../../../../../components/AnswerViewer";
import { readAnswerdByCharacterId } from "../../../../../services/AnswerService";
import { saveLocation } from "../../../../../services/LocationService";
import { useEffect, useState } from "react";

export default function CharacterReadId ({params}: {params: {characterID: string };}) {
  const {characterID} = params;
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    saveLocation("/user");
    loadAnswers();
  }, []);

  const loadAnswers = async () => {
    const answersData = await readAnswerdByCharacterId(characterID);
    setAnswers(answersData);
  };

  const handleNext = async () => {
    console.log("handleNext");
  };

  return (
    <div>
      <AnswerViewer answers={answers} onEnded={handleNext}/>
    </div>
  );
}