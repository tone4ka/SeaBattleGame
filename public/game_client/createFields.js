import { userFieldState, enemyFieldState } from "./constants.js";

export default function createFields() {
  const enemyFieldBox = document.querySelector(".enemyFieldBox");
  const userFieldBox = document.querySelector(".userFieldBox");
  for (let i = 0; i <= 10; i++) {
    const currentUserRow = document.createElement("div");
    currentUserRow.classList.add("userFieldRow", `${i}`);
    const currentEnemyRow = document.createElement("div");
    currentEnemyRow.classList.add("enemyFieldRow", `${i}`);
    enemyFieldBox.appendChild(currentEnemyRow);
    userFieldBox.appendChild(currentUserRow);

    for (let j = 0; j <= 10; j++) {
      const userCell = document.createElement("div");
      userCell.classList.add(
        "cell",
        `${i}`,
        `0${j}`,
        `${i == 0 || j == 0 ? "gameFieldTitleCell" : "gameFieldCell"}`
      );
      userCell.innerText = `${userFieldState[i][j].text}`;
      currentUserRow.appendChild(userCell);
      userFieldState[i][j].cellNode = userCell;
      userFieldState[i][j].row = i;
      userFieldState[i][j].column = j;

      const enemyCell = document.createElement("div");
      enemyCell.classList.add(
        "cell",
        `${i}`,
        `0${j}`,
        'enemyCell',
        `${i == 0 || j == 0 ? "gameFieldTitleCell" : "gameFieldCell"}`
      );
      enemyCell.innerText = `${enemyFieldState[i][j].text}`;
      currentEnemyRow.appendChild(enemyCell);
      enemyFieldState[i][j].cellNode = enemyCell;
      enemyFieldState[i][j].row = i;
      enemyFieldState[i][j].column = j;
    }
  }
}
