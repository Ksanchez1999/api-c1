const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

export function playBeep(type) {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

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

  const now = audioCtx.currentTime;

  gainNode.gain.setValueAtTime(1, now);
  
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

  oscillator.start(now);
  
  oscillator.stop(now + 0.2); 
}