import React, { useState, useEffect, useCallback } from "react";
import NavBar from "./../components/NavBar";
import Notifications from "./../components/NavBar/Notifications";
import Footer from "./../components/Content/Footer";
import MiFoto from "./../assets/images/tomas.jpg";
import LogoEmpresa from "./../assets/images/almacenlite.png";
import Contenido from "./../components/Content";
import SidebarMenu from "./../components/SideBarMenu";
import Modal from "./../components/Content/Modal";

// Importar los hooks de API
import { useApi } from "../hooks/useApi";
import { useApiStore } from "../hooks/useApiStore";

// Definir la interfaz de Usuario
interface Usuario {
  id: number;
  nombre_completo: string;
  nombre_usuario: string;
  correo_electronico: string;
  contrasennia?: string;
  activo: number;
}

function Usuarios() {
  const usuarioApp = "Tomas Gonzalez";
  const empresa = "Almacen Plus";

  // --- Lógica del CRUD de Usuarios ---
  const apiUrl = "https://profetomas.ultimatetics.com.mx/api/usuario";

  // Usamos useApi solo para la carga inicial
  const {
    dataAPI: initialUsers, // Renombramos para claridad
    error: fetchError,
    loading: fetchLoading,
  } = useApi<Usuario[]>(apiUrl);

  // Mantenemos el estado de los usuarios directamente en este componente
  const [users, setUsers] = useState<Usuario[] | null>(null);

  // Sincronizamos los usuarios iniciales con el estado local una vez que se cargan
  useEffect(() => {
    if (initialUsers) {
      setUsers(initialUsers);
    }
  }, [initialUsers]);

  const {
    loading: storeLoading,
    error: storeError,
    response: storeResponse,
    createRecord,
    updateRecord,
    deleteRecord,
  } = useApiStore();

  const [formData, setFormData] = useState<Partial<Usuario>>({
    nombre_completo: "",
    nombre_usuario: "",
    correo_electronico: "",
    contrasennia: "",
    activo: 1,
  });
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // --- Estados para la paginación ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Puedes ajustar esto al número de elementos por página que desees

  // Calcular los usuarios a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users
    ? users.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  // Calcular el número total de páginas
  const totalPages = users ? Math.ceil(users.length / itemsPerPage) : 0;

  // Función para cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Efecto para limpiar el formulario y cerrar el modal después de una operación exitosa
  useEffect(() => {
    if (storeResponse && storeResponse.success) {
      alert(
        "Operación exitosa: " + (storeResponse.message || "Registro procesado.")
      );
      setFormData({
        nombre_completo: "",
        nombre_usuario: "",
        correo_electronico: "",
        contrasennia: "",
        activo: 1,
      });
      setEditingUser(null);
      setShowUserModal(false);

      // NO LLAMAMOS A refetch() AQUÍ. Las operaciones CRUD modificarán el estado 'users' directamente.
    }
  }, [storeResponse]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      // Actualizar usuario existente
      try {
        const updateUrl = `${apiUrl}/${editingUser.id}`;
        const dataToSend: Partial<Usuario> = {
          nombre_completo: formData.nombre_completo,
          nombre_usuario: formData.nombre_usuario,
          correo_electronico: formData.correo_electronico,
          activo: formData.activo,
        };
        if (formData.contrasennia && formData.contrasennia !== "") {
          dataToSend.contrasennia = formData.contrasennia;
        }
        const response = await updateRecord(updateUrl, dataToSend);
        if (response && response.success && users) {
          // Actualizamos el usuario en el estado local
          setUsers(
            users.map((user) =>
              user.id === editingUser.id
                ? { ...user, ...dataToSend, contrasennia: undefined } // Eliminamos la contraseña del estado local
                : user
            )
          );
        }
      } catch (err) {
        console.error("Error al actualizar:", err);
      }
    } else {
      // Crear nuevo usuario
      try {
        if (!formData.contrasennia) {
          alert("La contraseña es requerida para crear un nuevo usuario.");
          return;
        }
        const response = await createRecord(apiUrl, formData as Usuario);
        if (response && response.success && users) {
          // Asumiendo que la API devuelve el nuevo registro con su ID
          // Si no, necesitarías refetchear o asumir un ID temporal.
          // Para este ejemplo, simularemos el ID asignado por el backend
          const newId =
            response.data?.id ||
            (users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1);
          setUsers([
            ...users,
            { ...formData, id: newId, activo: formData.activo || 1 } as Usuario,
          ]);
        } else if (response && response.success && !users) {
          // Caso inicial sin usuarios, agregamos el primero
          const newId = response.data?.id || 1;
          setUsers([
            { ...formData, id: newId, activo: formData.activo || 1 } as Usuario,
          ]);
        }
      } catch (err) {
        console.error("Error al crear:", err);
      }
    }
  };

  const handleEdit = (user: Usuario) => {
    setEditingUser(user);
    setFormData({
      nombre_completo: user.nombre_completo,
      nombre_usuario: user.nombre_usuario,
      correo_electronico: user.correo_electronico,
      activo: user.activo,
      contrasennia: "",
    });
    setShowUserModal(true);
  };

  const handleDelete = async (userId: number) => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar el usuario con ID ${userId}?`
      )
    ) {
      try {
        const deleteUrl = `${apiUrl}/${userId}`;
        const response = await deleteRecord(deleteUrl);
        if (response && response.success && users) {
          // Filtramos el usuario eliminado del estado local
          setUsers(users.filter((user) => user.id !== userId));
          // Aseguramos que la paginación se ajuste si se eliminó el último elemento de una página
          if (currentUsers.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        }
      } catch (err) {
        console.error("Error al eliminar:", err);
      }
    }
  };

  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setFormData({
      nombre_completo: "",
      nombre_usuario: "",
      correo_electronico: "",
      contrasennia: "",
      activo: 1,
    });
    setShowUserModal(true);
  };
  // --- Fin Lógica del CRUD de Usuarios ---

  const handleLogout = () => {
    console.log("Cerrar Sesión Clicked");
  };

  const menuDelSistema = [
    { header: "DASHBOARD" },
    { href: "/graficas", icon: "chart-pie", label: "Gráficas" },
    { href: "/indicadores", icon: "tachometer-alt", label: "Indicadores" },
    { header: "PROFILE" },
    {
      href: "/profile",
      icon: "user",
      label: "Perfil de Usuario",
      isActive: true,
    },
    { href: "/usaurios", icon: "users-cog", label: "Usuarios" },
    { header: "ERP" },
    { href: "/proveedores", icon: "truck", label: "Proveedores" },
    { href: "/productos", icon: "shopping-bag", label: "Productos" },
    { href: "/inventario", icon: "warehouse", label: "Inventario" },
    { href: "/compras", icon: "shopping-cart", label: "Compras" },
    { href: "/clientes", icon: "id-card", label: "Clientes" },
    { href: "/pedidos", icon: "clipboard-list", label: "Pedidos" },
  ];

  return (
    <div className="wrapper">
      <NavBar>
        <Notifications href="https://www.google.com" total={8} />
      </NavBar>

      <SidebarMenu
        logoEmpresa={LogoEmpresa}
        nombreEmpresa={empresa}
        fotoUsuario={MiFoto}
        nombreUsuario={usuarioApp}
        menuItems={menuDelSistema}
        onLogout={handleLogout}
      />

      <Contenido titulo="Gestión de Usuarios">
        <div className="col-sm-12">
          <button
            type="button"
            className="btn btn-info mt-3 mb-3"
            onClick={handleOpenCreateModal}
          >
            Insertar Usuario
          </button>

          <h2>Lista de Usuarios</h2>
          {fetchError && (
            <p style={{ color: "red" }}>
              Error al cargar usuarios: {fetchError}
            </p>
          )}
          {fetchLoading && <p>Cargando usuarios...</p>}
          {!fetchLoading && !fetchError && users && users.length > 0 ? (
            <>
              <table
                border={1}
                cellPadding="10"
                cellSpacing="0"
                className="table table-bordered table-striped"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#f2f2f2" }}>
                    <th>ID</th>
                    <th>Nombre Completo</th>
                    <th>Nombre de Usuario</th>
                    <th>Correo Electrónico</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user: Usuario) => (
                    <tr key={user.id}>
                      <td style={{ color: "red", fontWeight: "bold" }}>
                        {user.id}
                      </td>
                      <td>{user.nombre_completo}</td>
                      <td>{user.nombre_usuario}</td>
                      <td>{user.correo_electronico}</td>
                      <td>{user.activo === 1 ? "Activo" : "Inactivo"}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary mr-2"
                          onClick={() => handleEdit(user)}
                          disabled={storeLoading}
                        >
                          Actualizar
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(user.id)}
                          disabled={storeLoading}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Controles de Paginación */}
              <nav aria-label="Page navigation" className="mt-3">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Anterior
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i + 1}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Siguiente
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          ) : (
            !fetchLoading && !fetchError && <p>No hay usuarios disponibles.</p>
          )}
        </div>

        {/* Las Card e Image componentes se mantienen si no interactúan con el CRUD */}
        {/*
        <div className="col-sm-6">
          <Card
            imageUrl={miImagen1}
            title="Título de la primera tarjeta"
            lastUpdated="Ayer"
          >
            Este es el texto de la primera tarjeta.
            <br />
            Puede contener múltiples líneas y otros elementos.
          </Card>
          <Card
            imageUrl={miImagen2}
            title="Título de la segunda tarjeta"
            lastUpdated="Hace 5 minutos"
          >
            Este es el texto de la segunda tarjeta.
            <br />
            Puede contener mas líneas y otros elementos.
          </Card>
          <Card
            imageUrl={fotogupal}
            title="Título de la segunda tarjeta"
            lastUpdated="Hace 5 minutos"
          >
            Este es el texto de la segunda tarjeta.
            <br />
            Puede contener mas líneas y otros elementos.
          </Card>
        </div>

        <div className="col-sm-6">
          <div className="row">
            <div className="col-sm-6">
              <Image alt="Mi Imagen" imageUrl={gente1} width="180px" />
              <Image alt="Mi Imagen" imageUrl={gente1} width="250px" />
            </div>
            <div className="col-sm-6">
              <Image alt="Mi Imagen" imageUrl={gente1} width="120px" />
              <Image alt="Mi Imagen" imageUrl={gente1} width="80px" />
            </div>
          </div>
        </div>
        */}
      </Contenido>

      <Modal
        show={showUserModal}
        onClose={() => {
          setShowUserModal(false);
          setEditingUser(null);
          setFormData({
            nombre_completo: "",
            nombre_usuario: "",
            correo_electronico: "",
            contrasennia: "",
            activo: 1,
          });
        }}
        onSave={handleFormSubmit}
        title={editingUser ? "Editar Usuario" : "Crear Nuevo Usuario"}
      >
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="nombre_completo">Nombre Completo:</label>
            <input
              type="text"
              name="nombre_completo"
              className="form-control"
              id="nombre_completo"
              value={formData.nombre_completo || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre_usuario">Nombre de Usuario:</label>
            <input
              type="text"
              name="nombre_usuario"
              className="form-control"
              id="nombre_usuario"
              value={formData.nombre_usuario || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo_electronico">Correo Electrónico:</label>
            <input
              type="email"
              name="correo_electronico"
              className="form-control"
              id="correo_electronico"
              value={formData.correo_electronico || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          {!editingUser && (
            <div className="form-group">
              <label htmlFor="contrasennia">Contraseña:</label>
              <input
                type="password"
                name="contrasennia"
                className="form-control"
                id="contrasennia"
                value={formData.contrasennia || ""}
                onChange={handleInputChange}
                required={!editingUser}
              />
            </div>
          )}
          {editingUser && (
            <div className="form-group">
              <label htmlFor="nueva_contrasennia">
                Nueva Contraseña (opcional):
              </label>
              <input
                type="password"
                name="contrasennia"
                className="form-control"
                id="nueva_contrasennia"
                value={formData.contrasennia || ""}
                onChange={handleInputChange}
                placeholder="Dejar vacío para no cambiar"
              />
            </div>
          )}
          <div className="form-group form-check">
            <input
              type="checkbox"
              name="activo"
              className="form-check-input"
              id="activo"
              checked={formData.activo === 1}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="activo">
              Activo
            </label>
          </div>
          {storeError && (
            <p style={{ color: "red" }}>Error de operación: {storeError}</p>
          )}
        </form>
      </Modal>

      <Footer annio={2025}> {empresa} </Footer>
    </div>
  );
}

export default Usuarios;
