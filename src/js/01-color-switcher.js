const bodyColor = document.querySelector('body');
const stopcolor = document.querySelector('button[data-stop]');
const startColor = document.querySelector('button[data-start]');
stopcolor.setAttribute('disabled', true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
let Color = null;
const onClickStart = () => { 
Color = setInterval(() => {
        bodyColor.style.backgroundColor = getRandomHexColor(); 
    }, 250);
    startColor.setAttribute('disabled', true);
    stopcolor.removeAttribute('disabled');
}
startColor.addEventListener('click', onClickStart); 
const onclickStop = () => {
    clearInterval(Color);
    startColor.removeAttribute('disabled');
    stopcolor.setAttribute('disabled', true);
}
stopcolor.addEventListener('click', onclickStop);
