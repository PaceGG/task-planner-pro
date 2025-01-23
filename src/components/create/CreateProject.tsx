import { useState } from "react";
import "../../index.scss";

function CreateProject() {
  const [name, setName] = useState("");

  return (
    <div>
      <h1>Create Project</h1>
      <div className="flex">
        <input
          type="text"
          placeholder="Project Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button>Create Project</button>
      </div>
    </div>
  );
}

export default CreateProject;
