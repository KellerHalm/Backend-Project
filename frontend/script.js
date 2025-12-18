const API_BASE = 'http://localhost:5000/api';

const productsContainer = document.getElementById('products-container');
const productDetail = document.getElementById('product-detail');
const detailContent = document.getElementById('detail-content');
const backBtn = document.getElementById('back-btn');

// Функция для отправки запросов с обработкой ошибок
async function apiRequest(url, options = {}) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(error.message || 'Ошибка запроса');
    }

    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    alert(`Ошибка: ${err.message}`);
    return null;
  }
}

// Загрузка списка товаров
async function loadProducts() {
  const products = await apiRequest(`${API_BASE}/products`);
  if (!products) return;

  productsContainer.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p class="price">${product.price} ₽</p>
    `;
    card.addEventListener('click', () => showProductDetail(product._id));
    productsContainer.appendChild(card);
  });
}

// Показ деталей товара
async function showProductDetail(id) {
  const product = await apiRequest(`${API_BASE}/product/${id}`);
  if (!product) return;

  let imgHtml = '';
  if (product.img) {
    imgHtml = `<img src="http://localhost:5000/${product.img}" alt="${product.title}">`;
  }

  detailContent.innerHTML = `
    <h2>${product.title}</h2>
    <p><strong>Описание:</strong> ${product.description}</p>
    <p><strong>Цена:</strong> ${product.price} ₽</p>
    ${imgHtml}
  `;

  productsContainer.classList.add('hidden');
  productDetail.classList.remove('hidden');
}

// Назад к списку
backBtn.addEventListener('click', () => {
  productDetail.classList.add('hidden');
  productsContainer.classList.remove('hidden');
});

// Запуск
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});