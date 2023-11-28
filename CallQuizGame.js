var quangdb = dictionary;
var timesChallenge = 3;
var arrqq = [];
var times = 0;
var x;
var arr = [];
var maximum = 0;
var count = 0;
var modePractice = 1;
//1: learn
//2: challenge
//3: test

document.getElementById("user-reply").addEventListener("keydown", function (event) {

    if (event.key == "Enter") {
        console.log(modePractice);
        var ans = document.getElementById("user-reply").value;
        ans = ans.toLowerCase();
        if (modePractice == 1) {
            if (times > 0) {
                if (checkInput(ans)) {
                    times--;
                    printResult(check(x, ans));
                    createQuestion();
                }

            }
            if (times == 0) {
                window.alert("End game!")
                resetPractice();
                // learn();
            }
        }
        else if (modePractice == 2) {
            if (timesChallenge > 0) {
                if (checkInput(ans)) {
                    var temp = check(x, ans);
                    count += temp;
                    timesChallenge += temp - 1;
                    console.log(count, timesChallenge);
                    printResult(temp);
                    createQuestion();
                }

            }
            if (timesChallenge == 0) {
                if (count > maximum) {
                    window.alert("You lost ! New record is " + count);
                    maximum = count;
                }
                else window.alert("You lost ! Your score is " + count);
                resetPractice();
            }
        }
        else if (modePractice == 3) {
            if (times > 0) {
                if (checkInput(ans)) {
                    times--;


                }

            }
            if (times == 0) {
                window.alert("End game!");
                resetPractice();
            }
        }
        document.getElementById("user-reply").value = '';

    }
});


var ranPhrase = new Dictionary();
ranPhrase.init("phrase.txt");
var tmpp = ranPhrase.findWord('z');

console.log(tmpp);


var s = 'Where, are, you, from, ';

var arrAns = getPhraseToArr(s);
var ranAns = randomPhrase(arrAns);

var container = document.getElementById('phrase-container');
var submitButton = document.getElementById('submit-button');
var resultMessage = document.getElementById('result-message');
var indexSwap = [];
document.getElementById('phrase-button').addEventListener('click', phrase);
updatePhrase();
submitButton.addEventListener('click', handleSubmit);

