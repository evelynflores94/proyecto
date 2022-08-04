import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import Paper from "@mui/material/Paper"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Swal from "sweetalert2"
import axios from "axios"

const UsuariosEdit = () => {
  const [rol, setRol] = useState([""])
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [rolId, setRolId] = useState("")

  const { id } = useParams()
  const navigate = useNavigate()

  const obtenerRoles = () => {
    axios.get(`http://localhost:3005/api/v1/roles`).then((res) => {
      setRol(res.data)
    })
  }

  const obtenerUsuario = () => {
    axios.get(`http://localhost:3005/api/v1/users/${id}`).then((res) => {
      setNombre(res.data.nombre)
      setEmail(res.data.email)
      setRolId(res.data.rolId)
      console.log(res)
    })
  }

  const data = {
    nombre: nombre,
    email: email,
    rolId: rolId
  }

  const editarUsuarios = async (e) => {
    e.preventDefault()

    const response = await axios.patch(
      `http://localhost:3005/api/v1/users/${id}`,
      data
    )

    if (response.status === 200) {
      Swal.fire("Guardado!", `El registro se guardo exitosamente`, "success")
      navigate("/users")
    } else {
      Swal.fire("Error!", "Hubo un problema al crear el registro!", "error")
    }
  }

  useEffect(() => {
    obtenerRoles()
    obtenerUsuario()
  }, [])

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full w-full py-8 px-64 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="max-w-320 mx-auto sm:mx-0 items-center">
          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Editar usuario
          </Typography>
          <form
            onSubmit={editarUsuarios}
            className="flex flex-col justify-center  mt-32"
            //onSubmit={handleSubmit}
          >
            <label htmlFor="nombre">Nombre</label>
            <TextField
              id="nombre"
              name="nombre"
              type="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mb-24"
              autoFocus
              variant="outlined"
              required
            />
            <label htmlFor="email">Email</label>
            <TextField
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-24"
              variant="outlined"
              required
            />

            <label htmlFor="Rol">Rol</label>
            <Select
              value={rolId}
              className="form-control"
              onChange={(e) => setRolId(e.target.value)}
              required
            >
              {rol.map((el) => {
                return (
                  <MenuItem key={el.id} value={el.id}>
                    {el.nombre}
                  </MenuItem>
                )
              })}
            </Select>

            <div className=" ml-72">
              <Button
                className=" mt-24"
                variant="contained"
                color="secondary"
                type="submit"
                size="small"
              >
                Guardar
              </Button>

              <Button
                className=" mt-24 ml-20"
                variant="contained"
                color="error"
                type="button"
                size="small"
                onClick={() => navigate("/users")}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </Paper>
    </div>
  )
}

export default UsuariosEdit
