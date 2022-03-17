import findNeighbors from "../../installingShipsOnTheField/findNeighbors.js";

export default function showDeadShip(enemyFieldState, currentShot) {//обводим полностью сбитый корабль пустыми выстрелами
    let emptyNeighbors = [];
    let neighborsShipCells = [];
    function checkNeighbors(row, column){
        const neighbors = findNeighbors(row, column, enemyFieldState);
        emptyNeighbors = emptyNeighbors.concat(neighbors.filter((cell) => !cell.shipCell));
        let newNeighborsShipCells = neighbors.filter((cell) => cell.shipCell);
        newNeighborsShipCells = newNeighborsShipCells.filter((newCell) => {
            return neighborsShipCells.every((oldCell) => {
                return oldCell.row != newCell.row || oldCell.column != newCell.column;
            } );
        })
        neighborsShipCells = neighborsShipCells.concat(newNeighborsShipCells);
        if(newNeighborsShipCells.length) {
            newNeighborsShipCells.forEach((cell) => {
                const newRow = cell.row;
                const newColumn = cell.column;
                checkNeighbors(newRow, newColumn);
            })
        }
    }
    checkNeighbors(currentShot.row, currentShot.column);
    if(neighborsShipCells.every((cell) => !!cell.shottedCell)) {
        const enemyCellNodes = Array.from(document.querySelectorAll('.enemyCell'));
        emptyNeighbors.forEach((cell) => {
            if(!cell.shottedCell){
                cell.shottedCell = true;
                const currentNode = enemyCellNodes.find((cellNode) => {
                    const classArr = Array.from(cellNode.classList);
                    return +classArr[1] == cell.row && +classArr[2] == cell.column;
                });
                const img = document.createElement('img');
                img.style.width = '30px';
                img.style.height = '30px';
                img.src = '../../game_client/assets/badShot.png';
                currentNode.innerHTML = '';
                currentNode.appendChild(img);
            }
        })
    }
}