import {
  Routes,
  Route,
  Outlet,
  Navigate,
  BrowserRouter
} from "react-router-dom";

import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Main from "./pages/Main/Main";

function RotasProtegidas({ redirectTo }) {
  const isAuthenticated = localStorage.getItem("token");
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={redirectTo} />;
  }
}

function RotasSemProtecao() {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to={"/Main"} />;
  } else {
    return <Outlet />;
  }
}

export default function MinhasRotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RotasSemProtecao />}>
          <Route path="/" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Route>
        <Route element={<RotasProtegidas redirectTo={"/"} />}>
          <Route path="/main" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
