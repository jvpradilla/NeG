"use client";

import { useEffect } from "react";
import { getUser } from "../../../services/UserService";
import { readCharactersByUserName } from "../../../services/CharacterService";


export default function UserReadId ({ params}: {params: { userID: string };}) {
  const {userID} = params;

  useEffect(() => {
    getUser(userID);
    readCharactersByUserName(userID);
  }, []);


  return (
    <h1>User - Read by ID: {userID}</h1>
  );
}