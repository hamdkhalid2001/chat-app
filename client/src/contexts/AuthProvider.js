import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log("Auth changed called: ", user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
