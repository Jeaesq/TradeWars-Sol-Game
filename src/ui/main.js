import { startApp } from './app.js';

startApp().catch((error) => {
  const root = document.querySelector('#app');
  if (root) {
    root.innerHTML = `<h1>Trade Wars: Sol</h1><p>Boot error: ${error.message}</p>`;
  }
  console.error(error);
});
