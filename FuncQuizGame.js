function displayQuiz() {
      document.getElementById('container-div').style.display = 'none';
      var boxQuiz = document.getElementById('box-practice');

      if (boxQuiz.style.display === 'none')
            boxQuiz.style.display = 'block';

}

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

      document.getElementById('practice-container').textContent = '';
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
      displayQuiz()
      modePractice = 3;
      resetPractice();
      setTime();
      createQuestion();
}

function challenge() {
      displayQuiz()
      count = 0;
      modePractice = 2;

      timesChallenge = 3;
      window.alert("You can be wrong up to " + timesChallenge + " times");
      createQuestion();
}

function learn() {
      displayQuiz()
      modePractice = 1;
      resetPractice();
      setTime();
      createQuestion();
}

class PhraseGame {

      constructor() {
            this.container = document.getElementById('phrase-container');
            this.aSetOfPhrase = [];
            this.aPhrase = "";

            this.times = 5;
            this.index = 0;

            this.indexSwap = [];
            this.ansPhrase = [];
            this.randPhrase = [];
            this.initt();
      }

      initt() {
            this.phrases = [
                  ///Likes
                  [
                        "He, doesn't, like, paying, money,",
                        "She, likes, giving, gifts,",
                        "They, like, listening, to, music,",
                        "He, likes, playing, the, drums,",
                        "They, don't, like, maths,"
                  ],
                  /// Compare
                  [
                        "Gorillas, are, stronger, than, monkeys,",
                        "The river, is, wider, than, the road,",
                        "The digger, is, noiser, than, the spade,",
                        "Computer games, are, more, interesting, than, homework,",
                        "Cats, are, safer, than, tigers,"
                  ],
                  ///Places
                  [
                        "In, a hair salon, you, can, get, a haircut,",
                        "At, a florist, you, can, buy, flowers,",
                        "In, a stadium, you, can, watch, sports,",
                        "In, a convenience, store, you, can buy, a newspaper,",
                        "At, a bus stop, you , can, catch, a bus,",
                  ]
            ];
      }

      displayy() {
            document.getElementById('box-practice').style.display = 'none';
            var containerDiv = document.getElementById('container-div');
            if (containerDiv.style.display === 'none') {
                  containerDiv.style.display = 'block';

                  this.getASetOfPhrase();
                  this.getAPhrase();
                  this.getPhraseToArr();
                  this.mixPhrase();
                  this.updatePhrase();
            }
            else {
                  this.container.innerHTML = '';
                  document.getElementById('result-message').textContent = '';
                  containerDiv.style.display = 'none';
                  this.index = 0;
            }
      }

      getASetOfPhrase() {
            var tmp = rand(0, 2);
            console.log(tmp);
            console.log(this.phrases[tmp]);
            this.aSetOfPhrase = this.phrases[tmp];
      }

      getAPhrase() {
            this.aPhrase = this.aSetOfPhrase[this.index];
            this.index++;
      }

      getPhraseToArr() {
            this.randPhrase = [];
            this.ansPhrase = [];
            var tmp = '';
            for (let i = 0; i < this.aPhrase.length; i++) {
                  if (this.aPhrase[i] == ',') {
                        this.ansPhrase.push(tmp);
                        tmp = '';
                  } else {
                        tmp += this.aPhrase[i];
                  }
            }
      }

      mixPhrase() {

            this.randPhrase = this.ansPhrase.slice();
            for (let i = this.randPhrase.length - 1; i > 0; i--) {
                  var j = Math.floor(Math.random() * (i));
                  [this.randPhrase[i], this.randPhrase[j]] = [this.randPhrase[j], this.randPhrase[i]];
            }

      }



      swapp(i) {
            this.indexSwap.push(i);
            this.updatePhrase();
            if (this.indexSwap.length == 2) {
                  setTimeout(() => {
                        [this.randPhrase[this.indexSwap[0]], this.randPhrase[this.indexSwap[1]]] = [this.randPhrase[this.indexSwap[1]], this.randPhrase[this.indexSwap[0]]];
                        this.indexSwap = [];
                        this.updatePhrase();
                  }, 100);
            }
      }


      updatePhrase() {
            this.container.innerHTML = '';
            document.getElementById('result-message').textContent = '';

            for (let i = 0; i < this.randPhrase.length; i++) {

                  var phraseBox = document.createElement('div');
                  phraseBox.classList.add('phrase-box');
                  phraseBox.textContent = this.randPhrase[i];

                  if (this.indexSwap.includes(i)) {
                        phraseBox.classList.add('selected');
                  }
                  this.container.appendChild(phraseBox);
                  phraseBox.addEventListener('click', () => this.swapp(i));
            }
      }


      submitt() {
            for (let i = 0; i < this.randPhrase.length; i++) {
                  if (this.randPhrase[i] !== this.ansPhrase[i]) {
                        document.getElementById('result-message').textContent = "Wrong!!!";
                        return;
                  }
            }
            document.getElementById('result-message').textContent = "Exactly!!!";
            setTimeout(() => {
                  if (this.index == 5) {
                        window.alert("End game!");
                        this.displayy();
                  }
                  else {
                        this.getAPhrase();
                        this.getPhraseToArr();
                        this.mixPhrase();
                        this.updatePhrase();
                  }
            }, 300);
      }

}






/*

Đô có thể nhớ n từ vựng(random 25-30 từ), cho k tờ giấy A4(rand 5-7 tờ), 
            tờ thứ k1 có v1 từ rand(5 -7 từ) trong đó có x1 từ đúng(rand từ 1 - v1)          \
            tờ thứ k2 có v2 từ rand(5- 7 từ) trong đó có x2 từ đúng(rand từ 1 - v2)
            Giúp Đô tìm số từ vựng nhiều nhất mà Đô có thể học sao cho số từ không vượt quá n.
*/
