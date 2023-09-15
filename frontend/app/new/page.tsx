
"use client"

import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { getSession, hasValidSession } from "../../services/SessionService";

export default function CharacterCreate () {

  const { push } = useRouter();

  useEffect(() => {
    if (hasValidSession()) {
      const session = getSession();
      const localUserName = session?.username;
      const urlRedirect = "/" + localUserName + "/character/create";
      push(urlRedirect);
    } else {
      push("/signin");
    }
  }, []);

  return (
    <div className="loaderPage">
      <span className="loader"></span>
    </div>
  );
}