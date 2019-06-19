export function getSticks() {
  const sticks = localStorage.getItem('sticks');
  if (sticks) {
    try {
      return JSON.parse(sticks)
    } catch(e) {
      return []
    }
  }
  return []
}

export function setSticks(sticks) {
  localStorage.setItem('sticks', JSON.stringify(sticks));
}