var rememberLimit,numberOfPill,numberWordInAPill;
var pills = [];
var correctWords = [],wrongWords = [];
async function initCorrect(){
      var correctLines = await fetch("./correctWords.txt");
      var temp = await correctLines.text();
      var lines = temp.split("\n");
      lines.forEach(line => {
            correctWords.push(line);
      });
}
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
function createEngMath(){
      rememberLimit = rand(25,30);
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
      var problem = "Hình bên cạnh là trí nhớ của Quang.Cậu ấy là một chàng trai yêu thích tiếng Anh và sở hữu một cái túi thần kì.Trong túi này có chứa một loại thuốc giúp người sử dụng học thuộc được những từ vựng có trong viên thuốc này ngay trong tíc tắc nhưng những từ có trong viên thuốc chưa chắc đã là những từ đúng. Quang cũng muốn sử dụng những viên thuốc thần kì này để giúp cậu nhanh giỏi tiếng Anh hơn nhưng vấn đề là trí nhớ của Quang chỉ có thể nhớ được " + rememberLimit + " từ mỗi ngày. Hôm nay, Quang cần bạn chọn giúp cho cậu ấy một vài viên thuốc để uống sao cho số từ vựng đúng là nhiều nhất và tổng số từ vựng cần nhớ không vượt quá " + rememberLimit + " từ.";
      document.getElementById("engmath").textContent = problem; 
      for (var i = 0; i < numberOfPill; i++){
            var choice = createChoice(i);
            document.getElementById('choice-container').appendChild(choice);
      }
}

function createChoice(index){
      var option = document.createElement("input");
      option.value = index;
      option.type = "checkbox";
      option.id = "option" + index;
      var labelOption = document.createElement("label");
      labelOption.textContent = '💊|';
      labelOption.for = option.id;
      for(var i = 0; i < pills[index][1]; i++) choices[index].push(correctWords.pop());
      for(var i = 0; i < pills[index][0] - pills[index][1]; i++) choices[index].push(wrongWords.pop());
      console.log(choices[index].length);
      choices[index].forEach(element => {
            labelOption.textContent += element + ' | ';
      });
      var choice = document.createElement("div");
      choice.appendChild(option);
      choice.appendChild(labelOption);
      return choice;
}
function checkOption(){
      var numCorrect = 0, numWord = 0;
      for(var i = 0; i < numberOfPill; i++){
            var choice = document.getElementById("option" + i);
            if (choice.checked){
                  numWord += pills[i][0];
                  numCorrect += pills[i][1];
            }
      }
      if (numCorrect == bestOption() && numWord <= rememberLimit) return true;
      return false;
}
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
function bestOption(){
      //return dp....
      return 10;
}
