class Chancho {
  propiedad = "Esta es una propiedad";
  static propestatico = 42;
  estado;
  #hambre = false; //atributo o propiedad privado
  constructor(estado = "pensando", hambre = false) {
    this.estado = estado;
    this.#hambre = hambre;
  }

  hablar() {
    console.log(
      `Soy un chancho ${this.estado} ${
        this.#hambre ? "con mucha hambre" : "satisfecho"
      }`
    );
  }

  static comer() {
    //Un método estático no puede acceder a las propiedades,
    // solo cuando estas sean estaticas.
    console.log("Estoy comiendo", this.propiedad, this.propestatico);
  }
}

const ch1 = new Chancho("Feliz", false);
ch1.hablar();
const ch2 = new Chancho("Trizte", true);
ch2.hablar();
const ch3 = new Chancho();
ch3.hablar();

Chancho.comer();
