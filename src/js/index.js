import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import Score from './score.js';

class ScoreArray {
  static returnArray() {
    const scoreArray = JSON.parse(localStorage.getItem('scoreArray') || '[]');
    return scoreArray;
  }

  static saveScore(score) {
    const scoreArray = ScoreArray.returnArray();
    scoreArray.push(score);
    localStorage.setItem('scoreArray', JSON.stringify(scoreArray));
  }
}

function submitScore(name, score) {
  const table = document.getElementById('table-body');
  const scoreElement = document.createElement('tr');
  scoreElement.innerHTML = `<td>${name}: ${score}</td>`;
  table.appendChild(scoreElement);
}

function submitListener() {
  const submit = document.getElementById('submit-form');
  submit.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const score = document.getElementById('score').value;
    const newScore = new Score(name, score);
    submit.reset();
    ScoreArray.saveScore(newScore);
    submitScore(name, score);
  });
}

function listOnLoad() {
  ScoreArray.returnArray().forEach((element) => {
    submitScore(element.name, element.score);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  submitListener();
  listOnLoad();
});