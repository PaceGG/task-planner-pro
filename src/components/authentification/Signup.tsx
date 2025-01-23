import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import User from "../../types";
import style from "./auth.module.scss";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const unregisteredEmail = localStorage.getItem("unregisteredEmail");
    if (unregisteredEmail) {
      setEmail(unregisteredEmail);
      localStorage.removeItem("unregisteredEmail");
    }
  }, []);

  const doesUserExist = async (email: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users?email=${email}`
      );
      return response.data.length > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Сброс ошибок перед проверкой
    setErrors({ name: "", email: "", password: "", confirmPassword: "" });

    let isValid = true;
    const newErrors = { ...errors };

    if (!name) {
      newErrors.name = "ⓘ Username is required";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "ⓘ Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "ⓘ Invalid email format";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "ⓘ Password is required";
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "ⓘ Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    const user: User = { username: name, email, password };

    if (await doesUserExist(email)) {
      setErrors({ ...newErrors, email: "ⓘ User already exists" });
      localStorage.setItem("registeredEmail", email);
      return;
    }

    try {
      await axios.post("http://localhost:3001/users", user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style["auth"]}>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Username{" "}
            {errors.name && (
              <span className={style["error"]}>{errors.name}</span>
            )}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
            style={{ border: errors.name ? "2px solid red" : undefined }}
          />
        </div>
        <div>
          <label htmlFor="email">
            Email{" "}
            {errors.email && (
              <>
                <span className={style["error"]}>{errors.email}</span>{" "}
                <a href="/login" className="link">
                  login
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
        <div>
          <label htmlFor="confirm-password">
            Confirm Password{" "}
            {errors.confirmPassword && (
              <span className={style["error"]}>{errors.confirmPassword}</span>
            )}
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              border: errors.confirmPassword ? "2px solid red" : undefined,
            }}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
