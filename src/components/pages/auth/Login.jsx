import React, { useEffect, useState } from "react";
import "./Login.css";
import { connDatabases } from "../../database/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [usuarios, setUsuario] = useState([]);
  const [getUser, setUser] = useState("");
  const [getPassword, setPassword] = useState("");
  async function getUsuarios() {
    let collectionUsuarios = collection(connDatabases, "usuario");
    let datosUsuario = await getDocs(collectionUsuarios);
    // console.log(collectionUsuarios);
    setUsuario(datosUsuario.docs.map((doc) => ({ ...doc.data() })));
    console.log(datosUsuario.docs.map((doc) => ({ ...doc.data() })));
  }
  
  useEffect(() => {
    getUsuarios();
  }, []);

  let redireccion = useNavigate();

  const buscarUsuario = () => {
    let estado = usuarios.some(
      (usuario) => usuario.user === getUser && usuario.password === getPassword
    );
    return estado;
  };

  const iniciarSesion = () => {
    if (buscarUsuario()) {
      Swal.fire({
        title: "Bienvenido",
        text: "Será redireccionado al Home",
        icon: "success"
      });
      setTimeout(() => {
        redireccion("/home");
      },2000);
      console.log("Bienvenido");
    } else {
      Swal.fire({
        title: "Error",
        text: "Usuario y/o contraseña incorrecto",
        icon: "error"
      });
      console.log("Error de credenciales");
    }
  };

  return (
    <div class="login-page">
      <div class="form">
        <form class="login-form">
          <input
            onChange={(e) => setUser(e.target.value)}
            type="text"
            placeholder="Username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button onClick={iniciarSesion} type="button">
            login
          </button>
          <p class="message">
            Not registered? <a href="#">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
