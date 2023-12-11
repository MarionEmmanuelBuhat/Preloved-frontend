import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { LINK_GET_SELLER_STATUS, LINK_LOGIN, User, UserType } from "../misc";

import logo from "../../assets/preloved-logo.jpg";
import styles from "./login.module.css";
import signUpClass from "../SignUp/SignUp.module.css";

let authenticate: boolean;
let user: User;

function errorMessage(isLoggedIn: boolean) {
  document.getElementById("error")!.style.opacity = isLoggedIn ? "0" : "100";
}

function displaySpinner(isActive: boolean) {
  document.getElementById("spinner")!.style.opacity = isActive ? "100" : "0";
}

function evaluatePostRequest(response: string): boolean {
  return /"statusText":"OK"/.test(response);
}

function evaluateSellerStatus(response: string, user_type: string): string {
  if (/is missing/.test(response)) {
    return "Unverified";
  } else if (/complete/.test(response)) {
    return "Completed";
  }
  return user_type;
}

function getUserType(str: string): UserType {
  switch (str) {
    case "Shop User":
      return UserType.User;
    case "Shop Owner":
      return UserType.Seller;
    case "Admin":
      return UserType.Admin;
    case "Unverified":
      return UserType.UnverifiedSeller;
    default:
      return UserType.CompletedSeller;
  }
}

async function generateUser(response: any) {
  let user_type: string = response.data.user_type;
  if (response.data.shop_owner_id !== null) {
    await axios
      .get(LINK_GET_SELLER_STATUS, {
        params: { id: response.data.shop_owner_id },
      })
      .then((response) => {
        console.log(response);
        user_type = evaluateSellerStatus(JSON.stringify(response), user_type);
        console.log(user_type);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  user = {
    email: response.data.email,
    type: getUserType(user_type),
  };
  localStorage.setItem("userInfo", JSON.stringify(user));
  location.reload();
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userInfo: User | null = JSON.parse(localStorage.getItem("userInfo")!);

    if (userInfo !== null) {
      switch (userInfo.type) {
        case UserType.User:
          location.href = "/frontpage";
          break;
        case UserType.Seller:
          location.href = "/ticketcenter";
          break;
        case UserType.Admin:
          location.href = "/adminpanel";
          break;
        case UserType.UnverifiedSeller:
          location.href = "/shopdocs";
          break;
        default:
          location.href = "/shopdocs/submitted";
      }
    }
  }, []);

  async function handlePostRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    displaySpinner(true);

    if (
      (email === "" && email.length === 0) ||
      (password === "" && password.length === 0)
    ) {
      errorMessage(isLoggedIn);
      displaySpinner(false);
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    await axios
      .post(LINK_LOGIN, formData, { withCredentials: true })
      .then((response) => {
        authenticate = evaluatePostRequest(JSON.stringify(response));
        if (authenticate === false) {
          return;
        }
        generateUser(response);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
      });

    displaySpinner(false);
    errorMessage(authenticate);
  }

  return (
    <div className={styles.backgroundPhoto}>
      <div className={styles.container}>
        <img src={logo} alt="Preloved Logo" className={styles.logo} />
        <div className={styles.text}>
          <h1>Log in</h1>
          <p>
            No account yet?{" "}
            <Link to="signup" className={signUpClass.link}>
              Click Here
            </Link>
          </p>
        </div>
        <form onSubmit={handlePostRequest} method="post">
          <div className={styles.form_input}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="email"
              id="email"
              className={signUpClass.textInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p id="error" className={styles.error_message}>
              Incorrect username or password
            </p>
          </div>
          <div className={styles.form_input}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className={signUpClass.textInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={signUpClass.signupButton}>
            Log In
          </button>
          <div id="spinner" className={styles.multiple1}>
            <div className={styles.ball1}></div>
            <div className={styles.ball2}></div>
            <div className={styles.ball3}></div>
          </div>
          {isLoggedIn && <Navigate to="/frontpage" replace={true} />}
        </form>
      </div>
    </div>
  );
}
