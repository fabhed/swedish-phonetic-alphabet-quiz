document.getElementById('submit').addEventListener('click', checkAnswer);

function getRandomLetters() {
  fetch('/random-letters')
    .then(response => response.json())
    .then(letters => {
      document.getElementById('letters').textContent = letters.join(' ');
    });
}

function checkAnswer() {
  let letter = document.getElementById('letters').textContent.split(' ')[0];
  let answer = document.getElementById('answer').value;
  fetch('/check-answer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({letter: letter, answer: answer}),
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById('result').textContent = data.correct ? 'Correct!' : 'Incorrect!';
      getRandomLetters();
    });
}

getRandomLetters();
