interface MessageProps {
  icon?: string;
  children: String;
  lastUpdated?: string;
  isActive?: boolean;
}

const Message: React.FC<MessageProps> = ({
  icon = "envelope",
  children = "sin notificaiones", // Valor por defecto para children
  lastUpdated = "Sin tiempo",
}) => {
  const className = `fas fa-${icon} }`;
  return (
    <>
      <div className="dropdown-divider" />
      <a href="#" className="dropdown-item">
        <i className={className} />
        &nbsp;&nbsp;{children}
        <br />
        <span className="float-right text-muted text-sm">{lastUpdated}</span>
      </a>
    </>
  );
};

export default Message;
