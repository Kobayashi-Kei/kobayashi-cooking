(async function () {
  const grid = document.getElementById('dish-grid');
  const countEl = document.getElementById('dish-count');
  const cookFilterEl = document.getElementById('cook-filter');
  const categoryFilterEl = document.getElementById('category-filter');

  let allDishes = [];
  let activeCook = 'all';
  const activeCategories = new Set();

  function buildCookChips() {
    const cooks = [{ id: 'all', label: 'すべて' }, ...Object.entries(COOKS).map(([id, c]) => ({ id, label: c.label }))];
    cooks.forEach(({ id, label }) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'filter-chip' + (id === activeCook ? ' is-active' : '');
      chip.textContent = label;
      chip.dataset.cook = id;
      chip.addEventListener('click', () => {
        activeCook = id;
        renderChips();
        renderGrid();
      });
      cookFilterEl.appendChild(chip);
    });
  }

  function buildCategoryChips() {
    const cats = [{ id: 'all', label: 'すべて' }, ...Object.entries(CATEGORIES).map(([id, c]) => ({ id, label: c.label }))];
    cats.forEach(({ id, label }) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'filter-chip';
      chip.textContent = label;
      chip.dataset.category = id;
      chip.addEventListener('click', () => {
        if (id === 'all') {
          activeCategories.clear();
        } else if (activeCategories.has(id)) {
          activeCategories.delete(id);
        } else {
          activeCategories.add(id);
        }
        renderChips();
        renderGrid();
      });
      categoryFilterEl.appendChild(chip);
    });
  }

  function renderChips() {
    cookFilterEl.querySelectorAll('.filter-chip').forEach((chip) => {
      chip.classList.toggle('is-active', chip.dataset.cook === activeCook);
    });
    categoryFilterEl.querySelectorAll('.filter-chip').forEach((chip) => {
      const isAllChip = chip.dataset.category === 'all';
      const active = isAllChip ? activeCategories.size === 0 : activeCategories.has(chip.dataset.category);
      chip.classList.toggle('is-active', active);
    });
  }

  function filteredDishes() {
    return sortByDateDesc(allDishes).filter((dish) => {
      const cookMatch = activeCook === 'all' || dish.cook === activeCook;
      const categoryMatch = activeCategories.size === 0 || dish.categories.some((c) => activeCategories.has(c));
      return cookMatch && categoryMatch;
    });
  }

  function renderGrid() {
    grid.innerHTML = '';
    const dishes = filteredDishes();
    countEl.textContent = `${dishes.length}件`;

    if (dishes.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = '条件に合う料理がありません。';
      grid.appendChild(empty);
      return;
    }

    dishes.forEach((dish) => {
      grid.appendChild(createDishCard(dish, `detail.html?id=${encodeURIComponent(dish.id)}`));
    });
  }

  try {
    allDishes = await loadDishes('../data/dishes.json');
    buildCookChips();
    buildCategoryChips();
    renderGrid();
  } catch (err) {
    grid.textContent = '料理データの読み込みに失敗しました。';
    console.error(err);
  }
})();
