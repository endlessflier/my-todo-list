import { useState, useMemo } from "react";
import { debounce } from "lodash";
import * as loginApi from "../api/loginApi";
import Textfield from "../components/Textfield";
import {
  getValidateEmail,
  getValidatePassword,
  MAX_EMAIL_LENGTH,
  MAX_PASSWORD_LENGTH,
} from "../utils/validator";

const debouncedSubmit = debounce((callback) => callback(), 200);

export default function LoginForm({ onLoginSuccess }) {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorStatus = useMemo(() => {
    return {
      email: !getValidateEmail(userEmail),
      password: !getValidatePassword(password),
    };
  }, [userEmail, password]);
  const loginButtonDisabled =
    isSubmitting || errorStatus.email || errorStatus.password;

  const login = async () => {
    try {
      const responseUser = await loginApi.login(userEmail, password);
      onLoginSuccess(responseUser?.userToken, {
        userEmail,
        password,
      });
      setLoginFailed(!responseUser?.userToken);
    } catch {
      setLoginFailed(true);
    }
    setIsSubmitting(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!errorStatus.email && !errorStatus.password) {
      debouncedSubmit(login);
    }
  };

  return (
    <div className="container">
      <div className="py-5 text-center">
        <h1>Rapptr Labs</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <Textfield
            className="mb-3"
            type="text"
            label="Email"
            icon={<i className="bi bi-person-fill"></i>}
            value={userEmail}
            placeholder="user@rapptrlabs.com"
            maxLength={MAX_EMAIL_LENGTH}
            errorText={errorStatus.email ? "Not a valid email" : ""}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <Textfield
            className="mb-5"
            type="password"
            label="Password"
            icon={<i className="bi bi-lock-fill"></i>}
            value={password}
            maxLength={MAX_PASSWORD_LENGTH}
            placeholder="Must be at least 4 characters"
            errorText={errorStatus.password ? "Not a valid password" : ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-grid">
            <button
              type="submit"
              disabled={loginButtonDisabled}
              className={`btn btn-primary ${
                loginButtonDisabled ? "btn-disabled" : ""
              }`}
            >
              Login
            </button>
          </div>
          {loginFailed && (
            <div className="alert text-danger text-center">
              The server could not be reached. Please try again later.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
