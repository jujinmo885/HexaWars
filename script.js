const screens = {
  menu: document.getElementById('main-menu'),
  room: document.getElementById('room-screen'),
  settings: document.getElementById('settings-screen'),
  game: document.getElementById('game-screen')
};

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    const visible = key === name;
    screen.hidden = !visible;
    screen.classList.toggle('active', visible);
  });
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;

  switch (button.dataset.action) {
    case 'start':
      showScreen('game');
      break;
    case 'room':
      showScreen('room');
      break;
    case 'settings':
      showScreen('settings');
      break;
    case 'back':
      showScreen('menu');
      break;
    case 'create-room': {
      const name = document.getElementById('room-name').value.trim() || 'HexaWars Room';
      document.getElementById('room-status').textContent = `“${name}” 방 생성 기능은 온라인 서버 연결 후 활성화됩니다.`;
      break;
    }
  }
});

document.getElementById('contrast-toggle').addEventListener('change', (event) => {
  document.documentElement.style.setProperty('--accent', event.target.checked ? '#ffffff' : '#7bd8ff');
  document.documentElement.style.setProperty('--accent-strong', event.target.checked ? '#ffffff' : '#d8f6ff');
});
