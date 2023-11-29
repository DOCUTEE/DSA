function searchDefine() {
  var inputt = document.getElementById("input").value.toLowerCase();
  inputt = inputt.trim();
  try {
    var word = dictionary.findWord(inputt);
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

function displaySearch() {
  var vocab = document.getElementById("input").value.toLowerCase();
  var definition = searchDefine(vocab);
  resultDic.innerHTML = `<p><strong>${vocab}:</strong> ${definition}</p>`;
}

function insertVocab() {
  var word = document.getElementById("input").value.toLowerCase();
  ielts.addWord(word, searchDefine(word));
  console.log(word + "          " + searchDefine(word));
}

function handleInput() {
  try {
    removeElements('autocompleteList');
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
          removeElements('autocompleteList');
          displaySearch();
        });
      });
  } catch (error) {
    console.error('This word has no suggestions!!!', error);
  }
};

function removeElements(idd) {
  const autocompleteList = document.getElementById(idd);
  while (autocompleteList.firstChild) {
    autocompleteList.removeChild(autocompleteList.firstChild);
  }
}

