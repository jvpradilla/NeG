import { Md5 } from 'ts-md5';
import { saveSession, Session } from './SessionService';

export type User = {
  username: string;
  password: string;
  avatar?: string;
  passwordNew?: string;
}

export const uploadAvatar = async (pFile: File) => {
  const formData = new FormData();
  formData.append("file", pFile);
  const response = await fetch("http://localhost:5000/user/avatar", {
    method: "POST",
    body: formData
  });
  if( response.status !== 200 ) {
    console.log(await response.json());
  } else {
    return (await response.json()).url as string;    
  }
};

export const createUser = async (pUsername: string, pPassword: string, pAvatar?: string) => {
  const user: User = {
    username: pUsername,
    password: Md5.hashAsciiStr(pPassword),
    avatar: pAvatar
  };
  
  const response = await fetch("http://localhost:5000/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  
  if( response.status !== 200 ) {
    console.log(await response.json());
  } else {
    console.log("User created");
  }
};

export const updateUser = async (pUsername: string, pPassword: string, pPasswordNew: string, pAvatarNew?: string): Promise<boolean> => {

  const user: User = {
    username: pUsername,
    password: Md5.hashAsciiStr(pPassword),
    passwordNew: Md5.hashAsciiStr(pPasswordNew),
    avatar: pAvatarNew
  };
  
  const response = await fetch("http://localhost:5000/user", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  
  if (response.status !== 200) {
    console.log(await response.json());
    return false;
  } else {
    console.log("User updated");

    const session: Session = {
      username: pUsername,
      password: pPasswordNew
    };
    saveSession(session);
    return true;
  }
};

export const loginUser = async (pUsername: string, pPassword: string) => {
  const user: User = {
    username: pUsername,
    password: Md5.hashAsciiStr(pPassword)
  };
  
  const response = await fetch("http://localhost:5000/user/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  
  if( response.status !== 200 ) {
    console.log(await response.json());
  } else {
    console.log("User logged in");
    const userAuth =  await response.json();  

    console.log(userAuth);

    const session: Session = {
      username: pUsername,
      password: pPassword
    };

    saveSession(session);
  }
}

