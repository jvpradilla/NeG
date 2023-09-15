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
    setCharacters(charactersData);
  }
//<CharacterCarousel characters={characters}/>
  return (
    <div>
      <h1>Home page</h1>
      
    </div>
  );
}