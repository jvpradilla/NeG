export type Session = {
  username: string;
  password: string;
  token?: string;
}

export const saveSession = async (pSession: Session) => {
  localStorage.setItem("session", JSON.stringify(pSession));
};

export const getSession = () => { 
  const session = localStorage.getItem("session");
  if(session) {
    return JSON.parse(session) as Session;
  }
  return null;
}

export const hasValidSession = () => { 
  const session = getSession();
  if (session === null) {
    return false;
  }
  const { username, password, token } = session;
  if (username === undefined || password === undefined || username === null || password === null || username === "" || password === "") {
    return false;
  }
  return true;
}
