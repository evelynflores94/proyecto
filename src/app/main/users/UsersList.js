import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from "react-bootstrap"
import axios from "axios"
import Table from "@mui/material/Table"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import Button from "@mui/material/Button"
import Swal from "sweetalert2"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import TablePagination from "@mui/material/TablePagination"

const UsersList = () => {
  const navigate = useNavigate()

  const [users, setUser] = useState([])
  const [tableUsers, setTableUsers] = useState([""])
  const [search, setSearch] = useState("")

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

  const getUsuarios = () => {
    axios.get(`http://localhost:3005/api/v1/users`).then((res) => {
      setUser(res.data)
      setTableUsers(res.data)
    })
  }

  const filterByName = (search) => {
    var resultSearch = tableUsers.filter((el) => {
      if (
        el.name.toString().toLowerCase().includes(search.toLowerCase()) ||
        el.email.toString().toLowerCase().includes(search.toLowerCase()) ||
        el.empresa.emp_nombre
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      ) {
        return el
      }
    })
    setUser(resultSearch)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    filterByName(e.target.value)
  }

  function deleteUser(id) {
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

              getUsuarios()
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
    getUsuarios()
  }, [])

  return (
    <Container className="mb-5">
      <div>
        <Typography className=" text-center mt-32 text-4xl font-extrabold tracking-tight leading-tight">
          Lista de Usuarios
        </Typography>
      </div>
      <div className="flex flex-row   items-center  ml-32">
        <TextField
          className="w-1/4"
          placeholder="Buscar por Nombre,email,empresa"
          value={search}
          onChange={handleSearch}
        ></TextField>

        <SearchIcon color="secondary" fontSize="large" />
      </div>

      <br></br>
      <div className="row">
        <Table>
          <thead>
            <tr>
              <th> Nombre de usuario</th>
              <th> Email</th>
              <th> Rol</th>
              <th> Empresa</th>
              <th>
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  size="small"
                  onClick={() => navigate("/userNew")}
                >
                  Agregar Usuario
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? users.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : users
            ).map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center"> {user.name} </TableCell>
                <TableCell align="center"> {user.email}</TableCell>
                <TableCell align="center"> {user.typeUser.name}</TableCell>
                <TableCell align="center"> {user.empresa.emp_nombre}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="error"
                    type="button"
                    size="small"
                    onClick={() => deleteUser(user.id)}
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            //ActionsComponent={TablePaginationActions}
          />
        </Table>
      </div>
    </Container>
  )
}

export default UsersList
