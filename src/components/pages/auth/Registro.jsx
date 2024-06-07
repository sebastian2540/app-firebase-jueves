import React, { useEffect, useState } from "react";
import "./Login.css";
import { connDatabases, initStorage } from "../../database/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { v4 } from "uuid";

const Registro = () => {
  const [usuarios, setUsuario] = useState([]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [img, setImg] = useState("");
  let redireccion = useNavigate();

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

  const buscarUsuario = () => {
    let estado = usuarios.some((usuario) => usuario.user === user);
    return estado;
  };

  function confirmar() {
    Swal.fire({
      title: "Esta seguro que se quiere registrar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, registrarme",
    }).then((result) => {
      if (result.isConfirmed) {
        crearUsuario();
        Swal.fire({
          title: "Registrado",
          text: "Usuarios registrado correctamente...",
          icon: "success",
        });
        redireccion("/");
      }
    });
  }

  async function subirImg(img) {
    let referenciaImg = ref(initStorage, v4());
    await uploadBytes(referenciaImg, img);
    console.log(referenciaImg);
    let urlImg = await getDownloadURL(referenciaImg);
    return urlImg;
  }

  async function crearUsuario() {
    let imgServer = await subirImg(img);
    let nuevoUsuario = {
      user,
      password,
      email,
      nombre,
      ciudad,
      imgServer
    };
    let collectionUsuarios = collection(connDatabases, "usuario");
    await addDoc(collectionUsuarios, nuevoUsuario);
  }

  const registrarUsuario = () => {
    if (!buscarUsuario()) {
      confirmar();
    } else {
      Swal.fire({
        title: "Error",
        text: "Usuario ya existe en la base de datos",
        icon: "error",
      });
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
          <input
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setCiudad(e.target.value)}
            type="ciudad"
            placeholder="Ciudad"
          />
          <input onChange={(e) => setImg(e.target.files[0])} type="file" />
          <button onClick={registrarUsuario} type="button">
            Registro
          </button>
          <p class="message">
            Ya tiene cuenta? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registro;
