(async function () {
  const root = document.getElementById('detail-root');
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  try {
    const dishes = await loadDishes('../data/dishes.json');
    const dish = dishes.find((d) => d.id === id);

    if (!dish) {
      root.innerHTML = '';
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'この料理は見つかりませんでした。';
      root.appendChild(empty);
      return;
    }

    document.title = `${dish.name} | 小林の台所`;

    root.appendChild(createPhotoElement(dish, 'detail-photo', '写真', '../'));

    if (dish.photos && dish.photos.length > 1) {
      const thumbs = document.createElement('div');
      thumbs.className = 'detail-thumbs';
      dish.photos.slice(1).forEach((src) => {
        const img = document.createElement('img');
        img.src = '../' + src;
        img.alt = dish.name;
        thumbs.appendChild(img);
      });
      root.appendChild(thumbs);
    }

    const header = document.createElement('div');
    header.className = 'detail-header';

    const title = document.createElement('div');
    title.className = 'detail-title';
    title.textContent = dish.name;
    header.appendChild(title);

    const meta = document.createElement('div');
    meta.className = 'detail-meta';
    const cookTag = createCookTag(dish.cook, 'lg');
    if (cookTag) meta.appendChild(cookTag);
    createCategoryTags(dish.categories, 'lg').forEach((tag) => meta.appendChild(tag));
    const date = document.createElement('span');
    date.className = 'detail-date';
    date.textContent = dish.date;
    meta.appendChild(date);
    header.appendChild(meta);

    root.appendChild(header);

    if (dish.memo) {
      const memoBox = document.createElement('div');
      memoBox.className = 'detail-memo';

      const label = document.createElement('div');
      label.className = 'section-label';
      label.textContent = 'メモ';
      memoBox.appendChild(label);

      const text = document.createElement('div');
      text.className = 'detail-memo__text';
      text.textContent = dish.memo;
      memoBox.appendChild(text);

      root.appendChild(memoBox);
    }
  } catch (err) {
    root.textContent = '料理データの読み込みに失敗しました。';
    console.error(err);
  }
})();
