import { useEffect } from "react";

function TruthyFalsyDemo() {
  useEffect(() => {
    console.log("--- Ejemplo 1 (Cadena) ---");
    let mensaje: string | null = "Hola";
    if (mensaje) {
      console.log(`El mensaje es: ${mensaje}`);
    } else {
      console.log("No hay mensaje.");
    }
    mensaje = "";
    if (mensaje) {
      console.log(`El mensaje es: ${mensaje}`);
    } else {
      console.log("No hay mensaje (cadena vacía).");
    }
    mensaje = null;
    if (mensaje) {
      console.log(`El mensaje es: ${mensaje}`);
    } else {
      console.log("No hay mensaje (null).");
    }

    console.log("\n--- Ejemplo 2 (OR Lógico) ---");
    let nombreUsuario: string | undefined;
    const nombrePorDefecto = "Invitado";
    const nombreAMostrar = nombreUsuario || nombrePorDefecto;
    console.log(`Nombre a mostrar: ${nombreAMostrar}`);
    nombreUsuario = "Carlos";
    const otroNombreAMostrar = nombreUsuario || nombrePorDefecto;
    console.log(`Otro nombre a mostrar: ${otroNombreAMostrar}`);

    console.log("\n--- Ejemplo 3 (Array) ---");
    let productos: string[] = ["manzana", "banana"];
    if (productos) {
      console.log(`Hay ${productos.length} productos.`);
    } else {
      console.log("No hay productos.");
    }
    productos = [];
    if (productos) {
      console.log(`Hay ${productos.length} productos.`);
    } else {
      console.log("No hay productos.");
    }
    productos = [];
    if (productos) {
      console.log(`Hay ${productos.length} productos.`);
    } else {
      console.log("No hay productos (null).");
    }
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  return (
    <div>
      <h1>Ejemplos Truthy y Falsy (Ver Consola)</h1>
      <p>Abre la consola del navegador para ver la salida de los ejemplos.</p>
    </div>
  );
}

export default TruthyFalsyDemo;
