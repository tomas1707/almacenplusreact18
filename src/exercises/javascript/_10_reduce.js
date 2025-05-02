const arr = [91, 25, 35, 80, 11, 88, 87, 97, 56, 45, 62];

//Reduce recorre el arreglo y suma su contenido apoyado de un acumulador.
//Se puede usar esta función de manera flexible.
const r1 = arr.reduce((acum, n) => acum + n, 0);
console.log(r1);

const getMax = (a, b) => Math.max(a, b);
const r2 = arr.reduce(getMax);
console.log(r2);

const users = [
  { id: 1, name: "Tomas Gonzalez" },
  { id: 2, name: "Alejandra Gomez" },
  { id: 3, name: "Leonardo Robles" },
  { id: 4, name: "Paola Contreras" },
  { id: 5, name: "Felix Barrera" },
  { id: 6, name: "Olga Flores" },
  { id: 7, name: "Mario Sandoval" },
  { id: 8, name: "William Cabrera" },
];

//Hace lo mismo que map, solo que acumula los valores en un string
//est ejemplo tiene un defecto, primero comienza con coma y despues muestra los valores
//del registro.
const r3 = users.reduce(
  //════A═══╦══╦═══R══╦══
  (acumulador, registro) =>
    //╦═════A════╦══╦═══════R══════╦══
    `${acumulador}, ${registro.name}`,
  "INICIO"
);
//console.log(r3);

/*
NOTA: 
    === compara valor y tipo.
    == compara solo valor, e intenta convertir tipos automáticamente
*/

const r4 = users.reduce(
  //════A═══╦══╦═══R══╦══
  (acumulador, registro) =>
    //╦═════════════════════A═══════════════════╦══╦═════R══════╦══
    //╦═════IF═══════════╦═SI═╦═════════════NO══════════════════╦══
    `${acumulador === "" ? "" : `${acumulador}, `}${registro.name}`,
  ""
);
//console.log(r4);

const r5 = users.reduce((acumulador, registro) => {
  let nombre = registro.name;

  if (acumulador === "INICIO") {
    return nombre;
  } else {
    return `${acumulador}, ${nombre}`;
  }
}, "INICIO");
console.log(r5);

const r6 = users.reduce((acumulador, registro) => {
  if (registro.id < 5) {
    return acumulador.concat(registro);
  } else return acumulador;
}, []);

console.log(r6);
