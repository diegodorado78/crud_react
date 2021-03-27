import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
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
  const deleteCategoria = (id) => {
    Axios.delete(`http://localhost:3001/eliminar/${id}`).then((response) => {
      setListaCategorias(
        listaCategorias.filter((categoria) => {
          return categoria.id !== id; //devuleve todos menos el {id} del eliminado
        })
      );
    }); //paso la id que viene del boton como param para eliminar y luego filtro para actualizar
  };
  return (
    <div className=" container bg-dark text-white d-flex  flex-column justify-content-center text-center ">
      {/* DIV DE AGREGAR CATEGORIA */}
      <div className=" column content-center px-auto mx-auto ">
        <h3>Categorias</h3>
        <label>
          <h5>Nombre </h5>
        </label>
        <input
          className="border rounded-5 mx-1"
          type="text"
          id="name"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button
          className="btn btn-outline-primary my-3 lh-base"
          onClick={addCategory}
        >
          Agregar
        </button>
      </div>
      {/* DIV DE CATEGORIAS ACTUALES */}
      <div className=" App__Categorias my-1 ">
        <h3> Categorias actuales</h3>
        <button className="btn btn-primary my-3" onClick={getCategorias}>
          Mostrar categorias
        </button>
        <ul className="flex list-unstyled">
          {listaCategorias.map((categoria) => {
            return (
              <li className="my-1" key={categoria.id}>
                <div className="border my-2">
                  <h5>
                    Categoria:
                    <span className="text-success mx-1 ">
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      {categoria.name}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}{" "}
                   
                   
                   
                   
                   
                   
                   
                   
                   
                    </span>
                  </h5>
                  <input
                    type="text"
                    onChange={(e) => {
                      setNewName(e.target.value);
                    }}
                  />
                  <button
                    className="btn btn-success m-1"
                    onClick={() => {
                      updateCategoria(categoria.id); //categoria es el objeto del map
                    }} //semicolon add
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => {
                      deleteCategoria(categoria.id);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default App;
