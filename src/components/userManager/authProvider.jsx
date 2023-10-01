import React, { useContext, createContext, useState, useEffect } from "react";

const USER_CONTEXT = createContext({
  isAuth: false,
  getToken: () => {},
  saveUser: (userData) => {},
  getRefreshToken: () => {},
  getUser: () => {},
  checkAuth: async ()=>{},
});

export default function AuthProvider({ children }) {
  const [isAuth, setAuth] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    checkAuth()
  })
  

  async function requestNewToken(refreshToken) {
    //console.log("refToken",refreshToken);
    try {
      const API = process.env.REACT_APP_SERVICE_USER + "/refreshToken";
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      if (response.ok) {
        const json = await response.json();
        if (json.error) {
          throw new Error("response json error:" + json.error);
        }
        //console.log(json.body);
        return json.body.token;
      } else {
        const json = await response.json();
        console.error("response error: ", json);
        throw new Error("response no ok " + response.statusText);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function getUserInfo(token) {
    try {
      const API = process.env.REACT_APP_SERVICE_USER + "/user";
      const response = await fetch(API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const json = await response.json();
        if (json.error) {
          throw new Error(json.error);
        }
        return json.body.user;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function checkAuth() {
    if (token) {
      //auth user
    } else {
      const refToken = getRefreshToken();
      if (refToken) {
        const newToken = await requestNewToken(refToken);
        if (newToken) {
          const userInfo = await getUserInfo(newToken);
          if (userInfo) {
            saveSessionInfo(userInfo, newToken, refToken);
          }
        }
      }
    }
  }

  const saveSessionInfo = (userInfo, token, refreshToken) => {
    setToken(token);
    localStorage.setItem("token", JSON.stringify(refreshToken));
    setAuth(true);
    setUser(userInfo);
  };

  const getToken = () => {
    return token;
  };

  const getRefreshToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const refreshToken = JSON.parse(token);
      return refreshToken;
    }
    return null;
  };

  const getUser = () => {
    return user;
  };

  const saveUser = (userData) => {
    saveSessionInfo(
      userData.body.user,
      userData.body.token,
      userData.body.refreshToken
    );
  };

  return (
    <USER_CONTEXT.Provider
      value={{
        isAuth: isAuth,
        saveUser: saveUser,
        getToken: getToken,
        getRefreshToken: getRefreshToken,
        getUser: getUser,
        checkAuth: checkAuth
      }}
    >
      {children}
    </USER_CONTEXT.Provider>
  );
}

export const useUserContext = () => useContext(USER_CONTEXT);
