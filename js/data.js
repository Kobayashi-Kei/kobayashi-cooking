async function loadDishes(dataPath) {
  const res = await fetch(dataPath);
  if (!res.ok) {
    throw new Error(`料理データの読み込みに失敗しました: ${res.status}`);
  }
  return res.json();
}

function sortByDateDesc(dishes) {
  return [...dishes].sort((a, b) => (a.date < b.date ? 1 : -1));
}
