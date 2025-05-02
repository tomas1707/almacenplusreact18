const arr = [100, 25, 35, 80, 11, 88, 87, 32, 56, 45, 62];

const f1 = arr.filter((n) => n < 50);
console.log(f1);

const f2 = arr.filter((n, i) => {
  console.log(i, ".- ", n);
  return n < 50;
});

//Ahora el uso de Mapped
const mapped = arr.map((n) => n * 2);
console.log("Arr: ", arr);
console.log("Mapped: ", mapped);

const mappeHTML = arr.map((n) => `<h1>${n}</h1>`);
console.log(mappeHTML);

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

const mappedHTML2 = users.map(
  (registro) => `<div value=${registro.id}> ${registro.name} </div>`
);
console.log(mappedHTML2);
