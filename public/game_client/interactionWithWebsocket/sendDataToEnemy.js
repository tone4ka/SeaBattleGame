import { userFieldState, gameConstants  } from "../constants.js";

export default function sendDataToEnemy(event) {
    const sendDataToEnemy = new Event('sendDataToEnemy');
    sendDataToEnemy.detail = {
        field: [...userFieldState],
        currentEvent: event,
        gameConstants: gameConstants
    };
    const container = document.querySelector('.container');
    container.dispatchEvent(sendDataToEnemy);
}