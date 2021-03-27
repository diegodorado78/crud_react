const express = require("express");//traigo libreria express
const app = express();
const mysql =require("mysql");
const cors = require("cors");//para request del front al back

app.use(cors());
app.use(express.json());//para parsear la info
const db = mysql.createConnection(
  // db es var para hacer los queries
  {
    //info de la conexion
    user: "root",
    host: "localhost",
    password: "c@d1051e",
    database: "crud_react",
    insecureAuth: true,
  }
);
db.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("Conexion correcta.");
  }
});
//create categoria
app.post("/create", (req, res) => {
  //standar sintax req y res para traer o enviar algo del server
  const name = req.body.name; // hago un request de la var name del frontend
  db.query(
    "INSERT INTO categorias (name) VAlUES(?)",
     name, //? por seguridad [ cuando mas de uno]
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("valores insertados correctamente");
      }
    }
  );
});
//read categoria
app.get("/categorias", (req, res) => {
  db.query("SELECT * FROM categorias", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      // res.json()
    }
  });
});
//update categoria
app.put("/editar", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  db.query(
    "UPDATE categorias SET name = ? WHERE id = ? ",
    [name, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//delete categoria
app.delete("/eliminar/:id", (req, res) => {
const id =req.params.id //accedo a la var id  de los params de mi request
db.query("DELETE FROM categorias WHERE id=?",id,(err,result)=>{
 if (err) {
   console.log(err);
 } else {
  res.send(result)
 }
})
});

app.listen(3001,()=>{
 console.log('server corriendo en puerto 3001')
});