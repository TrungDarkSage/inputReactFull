import React, { useState, useEffect, useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./context/auth-context";
// import AuthContext from "./context/auth-context";
function App() {
  // LOGIC DA DUOC CHUYEN SANG AUTH-CONTEXT
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // // check if => setState => run comp App => check if => infinity
  // // => dùng useEfect với 2 agrument 1 func + 1 arr
  // useEffect(() => {
  //   // get key đã được set từ trc
  //   const storeUserLoggedInInformation = localStorage.getItem("isLoggedIn");
  //   if (storeUserLoggedInInformation === "1") {
  //     setIsLoggedIn(true);
  //   }
  //   // [] empty => run => load web => func => state => ko co dependency
  //   // => giu page tai key load
  // }, []);

  // // func này set 1 cặp key-val khi user login và khi
  // // reload thì ta có thể get lại key này như trên
  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem("isLoggedIn", "1");
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   setIsLoggedIn(false);
  //   localStorage.removeItem("isLoggedIn");
  // };

  const ObjInclueContext = useContext(AuthContext);
  return (
    // Context
    // <AuthContext.Provider
    //   value={{
    //     isLoggedInContext: isLoggedIn,
    //     logOutContext: logoutHandler,
    //   }}
    // >
    <>
      <MainHeader />
      <main>
        {/* {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />} */}
        {!ObjInclueContext.isLoggedInContext && <Login />}
        {ObjInclueContext.isLoggedInContext && <Home />}
      </main>
      {/* </AuthContext.Provider> */}
    </>
  );
}

export default App;
