import { enemyFieldState, gameConstants } from "../../constants.js";
import sendDataToEnemy from "../sendDataToEnemy.js";
import changeShotStatus from "./changeShotStatus.js";
import showDeadShip from "./showDeadShip.js";
import showCongratulations from "./showCongratulations.js";
import playSound from "../../playSound.js";

export default function shot(cell) {
    const currentRow = +cell.classList[1];
    const currentColumn = +cell.classList[2];
    if(
        !enemyFieldState[currentRow][currentColumn].shottedCell && 
        gameConstants.enemyShipPlacementStatus &&
        !cell.classList.contains('gameFieldTitleCell')
        ){
        const img = document.createElement('img');
        img.style.width = '30px';
        img.style.height = '30px';
        gameConstants.currentShot = {
            row: currentRow,
            column: currentColumn
        }
        enemyFieldState[currentRow][currentColumn].shottedCell = true;
        if(enemyFieldState[currentRow][currentColumn].shipCell){
            playSound('goodShot');
            img.src = '../../game_client/assets/goodShot.png';
            sendDataToEnemy('goodShot');
            showDeadShip(enemyFieldState, gameConstants.currentShot);
            gameConstants.enemyShottedCells += 1;
            if(gameConstants.enemyShottedCells === 20) showCongratulations();
        } else {
            playSound('badShot');
            img.src = '../../game_client/assets/badShot.png';
            gameConstants.userShotStatus = false;
            gameConstants.enemyShotStatus = true;
            sendDataToEnemy('badShot');
            changeShotStatus();
        };
        cell.appendChild(img);
    }

}