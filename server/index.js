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

app.post("/create", (req,res)=>{//standar sintax req y res para traer o enviar algo del server
 const name = req.body.name; // hago un request de la var name del frontend

 db.query(
   "INSERT INTO categorias (name) VAlUES(?)",
   [name], //? por seguridad
   (err, result) => {
    if(err){
     console.log(err)
    }else{
     res.send("valores insertados correctamente")
    }
   }
 );
});

app.listen(3001,()=>{
 console.log('server corriendo en puerto 3001')
});