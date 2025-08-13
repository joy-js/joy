var go = $({ image: 'assets/dog.png' });
go.on('update', function (deltaTime) {
  go.rotation += deltaTime * 100; // The dog spins around.
});
