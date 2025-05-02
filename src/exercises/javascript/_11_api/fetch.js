const url = "https://jsonplaceholder.typicode.com/users";

//fetch(url).then((response) => console.log(response.text()));
//fetch(url).then((response) => console.log(response.json()));
fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data));
