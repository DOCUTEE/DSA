
// Tạo một cây Trie mới và một Map để lưu định nghĩa
const dictionary = new Dictionary();
const ielts = new Dictionary();

dictionary.init("word_define.txt");

function searchDefine() {
  var inputt = document.getElementById("input").value.toLowerCase();
  inputt = inputt.trim();
  try {

    // Tìm kiếm từ trong cây Trie thay vì dữ liệu từ API
    var word = dictionary.findWord(inputt);
    // Hiển thị kết quả trên giao diện
    if (word) {

      var def = dictionary.getMean(inputt);
      return def;
    }
    else
      return "This word is not found in the dictionary.";

  } catch (error) {
    console.error('search error!!!', error);
  }
}

function display() {
  var vocab = document.getElementById("input").value.toLowerCase();
  var definition = searchDefine(vocab);
  result.innerHTML = `<p><strong>${vocab}:</strong> ${definition}</p>`;
}


function insertVocab() {
  var word = document.getElementById("input").value.toLowerCase();
  ielts.addWord(word, searchDefine(word));
  console.log(word + "          " + searchDefine(word));
}

function handleInput() {
  try {
    removeElements();
    const word = document.getElementById("input").value.toLowerCase();
    const suggestions = dictionary.suggest(word);

    const autocompleteList = document.getElementById("autocompleteList");
    if (suggestions != null)
      suggestions.forEach(suggestion => {
        const listItem = document.createElement("li");
        listItem.textContent = suggestion;
        autocompleteList.appendChild(listItem);
        listItem.addEventListener("click", function () {
          document.getElementById("input").value = suggestion;
          removeElements();
        });
      });
  } catch (error) {
    console.error('This word has no suggestions!!!', error);
  }
};

function removeElements() {
  const autocompleteList = document.getElementById("autocompleteList");
  while (autocompleteList.firstChild) {
    autocompleteList.removeChild(autocompleteList.firstChild);
  }
}


document.getElementById("searchButton").addEventListener("click", display);
document.getElementById("input").addEventListener("keyup", function (event) {
  if (event.key == "Enter")
    display();
});
document.getElementById("input").addEventListener("input", handleInput);
document.getElementById("insertButton").addEventListener("click", insertVocab);
