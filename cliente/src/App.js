import "./App.css";
import {useState} from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [listaCategorias, setListaCategorias] = useState([]); //state inicial
  const [newName, setNewName] = useState([]);
  //metodo agregar categoria
  const addCategory = () => {
    console.log(name);
    Axios.post("http://localhost:3001/create", { name: name }).then(() => {
      setListaCategorias([
        ...listaCategorias, //desetructurador para hacer push al array
        { name: name },
      ]); //agrego el nuevo valor al array
    }); //enviamos al back un body como un obj
  };
  //metodo mostrar categorias
  const getCategorias = () => {
    Axios.get("http://localhost:3001/categorias").then((response) => {
      // console.log(response);
      setListaCategorias(response.data); //hago push del array data a la lista
    });
  };
  //metodo para actualizar
  const updateCategoria = (id) => {
    //recibe el id a editar
    Axios.put("http://localhost:3001/editar", { name: newName, id: id }).then(
      (response) => {
        // alert("actualizado!!!")
        setListaCategorias(
          listaCategorias.map((categoria) => {
            return categoria.id === id
              ? { id: categoria.id, name: newName }
              : categoria;
          })
        );
      }
    );
  };
  //metodo para eliminar
  const deleteCategoria = (id)  =>  {
    Axios.delete(`http://localhost:3001/eliminar/${id}`).then((response)=>{
  setListaCategorias(listaCategorias.filter((categoria)=>{
    return categoria.id!== id; //devuleve todos menos el {id} del eliminado
  }))
    });  //paso la id que viene del boton como param para eliminar y luego filtro para actualizar
  };;
  return (
    <div className="App">
      <h1>Categorias</h1>
      <div className="App__form">
        <label>Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button onClick={addCategory}> Agregar categoria</button>
      </div>
      <hr />
      <div className="App__categories">
        <h1> Categorias actuales</h1>
        <button onClick={getCategorias}> mostrar categorias</button>
        <ul>
          {listaCategorias.map((categoria) => {
            return (
              <li key={categoria.id}>
                Categoria:{categoria.name}
                <input
                  type="text"
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateCategoria(categoria.id);     //categoria es el objeto del map
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    deleteCategoria(categoria.id);
                  }}
                >
                  Eliminar
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default App;
