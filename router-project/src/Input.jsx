import { useNavigate } from "react-router-dom";

function Input({ setName, setCity }) {

  const navigate = useNavigate();

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter City"
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={() => navigate("/display")}>
        Next
      </button>
    </div>
  );
}

export default Input;