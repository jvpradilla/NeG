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

  let type = 0;
  const [name, setName] = useState("");

  const nameHandler =  (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const typeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    type = e.currentTarget.value as unknown as number;
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
      <h3>Escoge el tipo de personaje que quieres crear</h3>
      <div className="characterTypeContent">
        <button value={7} className="characterTypeButton" onClick={typeHandler}>
          <i className="bi bi-person-down"/><br/>
          Sencillo
        </button>
      </div>
      <div className="characterTypeContent">
        <button value={70} className="characterTypeButton" onClick={typeHandler}>
          <i className="bi bi-person-down"/><br/>
          Natural
        </button>
      </div>
      <div className="characterTypeContent">
        <button value={98} className="characterTypeButton" onClick={typeHandler}>
          <i className="bi bi-person-down"/><br/>
          Complejo
        </button>
      </div>
      <button type="button" className="button" onClick={handleSubmit}>Crear Personaje</button>
    </div>
  );
}