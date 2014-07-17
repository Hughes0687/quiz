var quiz = [
  {
    "question":"1. What is my first name?",
    "choices":["Stephen","Sachino","Gilbert"],
    "correct":"Stephen"
  },
  {
    "question":"2. What kind of car do I drive?",
    "choices":["Corvette","CTS-V","Bicycle"],
    "correct":"CTS-V"
  },
  {
    "question":"3. What is my favorite game?",
    "choices":["League of Legends","World of Warcraft","Halo"],
    "correct":"League of Legends"
  },
];

var currentQuestion = 0;
var score = 0;
var askingQuestion = true;

var player = {
  name: null
};

// Name input box
var nameInputBox = document.createElement("input");
nameInputBox.type = "text";
nameInputBox.className = "nameinput";

// Name input submit button
var button1 = document.createElement("button");
button1.type = "text";
button1.value = "Submit";
button1.onclick = nameSave;
var submitName = document.createTextNode("Submit Name");

// Name input submit button
var button2 = document.createElement("button");
button2.type = "text";
button2.value = "Check Answer";
button2.id = "check";
button2.onclick = checkAnswer;
var check = document.createTextNode("Check Answer");

function loadNameInput(){
 
  content.appendChild(nameInputBox);
  content.appendChild(button1).appendChild(submitName);

}

function nameSave(){
  player.name = document.querySelector('.nameinput').value;
  loadQuestion();
}

function loadQuestion(){
 
var radioButton;

document.getElementById('content').innerHTML = "";

for(var i=0; i < quiz[currentQuestion]["choices"].length; i++){

  radioButton  = document.createElement('input');
  radioButton.type = 'radio';
  radioButton.name = 'quiz';
  radioButton.id = 'choice'+ (i+1);
  radioButton.value = quiz[currentQuestion]["choices"][i];

  var label = document.createElement('label');
  label.setAttribute('for','choice'+ (i+1));
  label.innerHTML = quiz[currentQuestion]["choices"][i];

  var br = document.createElement('br');

  document.getElementById('content').insertBefore(br);
  document.getElementById('content').insertBefore(label, br);
  document.getElementById('content').insertBefore(radioButton, label);
}

content.appendChild(button2).appendChild(check);

document.getElementById('question').innerHTML = quiz[currentQuestion]["question"];

if(currentQuestion == 0){
  document.getElementById('score').innerHTML = '<p>score: 0 right answers out of ' + quiz.length +' possible</p>';
}
}

function checkAnswer(){

if(askingQuestion){

  document.getElementById('check').innerHTML = 'Next Question';
  askingQuestion = false;

  var userpick;
  var correctIndex;
  var radios = document.getElementsByName('quiz');
  for(var i=0; i < radios.length; i++){
    if(radios[i].checked){ //if this radio button is checked
      userpick = radios[i].value;
    }
    if(radios[i].value == quiz[currentQuestion]["correct"]){
      correctIndex = i;
    }
  }

  if(userpick == quiz[currentQuestion]["correct"]){
    score++;
    document.getElementsByTagName('label')[correctIndex].style.color = "green";
    document.getElementsByTagName('label')[correctIndex].style.fontWeight = "bold";
  } else {
    document.getElementsByTagName('label')[correctIndex].style.color = "red";
    document.getElementsByTagName('label')[correctIndex].style.fontWeight = "bold";
  }

  document.getElementById('score').innerHTML = '<p>score: '+ score +' right answers out of ' + quiz.length +' possible</p>';

} else { //reset form and move to next question

  askingQuestion = true;

  document.getElementById('check').innerHTML = 'Submit Answer';

  if(currentQuestion < quiz.length - 1){
    currentQuestion++;
    loadQuestion();
  } else {
    showFinalResults();
  }

}
}

function showFinalResults(){

document.getElementById('content').innerHTML = '<h2>You Completed The Quiz</h2>';
document.getElementById('content').innerHTML += '<h2>' + score + ' out of ' + quiz.length + ' questions, ' + Math.round(score/quiz.length * 100) + '%</h2>';

var button = document.getElementById('check');

document.getElementById('question').innerHTML = "";
storeHighScores();
}

function storeHighScores(){
  var name = player.name.toString();
  var playerScore = score.toString();
  localStorage.setItem(name,playerScore);
}

function showHighScores(){
localStorage.getItem(player.name, score);
}

window.onload = loadNameInput;


var storage = window.localStorage;
    for (var key in storage) {
        var jobName= storage[key];
        // execute the rest of your code
    }



$("#jobsList").html(storage);







