import {Md5} from 'ts-md5';

export type User = {
  username: string;
  password: string;
  avatar?: string;
}

const get = async (pURL: string) => {
  return await fetch(pURL, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
};

const post = async (pURL: string, pUser: User) => {
  return await fetch(pURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pUser)
  });
};

export const getAllUsers = async () => {
  const response = await get("http://localhost:5000/user");
  return (await response.json()) as User[];
};

export const createUser = async (pUsername: string, pPassword: string, pAvatar?: string) => {
  console.log("Password en claro: " + pPassword + "  - Password MD5: " + Md5.hashAsciiStr(pPassword));

  const user: User = {
    username: pUsername,
    password: Md5.hashAsciiStr(pPassword),
    avatar: pAvatar
  };
  
  const response = await post("http://localhost:5000/user", user);
  
  if( response.status !== 200 ) {
    console.log(await response.json());
  } else {
    console.log("User created");
  }
};

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