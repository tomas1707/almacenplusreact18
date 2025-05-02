import { useState, useEffect } from "react";

function TruthyFalsyDemo2() {
  const [nombreUsuarioUndefined] = useState<string | undefined>(undefined);
  const [nombreUsuarioCarlos] = useState<string | undefined>("Carlos");
  const nombrePorDefecto = "Invitado";
  const [nombreAMostrarUndefined, setNombreAMostrarUndefined] =
    useState<string>("");
  const [nombreAMostrarCarlos, setNombreAMostrarCarlos] = useState<string>("");

  useEffect(() => {
    setNombreAMostrarUndefined(nombreUsuarioUndefined || nombrePorDefecto);
    setNombreAMostrarCarlos(nombreUsuarioCarlos || nombrePorDefecto);
  }, [nombreUsuarioUndefined, nombreUsuarioCarlos]);

  return (
    <div>
      <h2>Ejemplo 2: Operador Lógico OR (`||`)</h2>
      <div>
        <p>
          <code>nombreUsuario</code> (undefined):{" "}
          <code>
            {nombreUsuarioUndefined === undefined
              ? "undefined"
              : nombreUsuarioUndefined}
          </code>
        </p>
        <p>
          <code>nombrePorDefecto</code>: <code>{nombrePorDefecto}</code>
        </p>
        <p>
          <code>nombreAMostrar</code> (
          <code>nombreUsuario || nombrePorDefecto</code>):{" "}
          <strong>{nombreAMostrarUndefined}</strong>
        </p>
      </div>
      <hr />
      <div>
        <p>
          <code>nombreUsuario</code> ("Carlos"):{" "}
          <code>{nombreUsuarioCarlos}</code>
        </p>
        <p>
          <code>nombrePorDefecto</code>: <code>{nombrePorDefecto}</code>
        </p>
        <p>
          <code>otroNombreAMostrar</code> (
          <code>nombreUsuario || nombrePorDefecto</code>):{" "}
          <strong>{nombreAMostrarCarlos}</strong>
        </p>
      </div>
    </div>
  );
}

export default TruthyFalsyDemo2;
