var rememberLimit,numberOfPill,numberWordInAPill;
var pills = [];
var correctWords = [],wrongWords = [];
//Hàm khởi tạo list các từ đúng chính tả
async function initCorrect(){
      var correctLines = await fetch("./correctWords.txt");
      var temp = await correctLines.text();
      var lines = temp.split("\n");
      lines.forEach(line => {
            correctWords.push(line);
      });
}
//Hàm khởi tạo list các từ sai chính tả
async function initWrong(){
      var wrongLines = await fetch("./wrongWords.txt");
      var temp = await wrongLines.text();
      var lines = temp.split("\n");
      lines.forEach(line => {
            wrongWords.push(line);
      });
}
initCorrect();
initWrong();
var choices = [];
var res;
//Hàm tạo cốt truyện và đề bài
function createEngMath(){
      document.getElementById("brain-pic").src = "./brain_bad.png";
      document.getElementById('choice-container').textContent = '';
      rememberLimit = rand(20,25);
      numberOfPill = rand(5,7);
      pills = [];
      choices = [];
      for(var i = 0; i < numberOfPill; i++){
            var numberWordInAPill = rand(5,7);
            var numberCorrect = rand(0, numberWordInAPill);
            pills.push([numberWordInAPill,numberCorrect]);
            choices.push([]);
      }
      // for(var i = 0; i < numberOfPill; i++) console.log(pills[i]);
      var problem = "The image beside is Quang's memory. He is a boy who loves English and owns a magical bag. In this bag, there is a kind of medicine that helps the user instantly memorize the words contained in this medicine, but the words in the medicine are not necessarily correct. Quang also wants to use these magical pills to help him become better at English quickly, but the problem is Quang's memory can only remember " + rememberLimit + " words per day. Today, Quang needs your help to choose some pills for him to take so that the number of correct vocabulary words is maximized, and the total number of words to remember does not exceed " + rememberLimit + ".";
      document.getElementById("engmath").textContent = problem; 
      for (var i = 0; i < numberOfPill; i++){
            var choice = createChoice(i);
            document.getElementById('choice-container').appendChild(choice);
      }
      res = bestOption();
}
function shuffle(array){
      for(var i = 0; i < array.length; i++){
            var j = rand(0,array.length-1);
            [array[i], array[j]] =[array[j],array[i]];
      }
      return array;
}
//Hàm tạo các option đề người dùng lựa chọn
function createChoice(index){
      var option = document.createElement("input");
      option.value = index;
      option.type = "checkbox";
      option.id = "option" + index;
      var labelOption = document.createElement("label");
      labelOption.textContent = index+1 + '💊|';
      labelOption.for = option.id;
      for(var i = 0; i < pills[index][1]; i++){
            var temp = correctWords.pop();
            var cr = document.createElement("span");
            cr.textContent = temp + "|";
            cr.className = 'correct';                                  
            choices[index].push(cr); 
      }
      for(var i = 0; i < pills[index][0] - pills[index][1]; i++){
            var temp = wrongWords.pop();
            var wr = document.createElement("span");
            wr.textContent = temp + '|';
            wr.className = 'wrong';
            choices[index].push(wr);
      }
      choices[index] = shuffle(choices[index]);
      var numberC = document.createElement("span");
      numberC.textContent = choices[index].length;
      for(var i = 0; i < choices[index].length; i++){
            labelOption.appendChild(choices[index][i]);
      }
      var choice = document.createElement("div");
      choice.appendChild(option);
      choice.appendChild(labelOption);
      choice.appendChild(numberC);
      return choice;
}
//Hàm kiểm tra lựa chọn của người dùng đã tối ưu hay chưa ?
function checkOption(){
      var numCorrect = 0, numWord = 0;
      for(var i = 0; i < numberOfPill; i++){
            var choice = document.getElementById("option" + i);
            if (choice.checked){
                  numWord += pills[i][0];
                  numCorrect += pills[i][1];
            }
      }
      if (numCorrect == res && numWord <= rememberLimit) return true;
      return false;
}
//Nếu đáp án tối ưu thì sẽ đổi hình ảnh brain
function notificationResult(){
      if (checkOption()){
            document.getElementById("brain-pic").src = "./brain_fun.jpg";
      }
      else
      {
            for(var i = 0; i < numberOfPill; i++){
                  document.getElementById("option" + i).checked = false;
            }
      }
}
var dp = [];
var trueOption = [];
//Dynamic Programming for find best option
function bestOption(){
      dp = [];
      for(var i = 0; i <= numberOfPill; i++){
            dp[i] = [];
            for(var j = 0; j <= rememberLimit; j++) dp[i][j] = 0;
      }
      for(var i = 1; i <= numberOfPill; i++){
            for(var j = 1; j <= rememberLimit; j++)
            {
                  if (pills[i-1][0] <= j) dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-pills[i-1][0]] + pills[i-1][1]);
                  else dp[i][j] = dp[i-1][j];
            }
      }
      console.log(dp);
      return dp[numberOfPill][rememberLimit];
}
//Tracing BestOptions
function traceOption(){
      trueOption = [];
      var j = rememberLimit;
      for(var i = numberOfPill; i >= 1; i--){
            if (dp[i][j] != dp[i-1][j]){
                  trueOption.push(i-1);
                  j -= pills[i-1][0];
            } 
      }
      console.log(trueOption);
}
//hint
function hint(){
      var wr = document.getElementsByClassName("wrong");
      for (var i = 0; i < wr.length; i++) {
            wr[i].style.color = "red";
      }
      var cr = document.getElementsByClassName("correct");
      for (var i = 0; i < cr.length; i++) {
            cr[i].style.color = "green";
      }
}
//showResult
function showResult(){
      traceOption();
      hint();
      for(var i = trueOption.length-1; i >= 0; i--){
            document.getElementById("option"+trueOption[i]).checked = true;
      } 
}
