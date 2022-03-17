export default function playSound(soundtrackName) {
  const audioMp = document.createElement('audio');
    audioMp.src = `../../game_client/assets/sounds/${soundtrackName}.mp3`;
    // if (vol) {
      audioMp.play();
    // }
}