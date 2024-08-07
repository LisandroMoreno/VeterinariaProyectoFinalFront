import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import NavbarC from "../components/NavbarC";
import FooterC from "../components/FooterC";
import LoginPage from "../pages/LoginPage";
import SobreNosotros from "../pages/SobreNosotros";
import DetalleProducto from "../pages/DetalleProducto";
import Error404 from "../pages/Error404";
import PlanesPage from "../pages/PlanesPage";
import Contacto from "../pages/Contacto";
import DetalleCarrito from "../pages/DetalleCarrito";
import AdminPage from "../pages/AdminPage";
import DetalleFavorito from "../pages/DetalleFavorito";
import AdminProductsPage from "../pages/AdminProductPage";
import ProfesionalesPage from "../pages/ProfesionalesPage";
import AdminUsersPage from "../pages/AdminUsersPage";
import PrivateRoute from "../components/PrivateRoute";
import CrearTurno from "../pages/CrearTurno";
import DetalleMisReservas from "../pages/DetalleMisReservas";
import MisDatosPage from "../pages/MisDatosPage";
import AdminTurnos from "../pages/AdminTurnos";
import AdminPageComentarios from "../pages/AdminPageComentarios";
import AdminProfesionales from "../pages/AdminProfesionales";
import AdminPagePacientes from "../pages/AdminPagePacientes";

const RoutesViews = () => {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/planes" element={<PlanesPage />} />
        <Route path="/profesionales" element={<ProfesionalesPage />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route
          path="/detalleCarrito"
          element={
            <PrivateRoute role={"user"}>
              <DetalleCarrito />
            </PrivateRoute>
          }
        />

        <Route
          path="/detalleFavorito"
          element={
            <PrivateRoute role={"user"}>
              <DetalleFavorito />
            </PrivateRoute>
          }
        />

        <Route
          path="/home-adminLog"
          element={
            <PrivateRoute role={"admin"}>
              <AdminPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/productos"
          element={
            <PrivateRoute role={"admin"}>
              <AdminProductsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/usuarios"
          element={
            <PrivateRoute role={"admin"}>
              <AdminUsersPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Error404 />} />
        <Route
          path="/turnos"
          element={
            <PrivateRoute role={"user"}>
              <CrearTurno />
            </PrivateRoute>
          }
        />
        <Route
          path="/misReservas"
          element={
            <PrivateRoute role={"user"}>
              <DetalleMisReservas />
            </PrivateRoute>
          }
        />
        <Route
          path="/misDatos"
          element={
            <PrivateRoute role={"user"}>
              <MisDatosPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminTurnos"
          element={
            <PrivateRoute role={"admin"}>
              <AdminTurnos />
            </PrivateRoute>
          }
        />

        <Route
          path="/comentariosPendientes"
          element={
            <PrivateRoute role={"admin"}>
              {" "}
              <AdminPageComentarios />
            </PrivateRoute>
          }
        />

        <Route
          path="/profesionalesAdmin"
          element={
            <PrivateRoute role={"admin"}>
              <AdminProfesionales />
            </PrivateRoute>
          }
        />

        <Route
          path="/adminPacientes"
          element={
            <PrivateRoute role={"admin"}>
              <AdminPagePacientes />
            </PrivateRoute>
          }
        />
      </Routes>
      <FooterC />
    </>
  );
};

export default RoutesViews;
