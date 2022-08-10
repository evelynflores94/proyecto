import React, { useState, useEffect } from "react"
import axios from "axios"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { useNavigate } from "react-router-dom"
import Paper from "@mui/material/Paper"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import Swal from "sweetalert2"

const UserNew = () => {
  const navigate = useNavigate()
  const [typeUser, setTypeUser] = useState([""])
  const [company, setCompany] = useState([""])

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    typeUserId: "",
    companyId: ""
  })

  const handleChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value
    })
  }

  const getTypeUser = () => {
    axios.get(`http://localhost:3005/api/v1/typeUser`).then((res) => {
      setTypeUser(res.data)
    })
  }

  //camiar empresa por company
  const getCompany = () => {
    axios.get(`http://localhost:3005/api/v1/empresa`).then((res) => {
      setCompany(res.data)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post(
      `http://localhost:3005/api/v1/users`,
      data
    )
    if (response.status === 201) {
      Swal.fire("Guardado!", `El registro se guardo exitosamente`, "success")
      navigate("/users")
    } else {
      Swal.fire("Error!", "Hubo un problema al crear el registro!", "error")
    }
  }
  useEffect(() => {
    getTypeUser(), getCompany()
  }, [])

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full w-full py-8 px-64 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="max-w-320 mx-auto sm:mx-0 items-center">
          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Registrar usuario
          </Typography>
          <form
            name="loginForm"
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit}
          >
            <label htmlFor="name">Nombre</label>
            <TextField
              name="name"
              type="name"
              className="mb-24"
              autoFocus
              variant="outlined"
              required
              value={data.name}
              onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <TextField
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              className="mb-24"
              variant="outlined"
              required
            />
            <label htmlFor="password">Password</label>
            <TextField
              id="password"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              className="mb-24"
              variant="outlined"
              required
            />
            <label htmlFor="typeUserId">Tipo Usuario</label>

            <Select
              className="form-control"
              onChange={handleChange}
              name="typeUserId"
              required
            >
              {typeUser.map((el) => {
                return (
                  <MenuItem key={el.id} value={el.id}>
                    {el.name}
                  </MenuItem>
                )
              })}
            </Select>
            {/* cambiar el em_nombre  */}
            <label htmlFor="Empresa">Empresa</label>
            <Select
              className="form-control"
              onChange={handleChange}
              name="companyId"
              required
            >
              {company.map((el) => {
                return (
                  <MenuItem key={el.emp_id} value={el.emp_id}>
                    {el.emp_nombre}
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
export default UserNew
