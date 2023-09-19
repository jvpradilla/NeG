"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { updateUser } from "../../../../services/UserService";
import { getSession, hasValidSession } from "../../../../services/SessionService";
import { saveLocation } from "../../../../services/LocationService";


export default function UserEdit () {

  const { push } = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordNew, setPasswordNew] = useState("");


  useEffect(() => {

    saveLocation("/user");
   
    if (!hasValidSession()) {
      push('/singin');
    }

    const session = getSession();
    if (session !== null) {
      const localUserName = session?.username;
      const localPassword = session?.password;
      if (localUserName !== null && localPassword !== null) {
        setUsername(localUserName);
        setPassword(localPassword);
        setPasswordNew(localPassword);
      }
    }
  }, []);


  const passwordHandler =  (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordNew(e.target.value);
  };

  const handleSubmit = async () => {
    if (await updateUser(username, password, passwordNew)) {
      setPassword(passwordNew);
    }
  };

  return (
    <div>
    <form>
      <h1>User - Edit</h1>
      <label>
        <span>Nombre de usuario</span>
      </label>
      <input id="username" type="text" autoComplete="off" placeholder="Nombre de usuario" readOnly value={username}/>
      <label>
        <span>Contraseña</span>
      </label>
      <input id="password" type="password" autoComplete="off" autoFocus onChange={passwordHandler} value={passwordNew}/>
      <button type="button" onClick={handleSubmit}>Editar Usuario</button>
    </form>
    </div>
  );
}