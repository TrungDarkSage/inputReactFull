import React, { useContext } from "react";

import classes from "./Navigation.module.css";
import AuthContext from "../../context/auth-context";
const Navigation = (props) => {
  const ctx = useContext(AuthContext);
  return (
    // listen context ( xem userIsLogin ?)
    // ctx ~~ obj chứa isLoggedIn ở AuContext
    // <AuthContext.Consumer>
    //   {(ctx) => {
    //     return (
    //       <nav className={classes.nav}>
    //         <ul>
    //           {ctx.isLoggedInContext && (
    //             <li>
    //               <a href="/">Users</a>
    //             </li>
    //           )}
    //           {ctx.isLoggedInContext && (
    //             <li>
    //               <a href="/">Admin</a>
    //             </li>
    //           )}
    //           {ctx.isLoggedInContext && (
    //             <li>
    //               <button onClick={ctx.logOutContext}>Log out</button>
    //             </li>
    //           )}
    //         </ul>
    //       </nav>
    //     );
    //   }}
    // </AuthContext.Consumer>
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedInContext && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedInContext && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedInContext && (
          <li>
            <button onClick={ctx.logOutContext}>Log out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
