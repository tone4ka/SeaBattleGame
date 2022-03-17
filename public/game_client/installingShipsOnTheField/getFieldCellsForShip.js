import findNeighbors from './findNeighbors.js'

export default function getFieldCellsForShip(
  shipDragStartCellData,
  eventTargetFieldCell,
  userFieldState
) {
  const fieldSize = 10;
  let validPlace = true;
  if(!shipDragStartCellData) validPlace = false;
  if(!eventTargetFieldCell.classList.contains('cell')) validPlace = false;

  const fieldCellsForShip = [];
  const startdragShipCellNumber = +shipDragStartCellData.numberOfCell;
  const deckCount = +shipDragStartCellData.deckCount;
  const row = +eventTargetFieldCell.classList[1];
  const column = +eventTargetFieldCell.classList[2];
  const {isVertical} = shipDragStartCellData;

  if (
    eventTargetFieldCell.shipCell ||
    eventTargetFieldCell.classList.contains("gameFieldTitleCell")
  )
  validPlace = false;

  if (isVertical) {
    if (
      startdragShipCellNumber > row ||
      deckCount - startdragShipCellNumber + row > fieldSize
    )
    validPlace = false;
  } else {
    if (
      startdragShipCellNumber > column ||
      deckCount - startdragShipCellNumber + column > fieldSize
    )
    validPlace = false;
  };

  let neighbors = [];
  if(userFieldState[row]){
    if(userFieldState[row][column]){
      fieldCellsForShip.push(userFieldState[row][column]);
      neighbors = neighbors.concat(findNeighbors(row, column, userFieldState));
      if (startdragShipCellNumber < deckCount) {
        for (
          let i = startdragShipCellNumber + 1;
          i <= deckCount;
          i++
        ) {
          const currentRow = isVertical ? row + (i - startdragShipCellNumber) : row;
          const currentColumn = isVertical ? column : column + (i - startdragShipCellNumber);
          if(userFieldState[currentRow]){
            if(userFieldState[currentRow][currentColumn]){
              fieldCellsForShip.push(userFieldState[currentRow][currentColumn]);
              neighbors = neighbors.concat(findNeighbors(currentRow, currentColumn, userFieldState));
            }
          }
        }
      }
      if (startdragShipCellNumber > 1) {
        for (
          let i = startdragShipCellNumber - 1;
          i >= 1;
          i--
        ) {
          const currentRow = isVertical ? row - (startdragShipCellNumber - i) : row;
          const currentColumn = isVertical ? column : column - (startdragShipCellNumber - i);
          if(userFieldState[currentRow]){
            if(userFieldState[currentRow][currentColumn]){
              fieldCellsForShip.push(userFieldState[currentRow][currentColumn]);
              neighbors = neighbors.concat(findNeighbors(currentRow, currentColumn, userFieldState));
            }
          }
        }
      }
    }
  }

  const isNeighborsShips = neighbors.some((neighbor) => neighbor.shipCell);
  if (isNeighborsShips) validPlace = false;

  return {
    fieldCellsForShip: fieldCellsForShip,
    validPlace: validPlace
  };
}
