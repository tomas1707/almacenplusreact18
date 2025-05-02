//A este concepto se le denomian object destructuring

const persona = {
  nombre: "Juan",
  direccion: {
    calle: "Avenida Libertad Sur ",
    numero: "3-A",
    ciudad: "San Martin Texmelucan",
    entidad: "Puebla",
  },
};

const {
  direccion: { entidad, ciudad },
  nombre,
} = persona;

console.log(nombre);
console.log(ciudad, "-", entidad);
