let repetitionSelect = id("repetition_number");
let countBtn = id("count_btn");
let resetBtn = id("reset_btn");
let current = 0;
let max = 12;
let countSnd = id("count");
let maxSnd = id("max");

let innerHTML = "";
let selected = "";
for (let i = 1; i <= 50; i++) {
    selected = ""
    if (i == max) selected = "selected";
    innerHTML += `<option value="${i}" ${selected}>${i}</option>`;
}
repetitionSelect.innerHTML = innerHTML;

repetitionSelect.addEventListener("change", e => {
    max = repetitionSelect.value;
});

countBtn.innerHTML = current;
countBtn.addEventListener("click", e => {
    e.preventDefault();
    current++;
    countBtn.innerHTML = current;
    if (current >= max) {
        maxSnd.play();
    } else {
        countSnd.play();
    }
});

resetBtn.addEventListener("click", e => {
    e.preventDefault();
    current = 0;
    countBtn.innerHTML = current;
});


