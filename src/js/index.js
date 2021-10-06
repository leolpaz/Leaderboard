import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

async function scoreArray() {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Jr8ve03OdWKSKifJ8KiL/scores/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

function addScore(name, score) {
  const table = document.getElementById('table-body');
  const scoreElement = document.createElement('tr');
  scoreElement.innerHTML = `<td>${name}: ${score}</td>`;
  table.appendChild(scoreElement);
}

async function listOnLoad() {
  const table = document.getElementById('table-body');
  let sArray = [];
  await scoreArray().then((scores) => { sArray = scores.result; });
  sArray.sort((a, b) => b.score - a.score);
  table.innerHTML = '';
  sArray.forEach((element) => {
    addScore(element.user, element.score);
  });
}

async function submitScore(name, score) {
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
}

function submitListener() {
  const submit = document.getElementById('submit-form');
  submit.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const score = document.getElementById('score').value;
    submit.reset();
    submitScore(name, score);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  submitListener();
  listOnLoad();
});

document.addEventListener('click', (event) => {
  const isButton = event.target.id;
  if (isButton === 'refresh') {
    listOnLoad();
  }
});