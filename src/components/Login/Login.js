import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-context";
import Input from "../UI/Input/Input";

const Login = (props) => {
  // // enteredEmail/Password = value
  // const [enteredEmail, setEnteredEmail] = useState("");
  // // emailIsValid/pass = boolean
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // useReduce
  // hàm Reducer này tham gia upd state
  const emailReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
      return { value: action.val, isValid: action.val.includes("@") };
      //  state.value.includes("@")  state.value.trim().length > 6
    }
    if (action.type === "USER_BLUR") {
      return { value: state.value, isValid: state.value.includes("@") };
    }
    return { value: "", isValid: false };
  };

  const passwordReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
      return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (action.type === "USER_BLUR") {
      return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    return { value: "", isValid: false };
  };

  //  dùng khá giống với useEffect
  //  (thay vì dùng 2 state thì ghép lại bằng 1 Obj {} )
  //  với :
  //  emailState là giá trị đc update , hàm dispatch ~~ hàm set ,
  //  đối số thứ 1 là 1 hàm nhận state và action
  //  đối số thứ 2 là value ban đầu
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });

  const authCtx = useContext(AuthContext);

  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  // gán alias ( Obj destructure)
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  // useEffect as  useReduce
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Check form");
      // formIsValid tro thanh 1 boolean tuong ung
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    // ham clean
    return () => {
      console.log("clear");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, setFormIsValid]);

  // Mỗi khi gõ phím (event) thì setEnteredEmail thành value
  // và setFormIsValid thành 1 boolean tương ứng
  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);

    // upd state - reduce = action
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      // event.target.value.includes("@") && enteredPassword.trim().length > 6
      event.target.value.includes("@") && passwordState.isValid
    );
  };

  // Tương tự email, khi cả 2 email và pass ok thì setForm thành true
  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      // event.target.value.trim().length > 6 && enteredEmail.includes("@")
      event.target.value.trim().length > 6 && emailState.isValid
    );
  };

  // setE+P Valid tương ứng
  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "USER_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "USER_BLUR" });
  };

  // hàm submit
  const submitHandler = (event) => {
    event.preventDefault();
    // form valid => login
    if (formIsValid) {
      authCtx.logInContext(emailState.value, passwordState.value);
    }
    // !email => focus email to user input again (first)
    else if (!emailIsValid) {
      emailInputRef.current.act();
    }
    // email ? => !pass => focus pass to input again
    else {
      passwordInputRef.current.act();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="Email"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            /*disabled={!formIsValid}*/
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
