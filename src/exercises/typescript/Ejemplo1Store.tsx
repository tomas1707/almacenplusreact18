// src/components/Ejemplo1Store.tsx

import React, { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi"; // Para leer los datos
import { useApiStore } from "../../hooks/useApiStore"; // Para C, U, D

// Asumiendo la estructura de tu usuario, ajusta si es necesario
interface Usuario {
  id: number; // El ID es crucial para UPDATE y DELETE
  nombre_completo: string;
  nombre_usuario: string;
  correo_electronico: string;
  contrasennia?: string; // Hacemos la contraseña opcional para evitar enviarla en GET o PUT si no se cambia
  activo: number; // 0 o 1
}

const Ejemplo1Store = () => {
  const apiUrl = "https://profetomas.ultimatetics.com.mx/api/usuario";
  const {
    dataAPI: users,
    error: fetchError,
    loading: fetchLoading,
  } = useApi(apiUrl);

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
    contrasennia: "", // ¡Añadido el campo contrasennia!
    activo: 1, // Por defecto activo
  });
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);

  // Efecto para limpiar el formulario o mostrar mensajes después de una operación
  useEffect(() => {
    if (storeResponse && storeResponse.success) {
      console.log(
        "Operación exitosa:",
        storeResponse.message || storeResponse.data
      );
      alert(
        "Operación exitosa: " + (storeResponse.message || "Registro procesado.")
      );
      setFormData({
        nombre_completo: "",
        nombre_usuario: "",
        correo_electronico: "",
        contrasennia: "", // Limpiar la contraseña también
        activo: 1,
      });
      setEditingUser(null);
      // Para actualizar la lista tras un POST/PUT/DELETE, la mejor práctica
      // es volver a cargar los datos con `useApi` o gestionar el estado localmente.
      // Dado que `useApi` no expone un re-fetcher, una recarga simple (para demo)
      // o una gestión de estado más avanzada sería ideal en un proyecto real.
      // Por ahora, el usuario podría recargar manualmente la página para ver los cambios reflejados.
      // O si se requiere un re-fetch automático:
      // if (fetchRefetch) fetchRefetch(); // Si useApi tuviera una función de re-fetch
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
        // Asegúrate de que tu API de actualización espera el ID en la URL
        // o en el cuerpo. Aquí lo ponemos en la URL por convención REST.
        const updateUrl = `${apiUrl}/${editingUser.id}`;
        // Para actualizar, usualmente no se envía la contraseña a menos que se esté cambiando
        // Aquí enviamos solo los campos que suelen actualizarse
        const dataToSend = {
          nombre_completo: formData.nombre_completo,
          nombre_usuario: formData.nombre_usuario,
          correo_electronico: formData.correo_electronico,
          activo: formData.activo,
          // Si tu API permite actualizar la contraseña vía PUT, incluirla aquí:
          // contrasennia: formData.contrasennia || undefined, // Solo si hay un valor
        };
        await updateRecord(updateUrl, dataToSend as Partial<Usuario>);
      } catch (err) {
        console.error("Error al actualizar:", err);
      }
    } else {
      // Crear nuevo usuario
      try {
        // Para crear, necesitamos todos los campos obligatorios, incluida la contraseña
        await createRecord(apiUrl, formData as Usuario);
      } catch (err) {
        console.error("Error al crear:", err);
      }
    }
  };

  const handleEdit = (user: Usuario) => {
    setEditingUser(user);
    // Para edición, no precargamos la contraseña por seguridad
    setFormData({
      nombre_completo: user.nombre_completo,
      nombre_usuario: user.nombre_usuario,
      correo_electronico: user.correo_electronico,
      activo: user.activo,
      contrasennia: "", // ¡Importante! No se carga la contraseña para editar
    });
  };

  const handleDelete = async (userId: number) => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar el usuario con ID ${userId}?`
      )
    ) {
      try {
        const deleteUrl = `${apiUrl}/${userId}`;
        await deleteRecord(deleteUrl);
      } catch (err) {
        console.error("Error al eliminar:", err);
      }
    }
  };

  return (
    <div>
      <h1>Gestión de Usuarios (CRUD con API Store)</h1>

      {/* Formulario de Creación/Actualización */}
      <h2>{editingUser ? "Editar Usuario" : "Crear Nuevo Usuario"}</h2>
      <form
        onSubmit={handleFormSubmit}
        style={{
          marginBottom: "20px",
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "5px",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label>Nombre Completo:</label>
          <input
            type="text"
            name="nombre_completo"
            value={formData.nombre_completo || ""}
            onChange={handleInputChange}
            required
            style={{
              marginLeft: "10px",
              width: "calc(100% - 120px)",
              padding: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            name="nombre_usuario"
            value={formData.nombre_usuario || ""}
            onChange={handleInputChange}
            required
            style={{
              marginLeft: "10px",
              width: "calc(100% - 120px)",
              padding: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="correo_electronico"
            value={formData.correo_electronico || ""}
            onChange={handleInputChange}
            required
            style={{
              marginLeft: "10px",
              width: "calc(100% - 120px)",
              padding: "5px",
            }}
          />
        </div>
        {/* Campo de Contraseña solo para Crear y opcionalmente para Actualizar */}
        {!editingUser && (
          <div style={{ marginBottom: "10px" }}>
            <label>Contraseña:</label>
            <input
              type="password" // ¡Importante usar type="password"!
              name="contrasennia"
              value={formData.contrasennia || ""}
              onChange={handleInputChange}
              required={!editingUser} // Requerida solo al crear
              style={{
                marginLeft: "10px",
                width: "calc(100% - 120px)",
                padding: "5px",
              }}
            />
          </div>
        )}
        {editingUser && ( // Opción para cambiar contraseña al editar, si tu API lo permite
          <div style={{ marginBottom: "10px" }}>
            <label>Nueva Contraseña (opcional):</label>
            <input
              type="password"
              name="contrasennia"
              value={formData.contrasennia || ""}
              onChange={handleInputChange}
              placeholder="Dejar vacío para no cambiar"
              style={{
                marginLeft: "10px",
                width: "calc(100% - 120px)",
                padding: "5px",
              }}
            />
          </div>
        )}
        <div style={{ marginBottom: "10px" }}>
          <label>Activo:</label>
          <input
            type="checkbox"
            name="activo"
            checked={formData.activo === 1}
            onChange={handleInputChange}
            style={{ marginLeft: "10px" }}
          />
        </div>
        <button type="submit" disabled={storeLoading}>
          {storeLoading
            ? "Procesando..."
            : editingUser
            ? "Guardar Cambios"
            : "Crear Usuario"}
        </button>
        {editingUser && (
          <button
            type="button"
            onClick={() => {
              setEditingUser(null);
              setFormData({
                nombre_completo: "",
                nombre_usuario: "",
                correo_electronico: "",
                contrasennia: "",
                activo: 1,
              });
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancelar Edición
          </button>
        )}
        {storeError && (
          <p style={{ color: "red" }}>Error de operación: {storeError}</p>
        )}
      </form>

      <hr />

      {/* Mostrar usuarios existentes */}
      <h2>Lista de Usuarios</h2>
      {fetchError && (
        <p style={{ color: "red" }}>Error al cargar usuarios: {fetchError}</p>
      )}
      {fetchLoading && <p>Cargando usuarios...</p>}
      {!fetchLoading && !fetchError && users.length > 0 ? (
        <div>
          <table
            border={1}
            cellPadding="10"
            cellSpacing="0"
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
              {users.map(
                (
                  user: Usuario // Asegúrate de que 'user' es tipo Usuario
                ) => (
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
                        style={{ marginRight: "10px" }}
                        onClick={() => handleEdit(user)}
                        disabled={storeLoading}
                      >
                        Actualizar
                      </button>
                      <button
                        style={{ color: "white", backgroundColor: "red" }}
                        onClick={() => handleDelete(user.id)}
                        disabled={storeLoading}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        !fetchLoading && !fetchError && <p>No hay usuarios disponibles.</p>
      )}
    </div>
  );
};

export default Ejemplo1Store;
