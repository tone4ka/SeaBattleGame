export default function getShipDragStartCellData (shipCells, cursorStartCoordinates) {
  const cellSize = 30;
    return shipCells.find((cell) => {
      return (
        cell.left < cursorStartCoordinates.left &&
        cell.left + cellSize >
          cursorStartCoordinates.left &&
        cell.top < cursorStartCoordinates.top &&
        cell.top + cellSize >
          cursorStartCoordinates.top
      );
    });
}