import { userFieldState } from "../constants.js";
import getFieldCellsForShip from "./getFieldCellsForShip.js";
import getShipDragStartCellData from './getShipDragStartCellData.js';

export default function installShipOnTheField(
  cursorStartCoordinates,
  shipCells,
  dropFieldCell,
  draggedShip
) {
  const shipDragStartCellData = getShipDragStartCellData (shipCells, cursorStartCoordinates);

  const fieldCellsDataForShip = getFieldCellsForShip (shipDragStartCellData, dropFieldCell, userFieldState);
  if(fieldCellsDataForShip.validPlace) {
    for(let i = 0; i < fieldCellsDataForShip.fieldCellsForShip.length; i += 1) {
      fieldCellsDataForShip.fieldCellsForShip[i].shipCell = shipCells[i].cell;
      fieldCellsDataForShip.fieldCellsForShip[i].cellNode.style.backgroundColor = 'coral';// какие-то отступы светились, тоже костыльное решение?
      fieldCellsDataForShip.fieldCellsForShip[i].cellNode.appendChild(shipCells[i].cell);
      shipCells[i].cell.classList.remove('notInstalledShipCell');//ховер убрираю(можно было по-другому это сделать:\)
    }
    draggedShip.innerHTML = '';
    return true;
  };
  return false;
}
