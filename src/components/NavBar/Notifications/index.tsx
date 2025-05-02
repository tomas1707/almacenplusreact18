import Message from "./Message";

interface NotificationsProps {
  href: string;
  total: number;
}

const Notifications: React.FC<NotificationsProps> = ({
  href = "#",
  total = 0,
}) => {
  return (
    <>
      <li className="nav-item dropdown">
        {/* Notifications Dropdown Menu */}
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="far fa-bell" />
          <span className="badge badge-warning navbar-badge">{total}</span>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          {/* Total de notificaciones */}
          <span className="dropdown-item dropdown-header">
            {total} Notificaciones
          </span>
          {/* Mensajes */}

          <Message icon="envelope" lastUpdated="5 días">
            4 Notificaciones
          </Message>
          <Message icon="users" lastUpdated="2 días">
            2 Mensajes
          </Message>
          <Message icon="file" lastUpdated="2 horas">
            2 Reportes
          </Message>

          {/* Enlace ver mas notificaicones */}
          <div className="dropdown-divider" />
          <a href={href} className="dropdown-item dropdown-footer">
            Ver todas las notificaciones
          </a>
        </div>
      </li>
    </>
  );
};

export default Notifications;
