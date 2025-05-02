//*********************
//***Spread Operator***
//*********************

//**************************************
//Spread Operator para pasar argumentos.
//NOTA: a,b,c son parámetros
const fn = (a, b, c) => console.log(a + b + c);
const arr = [10, 50, 82];
//El Spread operator, permite tomaer los valores de un arreglo o un objeto
// y esparcirlos depeniendo del contexto

//NOTA: Los valores del arreglo son argumentos
//Pasando argumentos de forma clásica
fn(arr[0], arr[1], arr[2]);
//Pasando argumentos de usando Spread Operator
fn(...arr);

//**************************************
//Spread Operator para concatenar un arreglo
const arreglo1 = [10, 20, 30];
const arreglo2 = [40, 50, 60];

//Para concatenar ambos arreglos se puede usar la forma clásica
const arreglo3 = arreglo1.concat(arreglo2);
console.log("Arreglo 3: ", arreglo3);

//concatenando arreglo usando Spread Operator
const arreglo4 = [...arreglo1, ...arreglo2];
console.log("Arreglo 4: ", arreglo4);

//Agregando mas elementos al arreglo 4
const arreglo5 = [...arreglo1, ...arreglo2, 70, 80];
arreglo1[0] = "Chanchito feliz";
//Finalemnte se crean copias de los arreglos y no alteran al siguiente.
console.log("Arreglo 5: ", arreglo5);
console.log(arreglo1, arreglo5);

//**************************************
//Spread Operator con objetos
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 5, c: "chanchito feliz" };

const obj3 = { ...obj1 };
obj1.a = 100;
console.log("Obj1: ", obj1, " obj3: ", obj3);

const obj4 = { ...obj1, ...obj2 }; //Se rreemplaza el atributo b del primer objeto por el del segundo objeto
console.log("obj4: ", obj4);

const obj5 = {
  ...obj1,
  loading: true,
  data: {
    prop: "lala",
    animal: "perrito",
  },
};
console.log("obj5: ", obj5);
