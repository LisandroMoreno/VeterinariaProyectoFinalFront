import React from "react";
import PropTypes from "prop-types";
import { Table, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const TablaC = ({
  columns,
  data,
  handleDelete,
  handleEdit,
  handleClickStatus,
  getRoleLabel,
}) => {
  const location = useLocation();
  const isProductosPage = location.pathname === "/productos";
  const isAdminTurnosPage = location.pathname === "/AdminTurnos";
  const isAdminUsersPage = location.pathname === "/usuarios";
  const isAdminProfesionalesPage = location.pathname === "/profesionalesAdmin";
  const isAdminAdminPacientes = location.pathname === "/adminPacientes";
  const renderColumns = () => (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.key}>{column.header}</th>
        ))}
        <th>Acciones</th>
      </tr>
    </thead>
  );

  const renderRows = () => (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={row._id || rowIndex} className="align-middle">
          {columns.map((column) => (
            <td key={column.key}>
              {column.key === "role"
                ? getRoleLabel(row[column.key])
                : column.render
                ? column.render(row)
                : row[column.key]}
            </td>
          ))}
          {(isProductosPage ||
            isAdminTurnosPage ||
            isAdminUsersPage ||
            isAdminProfesionalesPage ||
            isAdminAdminPacientes) && (
            <td className="align-middle">
              {isProductosPage && (
                <>
                  <Button variant="warning" onClick={() => handleEdit(row)}>
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(row._id)}
                    className="ms-2">
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </>
              )}
              {isAdminTurnosPage && (
                <Button variant="danger" onClick={() => handleDelete(row._id)}>
                  <i className="fa-solid fa-trash"></i>
                </Button>
              )}
              {isAdminUsersPage && (
                <>
                  <Button variant="warning" onClick={() => handleEdit(row)}>
                    Editar
                  </Button>
                  <Button
                    className="mx-2"
                    variant={row.deleted ? "success" : "dark"}
                    onClick={() => handleClickStatus(row._id)}
                    disabled={row.role === "admin" && true}>
                    {row.deleted ? "Habilitar" : "Deshabilitar"}
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => handleDelete(row._id)}
                    disabled={row.role === "admin" && true}>
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </>
              )}
              {isAdminProfesionalesPage && (
                <>
                  <Button variant="warning" onClick={() => handleEdit(row)}>
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(row._id)}
                    className="ms-2">
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </>
              )}
              {isAdminAdminPacientes && (
                <>
                  <Button variant="warning" onClick={() => handleEdit(row)}>
                    Editar
                  </Button>
                </>
              )}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );

  return (
    <div>
      {(isProductosPage ||
        isAdminTurnosPage ||
        isAdminUsersPage ||
        isAdminProfesionalesPage ||
        isAdminAdminPacientes) && (
        <Table striped bordered hover className="text-center">
          {renderColumns()}
          {renderRows()}
        </Table>
      )}
    </div>
  );
};

TablaC.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  handleClickStatus: PropTypes.func,
  getRoleLabel: PropTypes.func,
};

export default TablaC;
