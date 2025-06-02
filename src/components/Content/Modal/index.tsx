import React, { ReactNode } from "react";

// 1. Definir las props que el componente Modal va a aceptar
interface ModalProps {
  children?: ReactNode; // El contenido del modal, ahora es opcional
  title?: string; // Nuevo: Para un título dinámico del modal
  show: boolean; // Nuevo: Para controlar la visibilidad del modal desde el padre
  onClose: () => void; // Nuevo: Función que el padre pasará para cerrar el modal
  onSave?: () => void; // Nuevo: Función opcional para el botón 'Save changes'
}

// 2. Modificar el componente funcional para usar las nuevas props
const Modal: React.FC<ModalProps> = ({
  children = <p>Sin contenido.</p>, // Valor por defecto para children
  title = "Modal", // Valor por defecto para el título
  show, // Desestructuramos la prop 'show'
  onClose, // Desestructuramos la prop 'onClose'
  onSave, // Desestructuramos la prop 'onSave'
}) => {
  // 3. Lógica para controlar las clases CSS y el estilo basado en la prop 'show'
  const modalClassName = `modal fade ${show ? "show d-block" : ""}`;
  const modalStyle: React.CSSProperties = {
    // Usa React.CSSProperties para tipado de estilo
    display: show ? "block" : "none",
    backgroundColor: show ? "rgba(0, 0, 0, 0.5)" : "transparent", // Para el fondo oscurecido
  };

  return (
    // 4. Quitar el 'id' estático y usar las clases y estilos controlados por 'show'
    // También añadir atributos ARIA para accesibilidad
    <div
      className={modalClassName}
      style={modalStyle}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="modalTitle" // Referencia al título para accesibilidad
      aria-hidden={!show} // Oculta si 'show' es false
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            {/* 5. Usar la prop 'title' para el título del modal */}
            <h4 className="modal-title" id="modalTitle">
              {title}
            </h4>
            <button
              type="button"
              className="close"
              onClick={onClose} // 6. Usar onClick de React en lugar de data-dismiss
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            {/* -aqui está el children */}
            {children}
          </div>
          <div className="modal-footer justify-content-between">
            <button
              type="button"
              className="btn btn-default"
              onClick={onClose} // 8. Usar onClick de React en lugar de data-dismiss
            >
              Cerrar
            </button>
            {/* 9. Renderizar el botón de gaurdar solo si se proporciona la prop onSave */}
            {onSave && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSave} // 10. Conecta el onClick con la prop onSave
              >
                Guardar cambios
              </button>
            )}
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
  );
};

export default Modal;
