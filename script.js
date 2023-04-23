let repetitionSelect = id("repetition_number");
let countBtn = id("count_btn");
let resetBtn = id("reset_btn");
let current = 0;
let max = 12;
// let countSnd = new Audio("./Sounds/count.mp3");
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioctx;
let countSnd = "./Sounds/count.mp3";
let resetSnd = new Audio("./Sounds/count_old.mp3");
resetSnd.volume = 0.01;
let maxSnd = new Audio("./Sounds/max.mp3");
maxSnd.load();

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
        audioctx = new AudioContext();
        audioPlay(countSnd);
    }
});

resetBtn.addEventListener("click", e => {
    e.preventDefault();
    current = 0;
    countBtn.innerHTML = current;
    resetSnd.play();
});



const audioPlay = async (pPath) => {
    let source = audioctx.createBufferSource();
    const audioBuffer = await fetch(pPath)
        .then(res => res.arrayBuffer())
        .then(ArrayBuffer => audioctx.decodeAudioData(ArrayBuffer));

    source.buffer = audioBuffer;

    let gainNode = audioctx.createGain();
    source.addEventListener("ended", () => {
    });

    gainNode.gain.value = 10;
    let currentGain = gainNode.gain.value;

    source.connect(gainNode);
    gainNode.connect(audioctx.destination)

    gainNode.gain.setValueAtTime(currentGain, audioctx.currentTime);

    source.start();

}