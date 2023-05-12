"use client";

import { useState } from "react";
import { createUser, uploadAvatar } from "../../../services/UserService";

export default function UserCreate () {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState({} as File);

  const usernameHandler =  (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const passwordHandler =  (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const avatarHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const avatarImage = e.target.files[0] as File;
      setAvatar(avatarImage);
    }
  };

  const handleSubmit = async () => {
    if ( avatar.name || avatar.name !== undefined) {
      const avatarURL = await uploadAvatar(avatar);
      await createUser(username, password, avatarURL);
    } else {
      await createUser(username, password);
    }    
  };

  return (      
    <form>
      <h1>User - Create</h1>
      <input id="avatar" type="file" onChange={avatarHandler}/>
      <label>
        <span>Nombre de usuario</span>
      </label>
      <input id="username" type="text" autoComplete="off" placeholder="Nombre de usuario" autoFocus onChange={usernameHandler}/>
      <label>
        <span>Contraseña</span>
      </label>
      <input id="password" type="password" autoComplete="off" onChange={passwordHandler}/>
      <button type="button" onClick={handleSubmit}>Crear Perfil</button>
    </form>
  );
}