var testEl = document.createElement('div');
testEl.textContent = 'Hello World';
testEl.style.color = 'red';
testEl.onclick = function () { alert('click'); };

var go = $({ el: testEl });
go.alpha = 0.5;
go.on('update', function (deltaTime) {
  go.rotation += deltaTime;
});
