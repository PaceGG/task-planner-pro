import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./auth.module.scss";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    const registeredEmail = localStorage.getItem("registeredEmail");
    if (registeredEmail) {
      setEmail(registeredEmail);
      localStorage.removeItem("unregisteredEmail");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ email: "", password: "" }); // Сброс ошибок

    let isValid = true;
    const newErrors = { ...errors };

    if (!email) {
      newErrors.email = "ⓘ Email is required";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "ⓘ Password is required";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    try {
      const response = await axios.get(
        `http://localhost:3001/users?email=${email}`
      );

      // Если пользователь не найден
      if (response.data.length === 0) {
        setErrors({ ...newErrors, email: "ⓘ User not found" });
        localStorage.setItem("unregisteredEmail", email);
        return;
      }

      const user = response.data[0];

      // Если пароль неверный
      if (user.password !== password) {
        setErrors({ ...newErrors, password: "ⓘ Incorrect password" });
        return;
      }

      // Успешная авторизация
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrors({
        email: "ⓘ An error occurred. Please try again later.",
        password: "",
      });
    }
  };

  return (
    <div className={style["auth"]}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">
            Email{" "}
            {errors.email && (
              <>
                <span className={style["error"]}>{errors.email}</span>{" "}
                <a href="/signup" className="link">
                  signup
                </a>
              </>
            )}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ border: errors.email ? "2px solid red" : undefined }}
          />
        </div>
        <div>
          <label htmlFor="password">
            Password{" "}
            {errors.password && (
              <span className={style["error"]}>{errors.password}</span>
            )}
          </label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ border: errors.password ? "2px solid red" : undefined }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
