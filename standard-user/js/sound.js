
export function playBeep(type) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  if (type === 'success') {
    oscillator.frequency.value = 880; 
    oscillator.type = 'sine';
  } else {
    oscillator.frequency.value = 220; 
    oscillator.type = 'square';
  }

  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);
  setTimeout(() => { oscillator.stop(); audioCtx.close(); }, 200);
}

