import playSound from "../../playSound.js"

export default function showLoosing() {
    const title = document.querySelector('h4');
    title.innerHTML = 'Your flotilla is broken...';
    title.style.color = 'black';
    const gameBox = document.querySelector('.gameBox');
    const img = document.createElement('img');
    img.style.width = '720px';
    img.style.height = '400px';
    img.style.padding = '0';
    img.src = '../../game_client/assets/burningFlotilia.jpg';
    gameBox.innerHTML = '';
    gameBox.appendChild(img);
    gameBox.style.alignItems = 'center';
    playSound('fail');
    setTimeout(()=>document.location.reload(), 6000);
}