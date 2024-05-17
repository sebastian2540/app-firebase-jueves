import React, { useEffect, useState } from "react";
import "./Login.css";
import { connDatabases } from "../../database/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

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
      setTimeout(() => {
        redireccion("/home");
      });
      console.log("Bienvenido");
    } else {
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
