const fieldsBoxTemplate =     `
<div class="fieldsBox">
  <div ondragover="event.preventDefault()" dragenter="event.preventDefault()" class="userFieldBox">
    <div class="userShipPlacingStatus">
      <p align="center">Our ships</p>
    </div>
  </div>
  <div class="enemyFieldBox">
    <div class="enemyShipPlacingStatus">
      <p align="center">The enemy has not yet finished placing the ships</p>
    </div>
  </div>
</div>
`;

export default fieldsBoxTemplate;
