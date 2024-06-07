import React, { useEffect, useState } from "react";
import "./EditarUsuarios.css";
import { connDatabases } from "../../database/firebaseConfig";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Registro = () => {
  const [usuarios, setUsuario] = useState([]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [img, setImg] = useState("");
  let redireccion = useNavigate();
  let { id } = useParams();

  async function getUsuarioId(id) {
    let usuarioEditar = await getDoc(doc(connDatabases, "usuario", id));
    console.log(usuarioEditar);
    setUser(usuarioEditar.data().user);
    setPassword(usuarioEditar.data().password);
    setNombre(usuarioEditar.data().nombre);
    setEmail(usuarioEditar.data().email);
    setCiudad(usuarioEditar.data().ciudad);
  }

  useEffect(() => {
    getUsuarioId(id);
  }, []);

  async function editarUsuario() {
    let nuevoUsuario = {
      user,
      password,
      nombre,
      email,
      ciudad,
    };
    let enviarnUsuarios = doc(connDatabases, "usuario", id);
    await updateDoc(enviarnUsuarios, nuevoUsuario);
    redireccion('/listadoUsuario')
    console.log(nuevoUsuario)
  }

  return (
    <div class="login-page">
      <div class="form">
        <form class="login-form">
          <input
            onChange={(e) => setUser(e.target.value)}
            type="text"
            placeholder="Username"
            value={user}
            disabled
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            value={password}
            disabled
          />
          <input
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Name"
            value={nombre}
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            value={email}
          />
          <input
            onChange={(e) => setCiudad(e.target.value)}
            type="ciudad"
            placeholder="Ciudad"
            value={ciudad}
          />
          <input onChange={(e) => setImg(e.target.value)} type="file" />
          <button onClick={editarUsuario} type="button">
            Editar
          </button>
          <button type="button">
            <Link to="/listado-usuarios">Cancelar</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
