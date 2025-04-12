import { BrowserRouter } from "react-router"

import { Loading } from "../components/Loading"

import { AuthRoutes } from "./Authroutes"
import { ManagerRoutes } from "./ManagerRoutes"
import { EmployeeRoutes } from "./EmployeeRoutes"

const isLoading = false

const session = {
  user: {
    role: "manager",
  }
}

export function Routes(){
    function Route(){
      switch (session.user.role) {
        case "employee":
          return <EmployeeRoutes />
        case "manager":
          return <ManagerRoutes />
        default: 
          return <AuthRoutes />
      }
    }

    if(isLoading) {
      return <Loading />
    }
    return (
        <BrowserRouter>
          <Route />
        </BrowserRouter>
    )
}