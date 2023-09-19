"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { getUser } from "../../../services/UserService";
import { readCharactersByUserName } from "../../../services/CharacterService";
import { saveLocation } from "@/services/LocationService";
import { getSession, hasValidSession, saveSession, Session } from "../../../services/SessionService";


export default function UserReadId ({ params}: {params: { userID: string };}) {
  const { push } = useRouter();

  const {userID} = params;
  const [userName, setUserName] = useState("");
  const [userAvatarURL, setUserAvatarURL] = useState("");
  const [characters, setCharacters] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_HOST;

  useEffect(() => {
    saveLocation("/user");

    if (!hasValidSession()) {
      push('/signin');
    }

    const session = getSession();
    if (session !== null) {
      const localUserName = session?.username;
      if (localUserName !== null) {
        loadUser(userID);
        loadCharacters();
      }
    }
  }, []);


  const loadUser = async (pUserID: string) => {
    const user = await getUser(pUserID);;
    setUserName(user.username);
    setUserAvatarURL(user.avatar? user.avatar : "");
  }

  const loadCharacters = async () => {
    const charactersData = await readCharactersByUserName(userID);
    setCharacters(charactersData);
  }

  const handleCloseSesion = async () => {
    console.log("handleCloseSesion");
    saveSession({} as Session);
    push('/signin');
  };

  return (
    <div>
      <div className="personal-container">
        <div>
          <img id="avatar" src={API_URL + userAvatarURL} className="personal-container-avatar"/>
        </div>
        <div className="personal-container-user">
          <div className="personal-container-name">
            <span>@</span>{userName}
          </div>
          <button type="button" className="personal-container-button" onClick={handleCloseSesion}>Cerrar Sesión</button>
        </div>               
      </div>
      <div className="personal-character-container">
        {characters.map((character: any) => (
          <div className="personal-character-photo" key={character.id}>
            <img src={API_URL + character.avatar} />
          </div>
        ))}
      </div>
    </div>
  );
}