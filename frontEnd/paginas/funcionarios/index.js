const myForm = document.getElementById('myForm');

myForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(myForm);

  fetch('http://localhost:2550/passageiros/crypt', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.clear();
      localStorage.setItem('form',formData);
      console.log(formData)

    })
    .catch((error) => {
      console.error(error);
    });
});

console.log(localStorage)