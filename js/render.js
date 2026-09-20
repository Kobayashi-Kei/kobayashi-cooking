function createTag(text, color, size) {
  const tag = document.createElement('span');
  tag.className = size === 'lg' ? 'tag tag--lg' : 'tag';
  tag.style.background = color;
  tag.textContent = text;
  return tag;
}

function createCookTag(cookId, size) {
  const cook = COOKS[cookId];
  if (!cook) return null;
  return createTag(cook.label, cook.color, size);
}

function createCategoryTags(categoryIds, size) {
  return categoryIds
    .map((id) => CATEGORIES[id])
    .filter(Boolean)
    .map((cat) => createTag(cat.label, cat.color, size));
}

function createPhotoElement(dish, className, placeholderText) {
  if (dish.photos && dish.photos.length > 0) {
    const img = document.createElement('img');
    img.className = className;
    img.src = dish.photos[0];
    img.alt = dish.name;
    return img;
  }
  const placeholder = document.createElement('div');
  placeholder.className = className;
  if (placeholderText) {
    placeholder.textContent = placeholderText;
    placeholder.style.display = 'flex';
    placeholder.style.alignItems = 'center';
    placeholder.style.justifyContent = 'center';
    placeholder.style.fontSize = '13px';
    placeholder.style.color = '#B0A08C';
  }
  return placeholder;
}

function createDishCard(dish, detailUrl) {
  const card = document.createElement('a');
  card.className = 'dish-card';
  card.href = detailUrl;

  card.appendChild(createPhotoElement(dish, 'dish-card__photo'));

  const name = document.createElement('div');
  name.className = 'dish-card__name';
  name.textContent = dish.name;
  card.appendChild(name);

  const tags = document.createElement('div');
  tags.className = 'dish-card__tags';
  const cookTag = createCookTag(dish.cook);
  if (cookTag) tags.appendChild(cookTag);
  createCategoryTags(dish.categories).forEach((tag) => tags.appendChild(tag));
  card.appendChild(tags);

  return card;
}

function createRecentCard(dish, detailUrl) {
  const card = document.createElement('a');
  card.className = 'recent-card';
  card.href = detailUrl;

  card.appendChild(createPhotoElement(dish, 'recent-card__photo'));

  const body = document.createElement('div');
  body.className = 'recent-card__body';

  const name = document.createElement('div');
  name.className = 'recent-card__name';
  name.textContent = dish.name;
  body.appendChild(name);

  const tags = document.createElement('div');
  tags.className = 'recent-card__tags';
  const cookTag = createCookTag(dish.cook);
  if (cookTag) tags.appendChild(cookTag);
  createCategoryTags(dish.categories).forEach((tag) => tags.appendChild(tag));
  body.appendChild(tags);

  card.appendChild(body);
  return card;
}
