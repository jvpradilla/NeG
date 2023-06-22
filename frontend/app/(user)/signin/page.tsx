"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loginUser } from "../../../services/UserService";

export default function UserLogin () {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameHandler =  (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const passwordHandler =  (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    await loginUser(username, password);
  };

  const handleSeePassword = async () => {
    const type =  document.getElementById("password")?.getAttribute("type") === "password" ? "text" : "password";
    document.getElementById("password")?.setAttribute("type", type);
  };

  return (
    <div>
      <h1>User - Login</h1>
      <p>
        <label>
          <span>Nombre de usuario</span>
        </label>
        <input id="username" type="text" autoComplete="off" placeholder="Nombre de usuario" autoFocus onChange={usernameHandler}/>
      </p>
      <p>
        <label>
          <span>Contraseña</span>
        </label>
        <input id="password" type="password" autoComplete="off" onChange={passwordHandler}/>
        <i id="togglePassword" onClick={handleSeePassword}>Ojo</i>
      </p>
      <button type="button" onClick={handleSubmit}>Iniciar Sesión</button>
    <Link href="/user/create">Crear Perfil</Link>
    </div>
  );
}