/*
 hoisting (que se traduce como "elevación") 
 es un comportamiento del lenguaje en el que las declaraciones de 
 variables y funciones se "mueven" al principio del ámbito (scope) 
 en el que fueron definidas, antes de que se ejecute el código
 */

console.log("Valor de mi Variable antes de su declaracion: ", miVariable); //Aqui no marca error gracias al concepto hoisting
var miVariable = "variable creada con var";
miVariable = "Nuevo valor de la varibale var";
console.log("El valor de miVariable después de su declaración: ", miVariable);

//console.log(otraVariable); //Aquí si marca error
let otraVariable = "Variable creada con let";
otraVariable = "Nuevo valor de la variable let";
console.log(
  "El valor de la otraVaribale después de su declaración: ",
  otraVariable
);

const constante = "Esta es una constante";
console.log("el valor de la constante después de su declaración: ", constante);
