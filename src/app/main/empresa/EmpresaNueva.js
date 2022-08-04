import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Select from "@mui/material/Select"
import Button from "@mui/material/Button"
import Swal from "sweetalert2"

const EmpresaNueva = () => {
  const navigate = useNavigate()

  const [tipo, setTipo] = useState([""])
  const [paises, setPais] = useState([""])
  const [paisId, setPaisId] = useState("")
  const [ciudades, setCiudades] = useState([""])

  //para guardar los datos

  const [data, setData] = useState({
    emp_ci: "",
    emp_razon_soc: "",
    emp_nombre: "",
    emp_rep_legal: "",
    emp_contacto: "",
    emp_direccion: "",
    emp_telefono: "",
    // emp_logo: "",
    emp_email: "",
    ciudadId: "",
    tipoClienteId: ""
  })

  const obtenerTipos = () => {
    axios.get(`http://localhost:3005/api/v1/tipoCliente`).then((res) => {
      setTipo(res.data)
    })
  }

  const obtenerPaises = () => {
    axios.get(`http://localhost:3005/api/v1/pais`).then((res) => {
      setPais(res.data)
    })
  }

  const handleChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value
    })

    ///   console.log(data)
  }

  useEffect(() => {
    obtenerTipos(), obtenerPaises()
  }, [])

  useEffect(() => {
    paises.forEach((data) => {
      if (data.pais_id === paisId) {
        // console.log(data)
        setCiudades(data.ciudades)
      }
    })
  }, [paisId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post(
      `http://localhost:3005/api/v1/empresa`,
      data
    )
    if (response.status === 201) {
      Swal.fire("Guardado!", `El registro se guardo exitosamente`, "success")
      navigate("/empresa")
    } else {
      Swal.fire("Error!", "Hubo un problema al crear el registro!", "error")
    }
  }

  return (
    <div className="w-full flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full w-full py-8 px-64 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full sm:mx-0">
          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Registrar Empresa
          </Typography>
          <form
            name="empresaForm"
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-row w-full">
              <div className="col flex-col w-full">
                <div className="col-3">
                  <label htmlFor="ruc">Ruc</label>
                </div>
                <TextField
                  name="emp_ci"
                  type="text"
                  className="mb-24"
                  autoFocus
                  variant="outlined"
                  required
                  value={data.emp_ci}
                  onChange={handleChange}
                />
                <br></br>

                <label htmlFor="nombComercial">Nombre Comercial</label>
                <br></br>
                <TextField
                  name="emp_nombre"
                  type="text"
                  value={data.emp_nombre}
                  onChange={handleChange}
                  className="mb-24"
                  variant="outlined"
                  required
                />
                <br></br>

                <label htmlFor="nombreContacto">Nombre Contaco</label>
                <br></br>
                <TextField
                  name="emp_contacto"
                  type="text"
                  value={data.emp_contacto}
                  onChange={handleChange}
                  className="mb-24"
                  variant="outlined"
                  required
                />
                <br></br>
                <div className="flex flex-row">
                  <label htmlFor="pais">Pais</label>
                  <br></br>
                  <Select
                    name="paisId"
                    className="form-control w-3/12"
                    onChange={(event) => setPaisId(event.target.value)}
                  >
                    {paises.map((el) => {
                      return (
                        <MenuItem key={el.pais_id} value={el.pais_id}>
                          {el.pais_nombre}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  <label htmlFor="ciudad">Ciudad</label>
                  <br></br>
                  <Select
                    className="form-control w-3/12"
                    onChange={handleChange}
                    name="ciudadId"
                  >
                    {ciudades.map((ciudad) => {
                      return (
                        <MenuItem
                          key={ciudad.ciudad_id}
                          value={ciudad.ciudad_id}
                        >
                          {ciudad.ciudad_nombre}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </div>
                <br></br>
                <label htmlFor="telefono">Telefono</label>
                <br></br>
                <TextField
                  name="emp_telefono"
                  type="telefono"
                  value={data.emp_telefono}
                  onChange={handleChange}
                  className="mb-24"
                  variant="outlined"
                  required
                />
                <br></br>
                <label htmlFor="logo">Logo</label>
                <br></br>
                <TextField
                  ///name="emp_logo"
                  type="file"
                  //value={data.emp_logo}
                  onChange={handleChange}
                  className="mb-24"
                  variant="outlined"
                />
              </div>
              <div className="col flex-col w-full">
                <label htmlFor="razonSocial">Razon Social</label>
                <br></br>
                <TextField
                  name="emp_razon_soc"
                  type="text"
                  value={data.emp_razon_soc}
                  onChange={handleChange}
                  className="mb-24"
                  variant="outlined"
                  required
                />
                <br></br>

                <label htmlFor="repLegal">Representante Legal</label>
                <br></br>
                <TextField
                  name="emp_rep_legal"
                  type="text"
                  className="mb-24"
                  variant="outlined"
                  value={data.emp_rep_legal}
                  onChange={handleChange}
                />
                <br></br>

                <label htmlFor="correo">Correo Contacto</label>
                <br></br>
                <TextField
                  name="emp_email"
                  type="email"
                  className="mb-24"
                  variant="outlined"
                  value={data.emp_email}
                  onChange={handleChange}
                />
                <br></br>

                <label htmlFor="direccion">Direccion</label>
                <br></br>
                <TextField
                  name="emp_direccion"
                  type="text"
                  className="mb-24"
                  variant="outlined"
                  value={data.emp_direccion}
                  onChange={handleChange}
                />
                <br></br>

                <label htmlFor="tipo">Tipo</label>
                <br></br>
                <Select
                  className="form-control w-1/2"
                  onChange={handleChange}
                  name="tipoClienteId"
                >
                  {tipo.map((tipos) => {
                    return (
                      <MenuItem
                        key={tipos.tipo_cli_id}
                        value={tipos.tipo_cli_id}
                      >
                        {tipos.tipo_cli_nombre}
                      </MenuItem>
                    )
                  })}
                </Select>
                <br></br>

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
                    onClick={() => navigate("/empresa")}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Paper>
    </div>
  )
}

export default EmpresaNueva
