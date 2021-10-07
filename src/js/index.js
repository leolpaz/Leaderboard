import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/style.css';

const scoreArray = async () => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Jr8ve03OdWKSKifJ8KiL/scores/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

const listOnLoad = async () => {
  const table = document.getElementById('table-body');
  let sArray = [];
  await scoreArray().then((scores) => {
    sArray = scores.result;
  });
  sArray.sort((a, b) => b.score - a.score);
  table.innerHTML = '';
  sArray.forEach((element, index) => {
      if (index === 0) {
        table.innerHTML += `<tr class='table-custom-first border border-dark'><td>${element.user}: ${element.score}</td></tr>`;
      } else if (index === 1) {
        table.innerHTML += `<tr class='table-custom-second border border-dark'><td>${element.user}: ${element.score}</td></tr>`;
      } else if (index === 2) {
        table.innerHTML += `<tr class='table-custom-third border border-dark'><td>${element.user}: ${element.score}</td></tr>`;
      } else if (index % 2 === 0) {
        table.innerHTML += `<tr class='table-active'><td>${element.user}: ${element.score}</td></tr>`;
      } else {
        table.innerHTML += `<tr><td>${element.user}: ${element.score}</td></tr>`;
      }
    })
  }


const submitScore = async (name, score) => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Jr8ve03OdWKSKifJ8KiL/scores/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: `${name}`,
      score: `${score}`,
    }),
  });
  if (!response.ok) {
    throw new Error('Your submission did not reach the server');
  } else {
    listOnLoad();
  }
};

const submitListener = () => {
  const submit = document.getElementById('submit-form');
  submit.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const score = document.getElementById('score').value;
    submit.reset();
    submitScore(name, score);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  submitListener();
  listOnLoad();
});

document.addEventListener('click', async (event) => {
  const isButton = event.target.id;
  if (isButton === 'refresh') {
    const btn = document.getElementsByClassName('refresh-button')[0]
    btn.innerHTML = 'Refreshing'
    await listOnLoad().then(() => {
      btn.innerHTML = 'Refresh'
    });
  }
});