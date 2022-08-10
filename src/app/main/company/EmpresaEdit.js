import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import axios from "axios"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import FormGroup from "@mui/material/FormGroup"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"

const EmpresaEdit = () => {
  const navigate = useNavigate()

  const { id } = useParams()

  const [tipo, setTipo] = useState([""])

  const [paises, setPais] = useState([""])
  const [paisId, setPaisId] = useState("")
  const [ciudadPais, setCiudadPais] = useState([""])

  const [ruc, setRuc] = useState("")
  const [razonSocial, setRazonSocial] = useState("")
  const [nombre, setNombre] = useState("")
  const [repLegal, setRepLegal] = useState("")
  const [contacto, setContacto] = useState("")
  const [email, setEmail] = useState("")
  ///const [paisId, setPaisId] = useState("")
  const [ciudadId, setCiudadId] = useState("")
  const [telefono, setTelefono] = useState("")
  const [direccion, setDireccion] = useState("")
  const [tipoCliente, seTipoCliente] = useState("")

  const data = {
    emp_ci: ruc,
    emp_razon_soc: razonSocial,
    emp_nombre: nombre,
    emp_rep_legal: repLegal,
    emp_contacto: contacto,
    emp_email: email,
    ciudadId: ciudadId,
    emp_telefono: telefono,
    emp_direccion: direccion,
    tipoClienteId: tipoCliente
  }

  /*   const obtenerCiudad = () => {
    axios.get(`http://localhost:3005/api/v1/ciudad`).then((res) => {
      setCiudades(res.data)
    })
  }
 */
  const obtenerPaises = () => {
    axios.get(`http://localhost:3005/api/v1/pais`).then((res) => {
      setPais(res.data)
    })
  }

  const obtenerTipos = () => {
    axios.get(`http://localhost:3005/api/v1/tipoCliente`).then((res) => {
      setTipo(res.data)
    })
  }

  const obtenerEmpresa = () => {
    axios.get(`http://localhost:3005/api/v1/empresa/${id}`).then((res) => {
      setRuc(res.data.emp_ci)
      setRazonSocial(res.data.emp_razon_soc)
      setNombre(res.data.emp_nombre)
      setRepLegal(res.data.emp_rep_legal)
      setContacto(res.data.emp_contacto)
      setEmail(res.data.emp_email)
      setPaisId(res.data.ciudad.paisId)
      setCiudadId(res.data.ciudadId)
      setTelefono(res.data.emp_telefono)
      setDireccion(res.data.emp_direccion)
      seTipoCliente(res.data.tipoClienteId)
      console.log(res)
    })
  }

  const editarEmpresa = async (e) => {
    e.preventDefault()

    const response = await axios.patch(
      `http://localhost:3005/api/v1/empresa/${id}`,
      data
    )

    if (response.status === 200) {
      Swal.fire("Guardado!", `El registro se guardo exitosamente`, "success")
      navigate("/empresa")
    } else {
      Swal.fire("Error!", "Hubo un problema al crear el registro!", "error")
    }
  }

  useEffect(() => {
    //obtenerCiudad(),
    obtenerTipos(), obtenerPaises(), obtenerEmpresa()
  }, [])

  useEffect(() => {
    paises.forEach((data) => {
      if (data.pais_id === paisId) {
        console.log(data)
        setCiudadPais(data.ciudades)
      }
    })
  }, [paisId])

  return (
    <div className="w-full flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full w-full py-8 px-64 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full sm:mx-0">
          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Editar Empresa
          </Typography>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "40ch" }
            }}
            onSubmit={editarEmpresa}
          >
            <div>
              <TextField
                required
                label="Ruc"
                name="emp_ci"
                type="text"
                className="mb-24"
                autoFocus
                variant="outlined"
                value={ruc}
                onChange={(e) => setRuc(e.target.value)}
              />

              <TextField
                label="Razon Social"
                required
                name="emp_razon_soc"
                type="text"
                className="mb-24"
                variant="outlined"
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
              />
              <TextField
                required
                label="Nombre Comercial"
                name="emp_nombre"
                type="text"
                className="mb-24"
                variant="outlined"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <TextField
                required
                label="Representante Legal"
                name="emp_rep_legal"
                type="text"
                className="mb-24"
                variant="outlined"
                value={repLegal}
                onChange={(e) => setRepLegal(e.target.value)}
              />

              <TextField
                label="Nombre Contacto"
                name="emp_contacto"
                type="text"
                className="mb-24"
                variant="outlined"
                value={contacto}
                onChange={(e) => setContacto(e.target.value)}
              />

              <TextField
                label="Correo Contacto"
                name="emp_email"
                type="email"
                className="mb-24"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                <FormControl className="form-control ml-8 w-2/6">
                  <InputLabel id="demo-simple-select-label">Pais</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Pais"
                    name="paisId"
                    value={paisId}
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
                </FormControl>

                <FormControl className="form-control w-2/6 ml-8">
                  <InputLabel id="demo-simple-select-label">Ciudad</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Ciudad"
                    name="ciudadId"
                    value={ciudadId}
                    onChange={(e) => setCiudadId(e.target.value)}
                  >
                    {ciudadPais.map((ciudad) => {
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
                </FormControl>

                <TextField
                  label="Direccion"
                  name="emp_direccion"
                  type="text"
                  className="mb-24"
                  variant="outlined"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />

                <TextField
                  required
                  label="Telefono"
                  name="emp_telefono"
                  type="telefono"
                  variant="outlined"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />

                <FormControl className="form-control w-2/6 ml-8 ">
                  <InputLabel id="demo-simple-select-label">
                    Tipo Cliente
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    onChange={(e) => seTipoCliente(e.target.value)}
                    name="tipoClienteId"
                    value={tipoCliente}
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
                </FormControl>

                <TextField
                  ///name="emp_logo"
                  id="outlined"
                  type="file"
                  //value={data.emp_logo}
                  //onChange={handleChange}
                />
              </div>
            </div>

            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="secondary" type="submit">
                Guardar
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => navigate("/empresa")}
              >
                Cancelar
              </Button>
            </Stack>
          </Box>
        </div>
      </Paper>
    </div>
  )
}

export default EmpresaEdit
