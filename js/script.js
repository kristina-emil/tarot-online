// ===== Элементы DOM =====
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalDesc = document.getElementById('modalDesc');
const closeModal = document.getElementById('closeModal');

let cards = {};

// ===== Загрузка описаний =====
async function loadDescriptions() {
  try {
    const res = await fetch('data/tarot_descriptions.txt');
    const text = await res.text();

    text.split('\n').forEach(line => {
      const [file, name, desc] = line.split('$');
      if (file && name && desc) {
        cards[file.trim()] = { name: name.trim(), desc: desc.trim() };
      }
    });
  } catch (e) {
    console.error('Ошибка загрузки описаний:', e);
  }
}

// ===== Создание галереи =====
function createGallery() {
  gallery.innerHTML = '';

  Object.entries(cards).forEach(([file, data]) => {
    const thumb = document.createElement('div');
    thumb.className = 'thumb';
    thumb.innerHTML = `
      <div class="img-wrap">
        <img src="images/${file}" alt="${data.name}">
      </div>
      <div class="thumb-caption">${data.name}</div>
    `;
    thumb.addEventListener('click', () => openModal(file, data));
    gallery.appendChild(thumb);
  });
}

// ===== Открытие модалки =====
function openModal(file, data) {
  modalImg.src = `images/${file}`;
  modalName.textContent = data.name;
  modalDesc.textContent = data.desc;
  modal.classList.add('open');
}

// ===== Закрытие модалки =====
closeModal.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('open');
});

// ===== Инициализация галереи при загрузке страницы =====
window.addEventListener('DOMContentLoaded', async () => {
  await loadDescriptions();
  createGallery();
});
