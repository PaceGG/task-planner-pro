import { useEffect, useState } from "react";
import User from "../../types";

function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const syncUserFromLocalStorage = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    syncUserFromLocalStorage();

    const interval = setInterval(syncUserFromLocalStorage);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <>
      {!user && (
        <div className="flex">
          <a href="/login" className="button">
            Login
          </a>
          <a href="/signup" className="button">
            Sign Up
          </a>
        </div>
      )}
      {user && (
        <div className="flex">
          <span>{user.username}</span>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </>
  );
}

export default Profile;
