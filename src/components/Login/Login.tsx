import { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

import logo from '../../assets/preloved-logo.jpg';
import styles from './login.module.css';
import signUpClass from '../SignUp/SignUp.module.css';

const domain = 'https://prelovedbackends.azurewebsites.net/';
const body = document.body;

const removeStyle = () => {
  body.classList.remove(styles.body);
  body.classList.remove(styles.backgroundPhoto);
};

function errorMessage(isLoggedIn: boolean) {
  (document.getElementById("error")!.style.display = isLoggedIn ? 'none' : 'block');
}

function displaySpinner(isActive: boolean) {
  document.getElementById("spinner")!.style.display = isActive ? 'flex' : 'none';
}
  
function evaluatePostRequest(response: string): boolean {
  // returns boolean
  return /"status":"OK!"/.test(response);
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  body.classList.add(styles.body);
  body.classList.add(styles.backgroundPhoto);
  
  async function handlePostRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    displaySpinner(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    await axios
    .post(domain + 'auth/login/', formData)
    .then((response) => {
      setIsLoggedIn(evaluatePostRequest(JSON.stringify(response)));
    }).catch((error) => {
      console.log(error);
    });

    displaySpinner(false);
    errorMessage(isLoggedIn);
  }

  return (
    <div className={styles.backgroundPhoto}>
      <div className={styles.container}>
        <img src={logo} alt="Preloved Logo" className={styles.logo} />
        <div className={styles.text}>
          <h1>Log in</h1>
          <p>
            No account yet?{' '}
            <Link to="signup/" 
              className={signUpClass.link}
              onClick={removeStyle}
            >
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
          {isLoggedIn && (<Navigate to="frontpage/" replace={true}/>)}
        </form>
      </div>
    </div>
  );
}