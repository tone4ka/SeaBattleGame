import playSound from "../../playSound.js"
import reloadPage from "./reloadPage.js"

export default function showCongratulations() {
    const title = document.querySelector('h4');
    title.innerHTML = 'CONGRATULATIONS!';
    title.style.color = 'orange';
    const gameBox = document.querySelector('.gameBox');
    const img = document.createElement('img');
    img.style.width = '308px';
    img.style.height = '400px';
    img.style.padding = '0';
    img.src = '../../game_client/assets/flyingHighPirate.png';
    gameBox.innerHTML = '';
    gameBox.appendChild(img);
    gameBox.style.alignItems = 'center';
    playSound('win');
    setTimeout(()=> reloadPage(), 6000);
}
