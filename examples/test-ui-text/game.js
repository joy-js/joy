const testEl = document.createElement('div');
testEl.textContent = 'Hello World';
testEl.style.color = 'red';
testEl.onclick = () => alert('click');

const go = $({ el: testEl });
go.alpha = 0.5;
go.on('update', (dt) => {
  go.rotation += dt;
});
