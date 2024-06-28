import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import clienteAxios, { config, configImg } from "../helpers/clienteAxios";
import { titlePage } from "../helpers/titlePages";
import Swal from "sweetalert2";
import TablaC from "../components/TablaC";
import { Button, Modal } from "react-bootstrap";

const AdminProfesionalesPage = () => {
  titlePage("Lista de Profesionales");
  const [profesionales, setProfesionales] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editProf, setEditProf] = useState({
    _id: "",
    nombre: "",
    especialidad: "",
    descripcion: "",
    horario: [],
  });
  const [image, setImage] = useState(null);
  const [newProf, setNewProf] = useState({
    nombre: "",
    especialidad: "",
    descripcion: "",
    horario: [],
    image: "",
  });

  const editProfesional = (profesional) => {
    setEditProf(profesional);
    setShowEditModal(true);
  };

  const handleChangeImage = (ev) => {
    setImage(ev.target.files[0]);
  };

  const handleChangeNewImage = (ev) => {
    setNewProf({ ...newProf, image: ev.target.files[0] });
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre es obligatorio")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(100, "El nombre no debe exceder los 100 caracteres"),
    especialidad: Yup.string()
      .required("La especialidad es obligatoria")
      .min(3, "La especialidad debe tener al menos 3 caracteres")
      .max(100, "La especialidad no debe exceder los 100 caracteres"),
    descripcion: Yup.string()
      .required("La descripción es obligatoria")
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .max(500, "La descripción no debe exceder los 500 caracteres"),
    horario: Yup.array().of(
      Yup.object().shape({
        dia: Yup.string().required("El día es obligatorio"),
        inicio: Yup.string().required("La hora de inicio es obligatoria"),
        fin: Yup.string().required("La hora de fin es obligatoria"),
      })
    ),
    image: Yup.mixed().nullable(),
  });

  const handleClickEdit = async (values, { setSubmitting }) => {
    try {
      const updateProf = await clienteAxios.put(
        `/profesionales/${editProf._id}`,
        {
          nombre: values.nombre,
          especialidad: values.especialidad,
          descripcion: values.descripcion,
          horario: values.horario,
        },
        config
      );
      if (updateProf.status === 200 && image) {
        const formData = new FormData();
        formData.append("image", image);

        const addImageProfesional = await clienteAxios.post(
          `/profesionales/addImage/${updateProf.data.actualizarProf._id}`,
          formData,
          configImg
        );

        if (addImageProfesional.status === 200) {
          handleCloseEditModal();
          Swal.fire({
            title: "Profesional actualizado. IMAGEN",
            icon: "success",
          }).then(() => {
            setTimeout(() => {
              location.reload();
            }, 1000);
          });
        }
      } else {
        handleCloseEditModal();
        Swal.fire({
          title: "Profesional actualizado. SIN IMAGEN",
          icon: "success",
        }).then(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error al actualizar el profesional",
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateProf = async (values, { setSubmitting }) => {
    try {
      const createProfRes = await clienteAxios.post(
        "/profesionales",
        {
          nombre: values.nombre,
          especialidad: values.especialidad,
          descripcion: values.descripcion,
          horario: values.horario,
        },
        config
      );

      const profesionalId = createProfRes.data.profesionalGuardado?._id;

      if (!profesionalId) {
        throw new Error("No se pudo obtener el ID del profesional");
      }

      if (createProfRes.status === 201 && newProf.image) {
        const formData = new FormData();
        formData.append("image", newProf.image);

        const addImageProfesional = await clienteAxios.post(
          `/profesionales/addImage/${profesionalId}`,
          formData,
          configImg
        );

        if (addImageProfesional.status === 200) {
          handleCloseCreateModal();
          Swal.fire({
            title: "Profesional creado. IMAGEN",
            icon: "success",
          }).then(() => {
            setTimeout(() => {
              location.reload();
            }, 1000);
          });
        }
      } else {
        handleCloseCreateModal();
        Swal.fire({
          title: "Profesional creado. SIN IMAGEN",
          icon: "success",
        }).then(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error al crear el profesional",
        text: error.message,
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getProfesionalesAdmin = async () => {
    const allProfesionales = await clienteAxios.get("/profesionales");
    setProfesionales(allProfesionales.data);
  };

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleClickDel = async (idProf) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro que quieres eliminar este profesional?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const delProf = await clienteAxios.delete(
          `/profesionales/${idProf}`,
          config
        );
        if (delProf.status === 200) {
          handleCloseEditModal();
          Swal.fire({
            title: "Profesional eliminado",
            icon: "success",
          }).then(() => {
            setTimeout(() => {
              location.reload();
            }, 1000);
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error al eliminar el profesional",
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
    }
  };

  const columns = [
    { key: "_id", header: "ID" },
    { key: "nombre", header: "Nombre" },
    { key: "especialidad", header: "Especialidad" },
    {
      key: "image",
      header: "Imagen",
      render: (row) => <img src={row.image} alt="" width={25} />,
    },
  ];

  useEffect(() => {
    getProfesionalesAdmin();
  }, []);

  return (
    <>
      <h2 className="mt-4 text-center">Administracion de Profesionales</h2>
      <div className="d-flex justify-content-center ">
        <Button variant="success" onClick={() => setShowCreateModal(true)}>
          Crear Profesional
        </Button>
      </div>
      <div className="d-flex justify-content-center">
        <div className="table-responsive w-100 mt-3">
          <TablaC
            columns={columns}
            data={profesionales}
            handleEdit={editProfesional}
            handleDelete={handleClickDel}
          />
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Profesional</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={editProf}
            validationSchema={validationSchema}
            onSubmit={handleClickEdit}>
            {({ isSubmitting, errors, touched, values }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <Field
                    type="text"
                    name="nombre"
                    className={`form-control ${
                      touched.nombre && errors.nombre ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="especialidad" className="form-label">
                    Especialidad
                  </label>
                  <Field
                    type="text"
                    name="especialidad"
                    className={`form-control ${
                      touched.especialidad && errors.especialidad
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="especialidad"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">
                    Descripción
                  </label>
                  <Field
                    as="textarea"
                    name="descripcion"
                    className={`form-control ${
                      touched.descripcion && errors.descripcion
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="descripcion"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="horario" className="form-label">
                    Horario
                  </label>
                  <FieldArray name="horario">
                    {({ push, remove }) => (
                      <div>
                        {values.horario.length > 0 &&
                          values.horario.map((horario, index) => (
                            <div key={index} className="d-flex mb-2">
                              <Field
                                name={`horario[${index}].dia`}
                                className="form-control me-2"
                                placeholder="Día"
                              />
                              <Field
                                name={`horario[${index}].inicio`}
                                className="form-control me-2"
                                placeholder="Inicio"
                              />
                              <Field
                                name={`horario[${index}].fin`}
                                className="form-control me-2"
                                placeholder="Fin"
                              />
                              <Button
                                variant="danger"
                                onClick={() => remove(index)}>
                                Eliminar
                              </Button>
                            </div>
                          ))}
                        <Button
                          variant="success"
                          onClick={() =>
                            push({ dia: "", inicio: "", fin: "" })
                          }>
                          Agregar Horario
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                  <ErrorMessage
                    name="horario"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Imagen
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleChangeImage}
                    className="form-control"
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="d-flex justify-content-center">
                  <Button
                    variant="success"
                    type="submit"
                    disabled={isSubmitting}>
                    Guardar Cambios
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Profesional</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={newProf}
            validationSchema={validationSchema}
            onSubmit={handleCreateProf}>
            {({ isSubmitting, errors, touched, values }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <Field
                    type="text"
                    name="nombre"
                    className={`form-control ${
                      touched.nombre && errors.nombre ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="especialidad" className="form-label">
                    Especialidad
                  </label>
                  <Field
                    type="text"
                    name="especialidad"
                    className={`form-control ${
                      touched.especialidad && errors.especialidad
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="especialidad"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">
                    Descripción
                  </label>
                  <Field
                    as="textarea"
                    name="descripcion"
                    className={`form-control ${
                      touched.descripcion && errors.descripcion
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="descripcion"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="horario" className="form-label">
                    Horario
                  </label>
                  <FieldArray name="horario">
                    {({ push, remove }) => (
                      <div>
                        {values.horario.length > 0 &&
                          values.horario.map((horario, index) => (
                            <div key={index} className="d-flex mb-2">
                              <Field
                                name={`horario[${index}].dia`}
                                className="form-control me-2"
                                placeholder="Día"
                              />
                              <Field
                                name={`horario[${index}].inicio`}
                                className="form-control me-2"
                                placeholder="Inicio"
                              />
                              <Field
                                name={`horario[${index}].fin`}
                                className="form-control me-2"
                                placeholder="Fin"
                              />
                              <Button
                                variant="danger"
                                onClick={() => remove(index)}>
                                Eliminar
                              </Button>
                            </div>
                          ))}
                        <Button
                          variant="success"
                          onClick={() =>
                            push({ dia: "", inicio: "", fin: "" })
                          }>
                          Agregar Horario
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                  <ErrorMessage
                    name="horario"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Imagen
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleChangeNewImage}
                    className="form-control"
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="d-flex justify-content-center">
                  <Button
                    variant="success"
                    type="submit"
                    disabled={isSubmitting}>
                    Crear Profesional
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminProfesionalesPage;