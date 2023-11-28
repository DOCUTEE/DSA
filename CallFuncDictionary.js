const dictionary = new Dictionary();
const ielts = new Dictionary();
//dictionary.init("phrase.txt");

document.getElementById("searchButton").addEventListener("click", display);
document.getElementById("input").addEventListener("keyup", function (event) {
    if (event.key == "Enter")
        display();
});
document.getElementById("input").addEventListener("input", handleInput);
document.getElementById("insertButton").addEventListener("click", insertVocab);
