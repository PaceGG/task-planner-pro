import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import CreateProject from "./components/create/CreateProject";
import Signup from "./components/authentification/Signup";
import Login from "./components/authentification/Login";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-project" element={<CreateProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
