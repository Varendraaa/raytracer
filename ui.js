import { addObjectToScene } from './main.js';

document.getElementById('add').addEventListener('click', () => {
  const type = document.getElementById('type').value;
  const x = parseFloat(document.getElementById('x').value || 0);
  const y = parseFloat(document.getElementById('y').value || 0);
  const z = parseFloat(document.getElementById('z').value || 0);
  const size = parseFloat(document.getElementById('size').value || 1);
  const color = document.getElementById('color').value;

  const objectData = {
    type,
    position: { x, y, z },
    size,
    color
  };

  addObjectToScene(objectData);
});
