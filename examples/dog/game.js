var go = $({ image: 'assets/dog.png' });
go.on('update', function (deltaTime) {
  go.rotation += deltaTime * 100; // 강아지가 뱅글뱅글 돕니다.
});
