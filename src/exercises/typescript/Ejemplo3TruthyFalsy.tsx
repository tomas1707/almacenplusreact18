import { useState, useEffect } from "react";

function TruthyFalsyDemo3() {
  const productosVacio = useState<string[]>([]);
  const productosNull = useState<string[] | null>(null);
  const [mensajeConElementos, setMensajeConElementos] = useState<string>("");
  const [mensajeVacio, setMensajeVacio] = useState<string>("");
  const [mensajeNull, setMensajeNull] = useState<string>("");
  const productosConElementos = ["manzana", "banana"]; // Ahora es una variable local

  useEffect(() => {
    if (productosConElementos) {
      setMensajeConElementos(`Hay ${productosConElementos.length} productos.`);
    } else {
      setMensajeConElementos("No hay productos (null).");
    }

    if (productosVacio[0]) {
      // Accedemos al valor del estado
      setMensajeVacio(`Hay ${productosVacio[0].length} productos.`);
    } else {
      setMensajeVacio("No hay productos (null).");
    }

    if (productosNull[0]) {
      // Accedemos al valor del estado
      setMensajeNull(`Hay ${productosNull[0]?.length} productos.`);
    } else {
      setMensajeNull("No hay productos (null).");
    }
  }, [productosConElementos, productosVacio[0], productosNull[0]]); // Ajustamos las dependencias

  return (
    <div>
      <h2>Ejemplo 3: Array como Truthy/Falsy</h2>
      <div>
        <p>
          <code>productos</code> (["manzana", "banana"]):{" "}
          <code>[{productosConElementos.join(", ")}]</code>
        </p>
        <p>
          Mensaje: <strong>{mensajeConElementos}</strong>
        </p>
      </div>
      <hr />
      <div>
        <p>
          <code>productos</code> ([] - vacío): <code>[]</code>
        </p>
        <p>
          Mensaje: <strong>{mensajeVacio}</strong>
        </p>
      </div>
      <hr />
      <div>
        <p>
          <code>productos</code> (null): <code>null</code>
        </p>
        <p>
          Mensaje: <strong>{mensajeNull}</strong>
        </p>
      </div>
    </div>
  );
}

export default TruthyFalsyDemo3;
