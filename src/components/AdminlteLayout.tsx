// src/components/AdminlteLayout.tsx
import React, { useEffect } from "react";

// Si tus scripts no son módulos de npm (como parece ser), los cargaremos dinámicamente.
// Necesitas asegurar que los archivos .js (jquery.min.js, bootstrap.bundle.min.js, adminlte.min.js, demo.js)
// estén accesibles en tu carpeta `public` (o la ruta que uses).

const AdminlteLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    const loadScript = (src: string, callback: () => void) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true; // Carga asíncrona
      script.onload = callback; // Ejecuta el callback cuando el script ha cargado
      script.onerror = () => console.error(`Error al cargar el script: ${src}`);
      document.body.appendChild(script);
    };

    // Cadena de carga de scripts para asegurar el orden de dependencia
    loadScript("/plugins/jquery/jquery.min.js", () => {
      loadScript("/plugins/bootstrap/js/bootstrap.bundle.min.js", () => {
        loadScript("/dist/js/adminlte.min.js", () => {
          loadScript("/dist/js/demo.js", () => {
            console.log(
              "Todos los scripts de AdminLTE y demo.js han sido cargados e inicializados."
            );
            // Aquí puedes ejecutar cualquier función de inicialización adicional
            // que AdminLTE o demo.js expongan globalmente si es necesario.
            // Por ejemplo, si demo.js tiene un `window.initDemo()`
            // if ((window as any).initDemo) {
            //   (window as any).initDemo();
            // }
          });
        });
      });
    });

    // Opcional: Función de limpieza para remover los scripts si el componente se desmonta.
    // Esto es más relevante en SPAs donde los componentes se montan y desmontan frecuentemente.
    // Para un layout global, puede no ser estrictamente necesario, pero es buena práctica.
    return () => {
      // Remover los scripts del DOM si es necesario
      const scriptsToRemove = [
        "/plugins/jquery/jquery.min.js",
        "/plugins/bootstrap/js/bootstrap.bundle.min.js",
        "/dist/js/adminlte.min.js",
        "/dist/js/demo.js",
      ];
      scriptsToRemove.forEach((src) => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) script.remove();
      });
    };
  }, []); // El array vacío [] asegura que este efecto se ejecute solo una vez al montar

  return (
    // Aquí puedes colocar la estructura HTML básica de tu plantilla AdminLTE
    // Por ejemplo:
    <div className="wrapper">
      {/* Navbar (si tienes uno) */}
      {/* <nav className="main-header navbar navbar-expand navbar-white navbar-light">...</nav> */}

      {/* Main Sidebar Container (si tienes uno) */}
      {/* <aside className="main-sidebar sidebar-dark-primary elevation-4">...</aside> */}

      {/* Content Wrapper. Contiene el contenido de la página. */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            {/* ... tu encabezado de página si lo tienes ... */}
          </div>
        </div>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {children} {/* Aquí se renderizarán tus componentes de ruta */}
          </div>
        </section>
      </div>

      {/* Control Sidebar (si tienes uno) */}
      {/* <aside className="control-sidebar control-sidebar-dark">...</aside> */}

      {/* Main Footer (si tienes uno) */}
      {/* <footer className="main-footer">...</footer> */}
    </div>
  );
};

export default AdminlteLayout;
