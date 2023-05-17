import {Md5} from 'ts-md5';

export type User = {
  username: string;
  password: string;
  avatar?: string;
  passwordNew?: string;
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

const put = async (pURL: string, pUser: User) => {
  return await fetch(pURL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pUser)
  });
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

export const createUser = async (pUsername: string, pPassword: string, pAvatar?: string) => {
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

export const updateUser = async (pUsername: string, pPassword: string, pPasswordNew: string, pAvatarNew?: string): Promise<boolean> => {

  console.log("updateUser", pUsername, pPassword, pPasswordNew, pAvatarNew);

  const user: User = {
    username: pUsername,
    password: Md5.hashAsciiStr(pPassword),
    passwordNew: Md5.hashAsciiStr(pPasswordNew),
    avatar: pAvatarNew
  };
  
  const response = await put("http://localhost:5000/user", user);
  
  if( response.status !== 200 ) {
    console.log(await response.json());
    return false;
  } else {
    console.log("User updated");
    localStorage.setItem("password", pPasswordNew);
    return true;
  }
};

export const loginUser = async (pUsername: string, pPassword: string) => {
  const user: User = {
    username: pUsername,
    password: Md5.hashAsciiStr(pPassword)
  };
  
  const response = await post("http://localhost:5000/user/login", user);
  
  if( response.status !== 200 ) {
    console.log(await response.json());
  } else {
    console.log("User logged in");
    const userAuth = await response.json();  
    localStorage.setItem("username", pUsername);
    localStorage.setItem("password", pPassword);
  }
}

