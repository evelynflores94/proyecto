import FuseUtils from "@fuse/utils"
import FuseLoading from "@fuse/core/FuseLoading"
import { Navigate } from "react-router-dom"
import settingsConfig from "app/configs/settingsConfig"
import SignInConfig from "../main/sign-in/SignInConfig"
import SignUpConfig from "../main/sign-up/SignUpConfig"
import SignOutConfig from "../main/sign-out/SignOutConfig"
import Error404Page from "../main/404/Error404Page"
import ExampleConfig from "../main/example/ExampleConfig"
import UsersList from "../main/users/UsersList"
import UserNew from "../main/users/UserNew"
import UserEdit from "../main/users/UserEdit"
import CompanyList from "../main/company/CompanyList"
import EmpresaNueva from "../main/company/EmpresaNueva"
import EmpresaEdit from "../main/company/EmpresaEdit"
import CompanyPlan from "../main/company/CompanyPlan"

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
    element: <UsersList />
  },

  {
    path: "userNew",
    element: <UserNew />
  },

  {
    path: "userEdit/:id",
    element: <UserEdit />
  },

  {
    path: "company",
    element: <CompanyList />,
    children: [
      {
        path: ":id",
        element: <EmpresaEdit />
      }
    ]
  },
  {
    path: "empresaNueva",
    element: <EmpresaNueva />
  },

  {
    path: "empresaEdit/:id",
    element: <EmpresaEdit />
  },
  {
    path: "plan",
    element: <CompanyPlan />
  }
]

export default routes
