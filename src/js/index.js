import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

async function scoreArray() {
  let response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BaCuaRTa0eGsbOGKOkI1/scores/', {
    method:'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
});
  return await response.json();
}



function addScore(name, score) {
  const table = document.getElementById('table-body');
  const scoreElement = document.createElement('tr');
  scoreElement.innerHTML = `<td>${name}: ${score}</td>`;
  table.appendChild(scoreElement);
}

async function submitScore(name, score) {
 let response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BaCuaRTa0eGsbOGKOkI1/scores/', {
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
        "user": `${name}`,
        "score": `${score}`   
    })
})
if (!response.ok) {
  throw new Error("Your submission did not reach the server")
} else {
  addScore(name, score)
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

async function listOnLoad() {
  const table = document.getElementById('table-body');
  let sArray = [];
  await scoreArray().then((scores) => {sArray = scores.result})
  table.innerHTML = ""
  sArray.forEach((element) => {
    addScore(element.user, element.score);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  submitListener();
  listOnLoad()
});

document.addEventListener('click', (event) => {
  const isButton = event.target.id
  if (isButton === 'refresh'){
    listOnLoad()
  }
})