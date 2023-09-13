"use client"

import { useRouter } from 'next/navigation';
import { createAnswer, createCharacter, readQuestions } from "../../../../../services/CharacterService";
import { getSession, hasValidSession } from "../../../../../services/SessionService";

import { useEffect, useState } from "react";

export default function CharacterCreate () {

  const { push } = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (hasValidSession()) {
      const session = getSession();
      const localUserName = session?.username;
      setUsername(localUserName? localUserName : "");
    }
  }, []);

  //let type = 14;
  const [name, setName] = useState("");
  const [type, setType] = useState(14);

  const nameHandler =  (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const typeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setType(e.currentTarget.value as unknown as number);
    const toggles = document.querySelectorAll(".characterTypeToggleSelected");
    toggles.forEach(toggle => {
      toggle.classList.remove("characterTypeToggleSelected");
    });

    e.currentTarget.classList.add("characterTypeToggleSelected");
  };

  const handleSubmit = async () => {
    const characterId = await createCharacter(name, username);    
    if (characterId !== "") {
      push(`/${username}/character/${characterId}/create?type=${type}`);
    }
  };

  return (
    <div className="formContainer">
      <h1>Crea un nuevo personaje</h1>
      <label htmlFor="name" className="inputTextLabel">
        <span>¿Cuál es el nombre del personaje?</span>
      </label>
      <input id="name" type="text" autoComplete="off" placeholder="Nombre del personaje" className="inputText" minLength={6} autoFocus required onChange={nameHandler}/>
      <label className="inputTextLabel">Escoge el tipo de personaje que quieres crear</label>
      <div className="characterTypeContent">
        <button value={7} className="characterTypeToggle" onClick={typeHandler}>
          <i className="characterIcon bi bi-person-down"/><br/>
          Sencillo (7 preguntas)
        </button>
        <button value={14} className="characterTypeToggle characterTypeToggleSelected" onClick={typeHandler}>
          <i className="characterIcon bi bi-person-down"/><br/>
          Intermedio (14 preguntas)
        </button>
        <button value={21} className="characterTypeToggle" onClick={typeHandler}>
          <i className="characterIcon bi bi-person-down"/><br/>
          Complejo (21 preguntas)
        </button>
      </div>
      <button type="button" className="button" onClick={handleSubmit}>Crear Personaje</button>
    </div>
  );
}