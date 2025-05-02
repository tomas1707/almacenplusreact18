const chanchosFelices = [
  "chancho feliz 1",
  "chancho feliz 2",
  "chancho feliz 3",
];

const chanchosTristes = [
  "chancho trizte 1",
  "chancho trizte 2",
  "chancho trizte 3",
];

const chanchosMe = ["chancho Me 1", "chancho Me 2", "chancho Me 3"];

const fn1 = () => {
  console.log("Este es codigo funcional");
};

function fn2() {
  console.log("Esta es una función clásica");
}

export { chanchosTristes, chanchosMe, fn1, fn2 }; //Exportando constantes
export default chanchosFelices; //Exportando otra constante
