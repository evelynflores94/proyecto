import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Table from "@mui/material/Table"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import Button from "@mui/material/Button"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { Container, Form, Modal, Row } from "react-bootstrap"
import Typography from "@mui/material/Typography"

const UsuariosPrueba = () => {
  const [users, setUser] = useState([])
  const navigate = useNavigate()

  const obtenerUsuarios = () => {
    axios.get(`http://localhost:3005/api/v1/users`).then((res) => {
      setUser(res.data)
    })
  }

  function eliminarUsuario(id) {
    Swal.fire({
      title: `Estás seguro de eliminar`,
      text: "Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, Eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3005/api/v1/users/${id}`)
          .then((response) => {
            if (response.status === 201) {
              Swal.fire(
                "Eliminado!",
                `Se eliminó con éxito el registro`,
                "success"
              )

              obtenerUsuarios()
            } else {
              Swal.fire(
                "Error!",
                "Hubo un problema al elminar el registro!",
                "error"
              )
            }
          })
      }
    })
  }

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  return (
    <Container className="mb-5">
      <div>
        <Typography className=" text-center mt-32 text-4xl font-extrabold tracking-tight leading-tight">
          Lista de Usuarios
        </Typography>

        <br></br>
        <div className="row">
          <Table>
            <thead>
              <tr>
                <th> Nombre de usuario</th>
                <th> Correo</th>
                <th> Rol</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell align="center"> {user.nombre} </TableCell>
                  <TableCell align="center"> {user.email}</TableCell>
                  <TableCell align="center"> {user.rol.nombre}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      type="button"
                      size="small"
                      onClick={() => eliminarUsuario(user.id)}
                    >
                      Eliminar
                    </Button>

                    <Button
                      variant="contained"
                      color="secondary"
                      type="button"
                      size="small"
                      onClick={() => navigate(`/userEdit/${user.id}`)}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="ml-80">
          <Button
            variant="contained"
            color="secondary"
            type="button"
            size="small"
            onClick={() => navigate("/userNuevo")}
          >
            Agregar Usuario
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default UsuariosPrueba
