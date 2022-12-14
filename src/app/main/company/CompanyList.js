import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import { Container } from "@mui/material"
import Table from "@mui/material/Table"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import TablePagination from "@mui/material/TablePagination"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"

const CompanyList = () => {
  const navigate = useNavigate()
  const [empresas, setEmpresas] = useState([""])
  const [tablaEmpresas, setTablaEmpresas] = useState([""])
  //para la busqueda
  const [busqueda, setBusqueda] = useState("")

  //para la paginacion
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - empresas.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const obtenerEmpresas = () => {
    axios.get("http://localhost:3005/api/v1/company").then((res) => {
      setEmpresas(res.data)
      setTablaEmpresas(res.data)
    })
  }

  const handleChangeBuscar = (e) => {
    setBusqueda(e.target.value)
    filtrarBusqueda(e.target.value)
  }

  const filtrarBusqueda = (buscar) => {
    var resultadoBusqueda = tablaEmpresas.filter((el) => {
      if (
        el.name.toString().toLowerCase().includes(buscar.toLowerCase()) ||
        el.repLegal.toString().toLowerCase().includes(buscar.toLowerCase())
      ) {
        return el
      }
    })
    setEmpresas(resultadoBusqueda)
  }

  function eliminaEpresa(id) {
    Swal.fire({
      title: `Est??s seguro de eliminar`,
      text: "Esta acci??n no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "S??, Eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3005/api/v1/empresa/${id}`)
          .then((response) => {
            if (response.status === 201) {
              Swal.fire(
                "Eliminado!",
                `Se elimin?? con ??xito el registro`,
                "success"
              )

              obtenerEmpresas()
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
    obtenerEmpresas()
  }, [])

  return (
    <Container className="mb-5">
      <div>
        <Typography className=" text-center mt-32 text-4xl font-extrabold tracking-tight leading-tight">
          Lista de Empresas
        </Typography>
      </div>

      <div className="flex flex-row   items-center">
        <TextField
          className="w-1/4"
          placeholder="Buscar por Nombre o Representante"
          value={busqueda}
          onChange={handleChangeBuscar}
        ></TextField>

        <SearchIcon color="secondary" fontSize="large" />
      </div>

      <div className="row">
        <Table>
          <thead>
            <tr>
              <th> Ruc</th>
              <th> Razon social</th>
              <th> Nombre Comercial</th>
              <th> Representante legal</th>
              <th> N. Contacto</th>
              <th> Correo contacto</th>

              <th>
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  size="small"
                  onClick={() => navigate("/empresaNueva")}
                >
                  Nueva Empresa
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? empresas.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : empresas
            ).map((emp) => (
              <TableRow>
                <TableCell align="center"> {emp.ci} </TableCell>
                <TableCell align="center"> {emp.bussiness_name}</TableCell>
                <TableCell align="center"> {emp.name}</TableCell>
                <TableCell align="center"> {emp.repLegal} </TableCell>
                <TableCell align="center"> {emp.contact}</TableCell>
                <TableCell align="center"> {emp.email}</TableCell>

                <TableCell align="center" className="w-1/6">
                  <Button
                    variant="contained"
                    f
                    color="secondary"
                    type="button"
                    size="small"
                    onClick={() => navigate(`/empresaEdit/${emp.emp_id}`)}
                  >
                    Editar
                  </Button>

                  <Button
                    className="ml-12"
                    variant="contained"
                    color="error"
                    type="button"
                    // component={NavLinkAdapter}
                    size="small"
                    onClick={() => navigate(`/empresaNueva`)}
                  >
                    Planes
                  </Button>

                  <Button
                    className="ml-12"
                    variant="contained"
                    color="error"
                    type="button"
                    size="small"
                    onClick={() => eliminaEpresa(emp.emp_id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={empresas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Table>
      </div>
    </Container>
  )
}

export default CompanyList
