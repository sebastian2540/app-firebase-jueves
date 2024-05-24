import Header from "../../helpers/Header";
import "./ListadoUsuario.css";
import React, { useEffect, useState } from "react";
import { connDatabases } from "../../database/firebaseConfig";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";

const ListadoUsuario = () => {
  const [usuarios, setUsuario] = useState([]);

  async function getUsuarios() {
    let collectionUsuarios = collection(connDatabases, "usuario");
    let datosUsuario = await getDocs(collectionUsuarios);
    // console.log(collectionUsuarios);
    setUsuario(datosUsuario.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(datosUsuario.docs.map((doc) => ({ ...doc.data() })));
  }

  useEffect(() => {
    getUsuarios();
  }, []);

  function eliminarUsuario(id) {
    Swal.fire({
      title: "¿Está seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmar(id);
        Swal.fire({
          title: "Eliminado!",
          text: "Su archivo ha sido eliminado.",
          icon: "success",
        });
      }
    });
  }

  async function confirmar(id) {
    let deleteUser = doc(connDatabases, "usuario", id);
    await deleteDoc(deleteUser);
    getUsuarios()
  }

  return (
    <section className="panel">
      <Header />
      <main className="panel-contenido">
        {usuarios.map((element) => (
          <section>
            <section>
              <p>ID: {element.id} </p>
              <p>Nombre: {element.nombre}</p>
              <p>Usuario: {element.user}</p>
              <p>Contraseña: {element.password} </p>
              <p>Correo: {element.email} </p>
              <p>Ciudad: {element.ciudad} </p>
            </section>

            <div>
              <button>Editar</button>
              <button onClick={() => eliminarUsuario(element.id)}>
                Eliminar
              </button>
            </div>
          </section>
        ))}
      </main>
    </section>
  );
};

export default ListadoUsuario;
