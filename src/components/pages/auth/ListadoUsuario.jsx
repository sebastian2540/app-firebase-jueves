import Header from "../../helpers/Header";
import "./ListadoUsuario.css";
import React, { useEffect, useState } from "react";
import { connDatabases } from "../../database/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";

const ListadoUsuario = () => {
  const [usuarios, setUsuario] = useState([]);

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

  return (
    <section className="panel">
      <Header />
      <main className="panel-contenido">
        {
            usuarios.map(() => (
                <section>
                    <section>
                        <p>Nombre: </p>
                        <p>Usuario: </p>
                        <p>Contraseña: </p>
                        <p>Correo: </p>
                        <p>Ciudad</p>
                    </section>

                    <div>
                        <button>Editar</button>
                        <button>Eliminar</button>
                    </div>
                </section>
            ))
        }
      </main>
    </section>
  );
};

export default ListadoUsuario;
