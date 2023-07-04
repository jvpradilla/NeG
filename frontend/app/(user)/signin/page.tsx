"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loginUser } from "../../../services/UserService";

export default function UserLogin () {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const regex = /^[a-z0-9_]+$/;

  const usernameHandler =  (e: React.ChangeEvent<HTMLInputElement>) => {
    if (regex.test(e.target.value) || "" === e.target.value) {
      setUsername(e.target.value);
    }
    else {
      e.target.value = username;
    }
  };

  const passwordHandler =  (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    document.getElementById("togglePassword")?.classList.remove("bi-eye");
  };

  const handleSubmit = async () => {
    const loginResult = await loginUser(username, password);
    if (loginResult) {
      const usernameElement = document.getElementById("username") as HTMLInputElement;
      usernameElement.value = "";
      const passwordElement = document.getElementById("password") as HTMLInputElement;
      passwordElement.value = "";
      setUsername("");
      setPassword("");
    } else {
      const snackbarMessage = document.getElementsByClassName("snackbar");
      snackbarMessage[0]?.classList.add("show");
      setTimeout(() => { snackbarMessage[0]?.classList.remove("show"); }, 3000);
    }
  };

  const handleSeePassword = async () => {
    const passwordInput =  document.getElementById("password");
    const togglePassword =  document.getElementById("togglePassword");
    const passwordInputType =  passwordInput?.getAttribute("type") === "password" ? "text" : "password";
    passwordInput?.setAttribute("type", passwordInputType);
    togglePassword?.classList.toggle("bi-eye");
  };

  return (
    <div className="formContainer">
      <h1>Bienvenido</h1>
      <h3>Ingresa los datos de tu perfil</h3>
      
      <label htmlFor="username" className="inputTextLabel">
        <span>Nombre de usuario</span>
      </label>
      <input id="username" type="text" autoComplete="off" placeholder="Nombre de usuario" className="inputText" minLength={6} pattern={regex.source} autoFocus required onChange={usernameHandler}/>
      
      <label htmlFor="password" className="inputTextLabel">
        <span>Contraseña</span>
      </label>
      <input id="password" type="password" autoComplete="off" placeholder="Contraseña" className="inputText" minLength={8} required onChange={passwordHandler}/>
      <i id="togglePassword" className="bi bi-eye-slash" onClick={handleSeePassword}></i>
      
      <button type="button" className="button" onClick={handleSubmit}>Iniciar Sesión</button>
      
      <p id="signinCreateProfile">
        <span>¿Aún no tienes perfil? </span>
        <Link href="/signup" className="link">Crear Perfil</Link>
      </p>

      <div className="snackbar">
        No se ha encontrado un perfil con los datos suministrados
      </div>
    </div>
  );
}