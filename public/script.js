const apiUrl = 'http://localhost:5000/items';
const itemsTable = document.getElementById('items-table');
const submitBtn = document.getElementById('submit-btn');
const formTitle = document.getElementById('form-title');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const priceInput = document.getElementById('price');
let editingItemId = null;

async function fetchItems() {
  const response = await fetch(apiUrl);
  const items = await response.json();
  itemsTable.innerHTML = '';
  items.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.description}</td>
      <td>${item.price}</td>
      <td class="actions">
        <button onclick="editItem('${item._id}')">Edit</button>
        <button onclick="deleteItem('${item._id}')">Delete</button>
      </td>
    `;
    itemsTable.appendChild(row);
  });
}

async function handleSubmit() {
  const item = {
    name: nameInput.value,
    description: descriptionInput.value,
    price: parseFloat(priceInput.value),
  };

  if (editingItemId) {
    await fetch(`${apiUrl}/${editingItemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    editingItemId = null;
    formTitle.textContent = 'Add New Item';
    submitBtn.textContent = 'Add Item';
  } else {
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
  }

  nameInput.value = '';
  descriptionInput.value = '';
  priceInput.value = '';
  fetchItems();
}

async function editItem(id) {
  const response = await fetch(`${apiUrl}/${id}`);
  const item = await response.json();
  nameInput.value = item.name;
  descriptionInput.value = item.description;
  priceInput.value = item.price;
  editingItemId = id;
  formTitle.textContent = 'Edit Item';
  submitBtn.textContent = 'Update Item';
}

async function deleteItem(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchItems();
}

submitBtn.addEventListener('click', handleSubmit);

fetchItems();
