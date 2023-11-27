function check(x, ans) {
      if (x == 0 && ans == "a") return true;
      else if (x == 1 && ans == "b") return true;
      else if (x == 2 && ans == "c") return true;
      else if (x == 3 && ans == "d") return true;
      else return false;
}
function checkInput(ans) {
      if (ans == "a" || ans == "b" || ans == "c" || ans == "d")
            return true;
      else
            return false;

}
function resetPractice() {
      document.getElementById("practice-container").textContent = '';
}

function printResult(check) {
      if (check) {
            addDivToContainer(arr[x] + " is correct", "practice-container", "correct");
      }
      else {
            addDivToContainer("You wrong!!!" + "\n" + "Answer correct" + " is " + arr[x], "practice-container", "wrong");
      }
}

function createQuestion() {
      // removeElements('practice-container');
      arr = [];
      for (var i = 0; i < 4; i++) {
            if (modePractice == 3) {
                  arr.push(arrqq[rand(0, arrqq.length - 1)]);
            }
            else {
                  var s = quangdb.aWordStartWith(String.fromCharCode(rand(97, 122)))
                  arr.push(s);
                  console.log(s);
            }
      }
      x = rand(0, 3);
      arrqq.push(arr[x]);
      addDivToContainer("Mean: " + quangdb.getMean(arr[x]) + " ?", "practice-container", "quesion");
      addDivToContainer("A: " + arr[0], "practice-container", "choice");
      addDivToContainer("B: " + arr[1], "practice-container", "choice");
      addDivToContainer("C: " + arr[2], "practice-container", "choice");
      addDivToContainer("D: " + arr[3], "practice-container", "choice");
}
function setTime() {
      times = parseInt(window.prompt("How many times do you want to play?"));
}

function test() {
      modePractice = 3;
      resetPractice();
      setTime();
      createQuestion();
}

function challenge() {
      count = 0;
      modePractice = 2;

      timesChallenge = 3;
      window.alert("You can be wrong up to " + timesChallenge + " times");
      createQuestion();
}

function learn() {
      modePractice = 1;
      resetPractice();
      setTime();
      createQuestion();
}


function getPhraseToArr(s) {
      var arr = [];
      var tmp = '';
      for (var i = 0; i < s.length; i++) {
            if (s[i] == ',') {
                  arr.push(tmp.trim());
                  tmp = '';
            } else {
                  tmp += s[i];
            }
      }
      return arr;
}

function randomPhrase(arrInput) {
      var arr = arrInput.slice();
      for (let i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
}



function handleSubmit() {
      for (let i = 0; i < arrAns.length; i++) {
            if (arrAns[i] !== ranAns[i]) {
                  resultMessage.textContent = 'Wrong!!!';
                  return;
            }
      }
      setTimeout(function () {
            resultMessage.textContent = 'Exactly!!!';
            
      }, 500);
}


function handleSwap(i) {
      indexSwap.push(i);
      updatePhrase();
      if (indexSwap.length == 2) {
            setTimeout(function () {
                  [ranAns[indexSwap[0]], ranAns[indexSwap[1]]] = [ranAns[indexSwap[1]], ranAns[indexSwap[0]]];
                  indexSwap = [];
                  updatePhrase();
            }, 100);
      }
};

function updatePhrase() {
      container.innerHTML = '';
      resultMessage.textContent = '';

      for (var i = 0; i < ranAns.length; i++) {
            var phraseBox = document.createElement('div');
            phraseBox.classList.add('phrase-box');
            phraseBox.textContent = ranAns[i];

            if (indexSwap.includes(i)) {
                  phraseBox.classList.add('selected');
            }
            container.appendChild(phraseBox);
            (function (index) {
                  phraseBox.addEventListener('click', function () {
                        handleSwap(index);
                  });
            }(i));
      }
}


function phrase() {
     // setTime();
      var containerDiv = document.getElementById('container-div');
      if (containerDiv.style.display === 'none')
            containerDiv.style.display = 'block';
      else
            containerDiv.style.display = 'none';
}




/*

Đô có thể nhớ n từ vựng(random 25-30 từ), cho k tờ giấy A4(rand 5-7 tờ), 
            tờ thứ k1 có v1 từ rand(5 -7 từ) trong đó có x1 từ đúng(rand từ 1 - v1)          \
            tờ thứ k2 có v2 từ rand(5- 7 từ) trong đó có x2 từ đúng(rand từ 1 - v2)
            Giúp Đô tìm số từ vựng nhiều nhất mà Đô có thể học sao cho số từ không vượt quá n.
*/
