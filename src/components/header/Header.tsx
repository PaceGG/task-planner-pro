import "../../index.scss";
import Profile from "./Profile";

function Header() {
  return (
    <header>
      <nav>
        <h1>
          <a href="/">
            Task Planner <span className="accent-color">Pro</span>
          </a>
        </h1>
        <Profile></Profile>
      </nav>
    </header>
  );
}

export default Header;
