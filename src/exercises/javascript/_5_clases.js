const Rectangulo1 = class {
  //Expresión de clase
};

//Las clases declaradas con class no tienen hoisting
class Rectangulo2 {
  //Declaración de clase
}

const r1 = new Rectangulo1();
const r2 = new Rectangulo2();

console.log(r1);
console.log(r2);

class Chancho {
  constructor(estado = "pensando") {
    //Método contructor
    console.log(`Soy un chancho ${estado}`); //Concepto Template String o Template Literal
  }
}

const michancho1 = new Chancho("gordito");
const michancho2 = new Chancho("flaquito");
const michancho3 = new Chancho();
