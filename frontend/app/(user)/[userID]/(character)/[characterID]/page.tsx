
"use client";

import AnswerViewer from "../../../../../components/AnswerViewer";
import { readAnswerdByCharacterId } from "../../../../../services/AnswerService";
import { useEffect, useState } from "react";

export default function CharacterReadId ({params}: {params: {characterID: string };}) {
  const {characterID} = params;
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    loadAnswers();
  }, []);

  const loadAnswers = async () => {
    const answersData = await readAnswerdByCharacterId(characterID);
    setAnswers(answersData);
  };

  return (
    <div>
      <AnswerViewer answers={answers} />
    </div>
  );
}