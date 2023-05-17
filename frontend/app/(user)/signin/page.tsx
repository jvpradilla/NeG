"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loginUser } from "../../../services/UserService";

export default function UserLogin () {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser !== null) {
      setUsername(JSON.parse(localUser).username);
      setPassword(JSON.parse(localUser).password);
    }
  }, []);

  const usernameHandler =  (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const passwordHandler =  (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    await loginUser(username, password);
  };

  return (
    <div>
    <form>
      <h1>User - Login</h1>
      <label>
        <span>Nombre de usuario</span>
      </label>
      <input id="username" type="text" autoComplete="off" placeholder="Nombre de usuario" autoFocus onChange={usernameHandler}/>
      <label>
        <span>Contraseña</span>
      </label>
      <input id="password" type="password" autoComplete="off" onChange={passwordHandler}/>
      <button type="button" onClick={handleSubmit}>Iniciar Sesión</button>
    </form>
    <Link href="/user/create">Crear Perfil</Link>
    </div>
  );
}