import {gameConstants} from '../../constants.js';

export default function changeEnemyShipPlacingStatus() {
    gameConstants.enemyShipPlacementStatus = true;
    const enemyShipPlacingStatus = document.querySelector('.enemyShipPlacingStatus');
    if(enemyShipPlacingStatus) {
    enemyShipPlacingStatus.innerHTML = '<p align="center">Somewhere here the enemy ships ...</p>';
    enemyShipPlacingStatus.style.color = 'blue';
    }
}