import React, { useState, createContext } from "react";
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [position, setPosition] = useState("Home");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userId, setUserId] = useState("");
  return (
    <AuthContext.Provider
      value={{
        position,
        setPosition,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userImage,
        setUserImage,
        userId,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
