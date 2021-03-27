import "./App.css";
import {useState} from "react";
import Axios from "axios";

function App() {
  const [name,setName]=useState("");
const addCategory = () => {
  console.log(name)
  Axios.post("http://localhost:3001/create",
  { name:name}).then(() => {
    console.log("success");
  }); //enviamos al back un body como un obj
};
  return (
    <div className="App">
      <h1>Categorias</h1>
      <form className="App__form">
        <label>Nombre</label>
        <input type="text" id="name" name="name"
         onChange={(event)=>{
          setName(event.target.value)
        }}
         />
        <button onClick={addCategory}> Agregar categoria</button>
      </form>
    </div>
  );
}
export default App;
