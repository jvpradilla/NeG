import { Md5 } from 'ts-md5';
import { saveSession, Session } from './SessionService';

const API_URL = process.env.NEXT_PUBLIC_HOST;

console.log("API_URL", API_URL);

export type User = {
  username: string;
  password: string;
  avatar?: string;
  passwordNew?: string;
}

export const uploadAvatar = async (pFile: File) => {
  const formData = new FormData();
  formData.append("file", pFile);
  const response = await fetch(`${API_URL}/user/avatar`, {
    method: "POST",
    body: formData
  });
  if( response.status !== 200 ) {
    console.log(await response.json());
  } else {
    return (await response.json()).url as string;    
  }
};

export const getUser = async (pUsername: string): Promise<User> => {
  const response = await fetch(`${API_URL}/user/${pUsername}`);
  if( response.status !== 200 ) {
    console.log("Error ", await response.json());
    return {} as User;
  } 
  const userJSON = await response.json();
  return userJSON as User;  
}

export const createUser = async (pUsername: string, pPassword: string, pAvatar?: string): Promise<boolean> => {
  const user: User = {
    username: pUsername,
    password: Md5.hashAsciiStr(pPassword),
    avatar: pAvatar
  };
  
  const response = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  
  if( response.status !== 200 ) {
    //console.log(await response.json());
    return false;
  }
  //console.log("User created");
  const session: Session = {
    username: pUsername,
    password: pPassword
  };

  saveSession(session);
  
  return true;
};

export const updateUser = async (pUsername: string, pPassword: string, pPasswordNew: string, pAvatarNew?: string): Promise<boolean> => {

  const user: User = {
    username: pUsername,
    password: Md5.hashAsciiStr(pPassword),
    passwordNew: Md5.hashAsciiStr(pPasswordNew),
    avatar: pAvatarNew
  };
  
  const response = await fetch(`${API_URL}/user`, {
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

export const loginUser = async (pUsername: string, pPassword: string): Promise<boolean> => {
  const user: User = {
    username: pUsername,
    password: Md5.hashAsciiStr(pPassword)
  };
  
  const response = await fetch(`${API_URL}/user/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  
  if( response.status !== 200 ) {
    //console.log(await response.json());
    return false;
  } 
  
  //console.log("User logged in");
  const userAuth =  await response.json();  

  //console.log(userAuth);

  const session: Session = {
    username: pUsername,
    password: pPassword
  };

  saveSession(session);

  return true;
}


