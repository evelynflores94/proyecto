import FuseUtils from "@fuse/utils"
import FuseLoading from "@fuse/core/FuseLoading"
import { Navigate } from "react-router-dom"
import settingsConfig from "app/configs/settingsConfig"
import SignInConfig from "../main/sign-in/SignInConfig"
import SignUpConfig from "../main/sign-up/SignUpConfig"
import SignOutConfig from "../main/sign-out/SignOutConfig"
import Error404Page from "../main/404/Error404Page"
import ExampleConfig from "../main/example/ExampleConfig"
import UsuariosLista from "../main/usuarios/UsuariosLista"
import UsuariosNuevo from "../main/usuarios/UsuariosNuevo"
import UsuariosEdit from "../main/usuarios/UsuariosEdit"
import EmpresaLista from "../main/empresa/EmpresaLista"
import EmpresaNueva from "../main/empresa/EmpresaNueva"
import EmpresaEdit from "../main/empresa/EmpresaEdit"

const routeConfigs = [ExampleConfig, SignOutConfig, SignInConfig, SignUpConfig]

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: "/",
    element: <Navigate to="/example" />

    //quite ka proteccion para probar el inicio de sesion
    /// auth: settingsConfig.defaultAuth
  },
  {
    path: "loading",
    element: <FuseLoading />
  },
  {
    path: "404",
    element: <Error404Page />
  },
  {
    path: "*",
    element: <Navigate to="404" />
  },
  {
    path: "users",
    element: <UsuariosLista />
  },

  {
    path: "userNuevo",
    element: <UsuariosNuevo />
  },

  {
    path: "userEdit/:id",
    element: <UsuariosEdit />
  },

  {
    path: "empresa",
    element: <EmpresaLista />
  },
  {
    path: "empresaNueva",
    element: <EmpresaNueva />
  },

  {
    path: "empresaEdit/:id",
    element: <EmpresaEdit />
  }
]

export default routes
