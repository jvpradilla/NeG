"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { createUser, uploadAvatar } from "../../../services/UserService";
import { getSession, hasValidSession } from "../../../services/SessionService";
import { saveLocation } from "../../../services/LocationService";

export default function UserCreate () {

  const { push } = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState({} as File);
  const regex = /^[a-z0-9_]+$/;

  useEffect(() => {
    saveLocation("/signup");
    if (hasValidSession()) {
      const session = getSession();
      const localUserName = session?.username;
      const urlRedirect = "/" + localUserName;
      handleRedirect(urlRedirect);
    }
  }, []);

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

  const avatarHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const avatarImage = e.target.files[0] as File;
      setAvatar(avatarImage);
      document.getElementById("avatarImg")?.setAttribute("src", URL.createObjectURL(avatarImage));
    }
  };

  const handleSubmit = async () => {
    let loginResult = false;
    if ( password !== "" && password !== null && password.trim() !== "" && password.length > 8 ) {
      if ( avatar.name || avatar.name !== undefined) {
        const avatarURL = await uploadAvatar(avatar);
        loginResult = await createUser(username, password, avatarURL);
      } else {
        loginResult = await createUser(username, password);
      }  
    }
    if (loginResult) {
      const urlRedirect = "/" + username;
      const usernameElement = document.getElementById("username") as HTMLInputElement;
      usernameElement.value = "";
      const passwordElement = document.getElementById("password") as HTMLInputElement;
      passwordElement.value = "";
      document.getElementById("avatarImg")?.setAttribute("src", "http://localhost:5002/person-circle.svg");
      setUsername("");
      setPassword("");
      setAvatar(null as unknown as File);    
      handleRedirect(urlRedirect);  
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

  const handleRedirect = (pURLRedirect: string) => {
    const nextURL = localStorage.getItem("nextURL");
    if (nextURL !== null && nextURL !== undefined && nextURL !== "") {
      localStorage.removeItem("nextURL");
      push(nextURL);
    } else {
      push(pURLRedirect);
    }
  };

  return ( 
    <div className="formContainer">   
      <h1>Sé parte de nuestra comunidad</h1>
      <h3>Ingresa los datos de tu perfil</h3>
        
      <div className="avatar-container">
        <div className="personal-image">
          <label>
            <input id="avatar" type="file" onChange={avatarHandler}/>
            <figure className="personal-figure">
              <img id="avatarImg" src="http://localhost:5002/person-circle.svg" className="personal-avatar" />
              <figcaption className="personal-figcaption">
                <img src="http://localhost:5002/camera.svg"/>
              </figcaption>
            </figure>
          </label>
        </div>
      </div>


      <label htmlFor="username" className="inputTextLabel">
        <span>Nombre de usuario</span>
      </label>
      <input id="username" type="text" autoComplete="off" placeholder="Nombre de usuario" className="inputText" minLength={6} pattern={regex.source} autoFocus required onChange={usernameHandler}/>
        
      <label htmlFor="password" className="inputTextLabel">
        <span>Contraseña</span>
      </label>
      <input id="password" type="password" autoComplete="off" placeholder="Contraseña" className="inputText" minLength={8} required onChange={passwordHandler}/>
      <i id="togglePassword" className="bi bi-eye-slash" onClick={handleSeePassword}></i>

      <button type="button" className="button" onClick={handleSubmit}>Crear Perfil</button>

      <div className="snackbar">
        No se ha podido crear un perfil con los datos suministrados
      </div>
    </div>  
  );
}