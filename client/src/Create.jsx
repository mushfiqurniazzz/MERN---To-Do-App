import { useState } from "react";
import axios from "axios";

function Create() {
  const [task, setTask] = useState();
  const handleAdd = () => {
    axios
      .post("http://localhost:3001/add", { task: task })
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Ex - 'Feed the cats'"
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="button" onClick={handleAdd}>
          <i className="fa fa-plus" style={{ color: "#d288ec" }}></i>{" "}
        </button>
      </div>
    </>
  );
}

export default Create;
