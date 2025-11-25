let productos = [];
let editIndex = null;

const form = document.getElementById('product-form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const stockInput = document.getElementById('stock');
const tableBody = document.getElementById('product-table-body');

function cargarDesdeStorage() {
  const data = localStorage.getItem('productos');
  if (data) {
    productos = JSON.parse(data);
    renderTabla();
  }
}

function guardarEnStorage() {
  localStorage.setItem('productos', JSON.stringify(productos));
}

function renderTabla() {
  tableBody.innerHTML = '';
  productos.forEach((p, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${p.nombre}</td>
      <td>${p.precio}</td>
      <td>${p.stock}</td>
      <td>
        <button class="edit" onclick="editarProducto(${index})">Editar</button>
        <button onclick="eliminarProducto(${index})">Eliminar</button>
      </td>
    `;

    tableBody.appendChild(tr);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const producto = {
    nombre: nameInput.value,
    precio: parseFloat(priceInput.value),
    stock: parseInt(stockInput.value)
  };

  if (editIndex === null) {
    // CREATE
    productos.push(producto);
  } else {
    // UPDATE
    productos[editIndex] = producto;
    editIndex = null;
  }

  guardarEnStorage();
  renderTabla();
  form.reset();
});

function editarProducto(index) {
  const p = productos[index];
  nameInput.value = p.nombre;
  priceInput.value = p.precio;
  stockInput.value = p.stock;
  editIndex = index;
}

function eliminarProducto(index) {
  productos.splice(index, 1);
  guardarEnStorage();
  renderTabla();
}

// DELETE ALL (si lo necesitas luego)
// function eliminarTodo() {
//   productos = [];
//   guardarEnStorage();
//   renderTabla();
// }

cargarDesdeStorage();

// Para que las funciones sean accesibles desde el HTML
window.editarProducto = editarProducto;
window.eliminarProducto = eliminarProducto;
