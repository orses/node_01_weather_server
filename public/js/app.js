const weatherForm = document.getElementById('location_form');
const search = document.getElementById('search_location');
const nospam = document.getElementById('control');
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // For automatic completion
  console.log(control.value);
  if (control.value) {
    search.focus();
    return false;
  }
  const location = search.value;
  message1.textContent = 'Cargando...';
  message2.textContent = '';

  fetch(`/weather?address=${encodeURIComponent(location)}&control=${control.value}`).then(
    response => response.json().then((data) => {
      search.focus();
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = data.location;
        message2.textContent = data.forecast;
      }
    }),
  );
});
