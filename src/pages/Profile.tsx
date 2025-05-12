import NavBar from "./../components/NavBar";
import Card from "../components/Content/Card";
import miImagen1 from "./../assets/images/foto1.jpg";
import miImagen2 from "./../assets/images/foto2.jpg";
import fotogupal from "./../assets/images/grupo.jpg";
import gente1 from "./../assets/images/gente1.jpg";
import Image from "../components/Content/Image";
import Notifications from "./../components/NavBar/Notifications";
import Footer from "./../components/Content/Footer";
import MiFoto from "./../assets/images/tomas.jpg";
import LogoEmpresa from "./../assets/images/almacenlite.png";
import Contenido from "./../components/Content";
import SidebarMenu from "./../components/SideBarMenu";
import Table from "./../components/Content/Table";

function Profile() {
  const usuario = "Tomas Gonzalez";
  const empresa = "Almacen Plus";

  const handleLogout = () => {
    console.log("Cerrar Sesión Clicked");
    // Aquí iría tu lógica de cierre de sesión
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
        nombreUsuario={usuario}
        menuItems={menuDelSistema}
        onLogout={handleLogout}
      />

      <Contenido titulo="Perfil de Usuario">
        <div className="col-sm-12">
          <Table titulo="lista de proveedores"></Table>
        </div>

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
      </Contenido>

      <Footer annio={2025}> {empresa} </Footer>
    </div>
  );
}

export default Profile;
