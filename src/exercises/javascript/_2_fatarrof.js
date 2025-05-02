/*
En java script se implementa la herencia basada en prototipos.
Estas funciones se declaran con la palabra reservada function.
 */

function Fn() {
  return "chanchito feliz";
}

function otroFn() {
  //Se crea un objeto de la nada {}
  this.prop = "propiedad";
  //return "chanchito feliz"; //al instanciar ignora el return actual, se crea un nuevo return
  //ahora return this. Entonces no tiene caso el return anterior.
}

const r = Fn();
console.log(r);

otroFn.prototype.otroProp = function () {
  //Se puede asignar una función a un prototipo
  console.log("Esta e suna función anonima");
};
const obj = new otroFn(); //Se puede crear una instancia de la función Fn
//Ya que las funciones en ES6 tienen un contexto de this
console.log("Objeto objFn: ", obj);
console.log("Proto del objeto objFn: ", obj.__proto__);

//Ahora las fat arrow function
//Las Fat Arrow Funtion no pueden ser generada usando la parabla reservada de new
//Una Fat Arrow Fucion no tiene contexto de this
const fatfn = () => {
  obj.prop = "Mi propiedad de la FAF";
  console.log("Apuntador this: ", this); //Esto no se puede hacer
  //return "chanchito feliz en una fat arrow function";
  return obj;
};

const r2 = fatfn();
console.log("Valor de R2: ", r2);

//Las fat arrow Funtion cuentan con un return implícito
const fatfn2 = (a, b) => a + b;
console.log("Valor de fatfn2: ", fatfn2(5, 50));
