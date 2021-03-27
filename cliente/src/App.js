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
  //METODOS PARA ARTICULOS
  // segundo formulario
  const [numero_registro, setNumero_registro] = useState(0);
  const [artName, setArtName] = useState("");
  const [cantidad, setCantidad] = useState(0);

  const [listaArticulos, setListaArticulos] = useState([]); //state inicial
  const [newArtName, setNewArtName] = useState("");
  //metodo agregar categoria
  const addArticulo = () => {
    Axios.post("http://localhost:3001/createArt", {
      numero_registro: numero_registro,
      artName: artName,
      cantidad: cantidad,
    }).then(() => {
      setListaArticulos([
        ...listaArticulos,
        {
          numero_registro: numero_registro,
          artName: artName,
          cantidad: cantidad,
        },
      ]);
    });
  };
  //metodo mostrar categorias
  const getArticulos = () => {
    Axios.get("http://localhost:3001/articulos").then((response) => {
      setListaArticulos(response.data);
    });
  };
  //metodo para actualizar
  const updateArticulo = (id) => {
    //recibe el id a editar
    Axios.put("http://localhost:3001/editarArt", {
      artName: newArtName,
      id: id,
    }).then((response) => {
      // alert("actualizado!!!")
      setListaArticulos(
        listaArticulos.map((articulo) => {
          return articulo.id === id
            ? {
                id: articulo.id,
                numero_registro: articulo.numero_registro,
                name: newArtName,
                cantidad: articulo.cantidad,
              }
            : articulo;
        })
      );
    });
  };
  //metodo para eliminar
  const deleteArticulo = (id) => {
    Axios.delete(`http://localhost:3001/eliminarArt/${id}`).then((response) => {
      setListaArticulos(
        listaArticulos.filter((articulo) => {
          return articulo.id !== id; //devuleve todos menos el {id} del eliminado
        })
      );
    }); //paso la id que viene del boton como param para eliminar y luego filtro para actualizar
  };
  // RETURN DE LA FUNCION APP
  return (
    <div className=" container bg-white d-flex  flex-column justify-content-center text-center ">
      {/* DIV DE AGREGAR CATEGORIA */}
      <div className="App_categorias bg-dark text-white my-5 ">
        <div className=" column content-center px-auto mx-auto  ">
          <h3>Categorias</h3>
          <label>
            <h5>Nombre </h5>
          </label>
          <input
            className="mx-1"
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
                  <div className="my-2">
                    <h5>
                      Categoria:
                      <span className="text-success mx-1 ">
                        {categoria.name}
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

      {/* DIV PARA ARTICULOS */}

      {/* DIV DE AGREGAR ARTICULO */}
      <div className=" App_articulos bg-dark text-white py-3 ">
        <h3>Articulos</h3>
        <div className="d-flex flex-column content-center px-auto mx-auto ">
          <label>
            Nº registro
            <input
              className="border rounded-5 mx-1"
              type="number"
              id="numero_registro"
              name="numero_registro"
              onChange={(e) => {
                setNumero_registro(e.target.value);
              }}
            />
          </label>
          <label>
            Nombre
            <input
              className="border rounded-5 mx-1"
              type="text"
              id="artName"
              name="artName"
              onChange={(e) => {
                setArtName(e.target.value);
              }}
            />
          </label>
          <label>
            Cantidad
            <input
              className="border rounded-5 mx-1"
              type="number"
              id="cantidad"
              name="cantidad"
              onChange={(e) => {
                setCantidad(e.target.value);
              }}
            />
          </label>
        </div>
        <button
          className="btn btn-outline-primary my-3 lh-base"
          onClick={addArticulo}
        >
          Agregar
        </button>
        {/* DIV DE CATEGORIAS ACTUALES */}
        <div className=" App__Categorias my-1 ">
          <h3> Lista de Articulos</h3>
          <button className="btn btn-primary my-3" onClick={getArticulos}>
            Mostrar Articulos
          </button>
            {listaArticulos.map((articulo) => {
              return (
                <div className="my-1" key={articulo.id}>
                  <div className=" my-2">
                    <h5>
                      id registro
                      <span className="text-success mx-1 ">
                        {articulo.numero_registro}
                      </span>
                    </h5>
                    <h5>
                      Nombre:
                      <span className="text-success mx-1 ">
                        {articulo.artName}
                      </span>
                    </h5>
                    <h5>
                      Cantidad
                      <span className="text-success mx-1 ">
                        {articulo.cantidad}
                      </span>
                    </h5>
                    <input
                      type="text"
                      onChange={(e) => {
                        setNewArtName(e.target.value);
                      }}
                    />
                    <button
                      className="btn btn-success m-1"
                      onClick={() => {
                        updateArticulo(articulo.id);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger m-1"
                      onClick={() => {
                        deleteArticulo(articulo.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })}

        </div>
      </div>
    </div>
  );
}
export default App;
