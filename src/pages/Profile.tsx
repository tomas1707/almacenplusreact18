import NavBar from "./../components/NavBar";
import Card from "./../components/Card";
import miImagen1 from "./../assets/images/foto1.jpg";
import miImagen2 from "./../assets/images/foto2.jpg";
import gente1 from "./../assets/images/gente1.jpg";
import Image from "../components/Image";
import Notifications from "./../components/NavBar/Notifications";
import Footer from "./../components/Content/Footer";
import MiFoto from "./../assets/images/tomas.jpg";
import LogoEmpresa from "./../assets/images/almacenlite.png";
import Contenido from "./../components/Content";
import SidebarMenu from "./../components/SideBarMenu";

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
          <table width="100%" border={2}>
            <tr>
              <td>cell1_1</td>
              <td>cell2_1</td>
              <td>cell3_1</td>
              <td>cell4_1</td>
              <td>cell5_1</td>
              <td>cell6_1</td>
            </tr>
            <tr>
              <td>cell1_2</td>
              <td>cell2_2</td>
              <td>cell3_2</td>
              <td>cell4_2</td>
              <td>cell5_2</td>
              <td>cell6_2</td>
            </tr>
            <tr>
              <td>cell1_3</td>
              <td>cell2_3</td>
              <td>cell3_3</td>
              <td>cell4_3</td>
              <td>cell5_3</td>
              <td>cell6_3</td>
            </tr>
            <tr>
              <td>cell1_4</td>
              <td>cell2_4</td>
              <td>cell3_4</td>
              <td>cell4_4</td>
              <td>cell5_4</td>
              <td>cell6_4</td>
            </tr>
            <tr>
              <td>cell1_5</td>
              <td>cell2_5</td>
              <td>cell3_5</td>
              <td>cell4_5</td>
              <td>cell5_5</td>
              <td>cell6_5</td>
            </tr>
            <tr>
              <td>cell1_6</td>
              <td>cell2_6</td>
              <td>cell3_6</td>
              <td>cell4_6</td>
              <td>cell5_6</td>
              <td>cell6_6</td>
            </tr>
          </table>
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

      <Footer annio={2025}> {empresa}</Footer>
    </div>
  );
}

export default Profile;
