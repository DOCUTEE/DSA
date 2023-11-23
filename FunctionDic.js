const dictionary = new Dictionary();
const ielts = new Dictionary();
dictionary.init("word_define.txt");
document.getElementById("searchButton").addEventListener("click", display);
document.getElementById("input").addEventListener("keyup", function (event) {
    if (event.key == "Enter")
        display();
});
document.getElementById("input").addEventListener("input", handleInput);
document.getElementById("insertButton").addEventListener("click", insertVocab);
