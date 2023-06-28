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
    const togglePassword =  document.getElementById("togglePassword");
    const passwordInput =  document.getElementById("password");
    const type =  passwordInput?.getAttribute("type") === "password" ? "text" : "password";
    passwordInput?.setAttribute("type", type);
    togglePassword?.classList.toggle("bi-eye");
  };

  return (
    <div className="formContainer">
      <label htmlFor="username" className="inputTextLabel">
        <span>Nombre de usuario</span>
      </label>
      <input id="username" type="text" autoComplete="off" placeholder="Nombre de usuario" className="inputText" autoFocus onChange={usernameHandler}/>
      
      <label htmlFor="password" className="inputTextLabel">
        <span>Contraseña</span>
      </label>
      <input id="password" type="password" autoComplete="off" placeholder="Contraseña" className="inputText" onChange={passwordHandler}/>
      <i id="togglePassword" className="bi bi-eye-slash" onClick={handleSeePassword}></i>
      
      <button type="button" className="button" onClick={handleSubmit}>Iniciar Sesión</button>
      <p id="signinCreateProfile">
        <span>¿Aún no tienes perfil? </span>
        <Link href="/signup" className="link">Crear Perfil</Link>
      </p>
    </div>
  );
}