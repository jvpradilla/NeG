"use client";

import { saveLocation } from "../services/LocationService";
import CharacterCarousel from "../components/CharacterCarousel";
import { readAllCharacters } from "../services/CharacterService";
import { useEffect, useState } from "react";

export default function HomePage () {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    saveLocation("/home");
    loadCharacters();    
  }, []);

  const loadCharacters = async () => {
    const charactersData = await readAllCharacters();
    const charactersShuffled = charactersData.sort(() => 0.5 - Math.random());
    setCharacters(charactersShuffled);
  }

  const handleEnd = async () => {
    loadCharacters();
  };

  if (characters.length == 0) {
    return (
      <div className="loaderPage">
        <span className="loader"></span>
      </div>
    );
  }
  
  return (
    <CharacterCarousel characters={characters} onEnded={handleEnd}/>
  );  
}