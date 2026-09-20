(async function () {
  const container = document.getElementById('recent-dishes');
  try {
    const dishes = await loadDishes('data/dishes.json');
    const recent = sortByDateDesc(dishes).slice(0, 3);

    if (recent.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'まだ料理が登録されていません。';
      container.appendChild(empty);
      return;
    }

    recent.forEach((dish) => {
      container.appendChild(createRecentCard(dish, `dishes/detail.html?id=${encodeURIComponent(dish.id)}`));
    });
  } catch (err) {
    container.textContent = '料理データの読み込みに失敗しました。';
    console.error(err);
  }
})();
