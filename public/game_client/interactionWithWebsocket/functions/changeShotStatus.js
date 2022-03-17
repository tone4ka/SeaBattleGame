import { gameConstants } from "../../constants.js";

export default function changeShotStatus() {
    const title = document.querySelector('h4');
    if(title){
        if(gameConstants.enemyShotStatus) {
            title.innerHTML = 'The enemy shoots now';
            title.style.color = 'red';
        };
        if(gameConstants.userShotStatus) {
            title.innerHTML = "Let's shoot!";
            title.style.color = 'blue';
        }
    }
}