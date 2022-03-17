export default function findNeighbors(cellRow, cellColumn, userFieldState) {
  const neighbors = [];
  const fieldSize = 10;
    if (cellRow > 1) {
      neighbors.push(userFieldState[cellRow - 1][cellColumn])
    };
    if (cellRow < fieldSize) {
      neighbors.push(userFieldState[cellRow + 1][cellColumn])
    };
    if (cellColumn > 1) {
      neighbors.push(userFieldState[cellRow][cellColumn - 1])
    };
    if (cellColumn < fieldSize) {
      neighbors.push(userFieldState[cellRow][cellColumn + 1])
    };
    if (cellRow > 1 && cellColumn > 1) {
      neighbors.push(userFieldState[cellRow - 1][cellColumn - 1])
    };
    if (cellRow > 1 && cellColumn < fieldSize) {
      neighbors.push(userFieldState[cellRow - 1][cellColumn + 1])
    };
    if (cellRow < fieldSize && cellColumn > 1) {
      neighbors.push(userFieldState[cellRow + 1][cellColumn - 1])
    };
    if (cellRow < fieldSize && cellColumn < fieldSize){
      neighbors.push(userFieldState[cellRow + 1][cellColumn + 1])
    };
    return neighbors;
  };