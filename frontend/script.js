// 🔗 API endpoints
const API = {
  books: 'http://localhost:3000/books',
  customers: 'http://localhost:3000/customers',
  orders: 'http://localhost:3000/orders',
  payments: 'http://localhost:3000/payments'
};

// ===================== BOOKS =====================
async function loadBooks() {
  const res = await fetch(API.books);
  const books = await res.json();
  const list = document.getElementById('bookList');
  list.innerHTML = '';
  books.forEach(book => {
    const li = document.createElement('li');
    li.innerHTML = `${book.title} by ${book.author} — $${book.price} [Stock: ${book.stock}]
      <button onclick="deleteBook('${book._id}')">Delete</button>`;
    list.appendChild(li);
  });
}

async function addBook(e) {
  e.preventDefault();
  const data = {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    price: parseFloat(document.getElementById('price').value),
    stock: parseInt(document.getElementById('stock').value)
  };
  await fetch(API.books, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  e.target.reset();
  loadBooks();
}

async function deleteBook(id) {
  await fetch(`${API.books}/${id}`, { method: 'DELETE' });
  loadBooks();
}

// ===================== CUSTOMERS =====================
async function loadCustomers() {
  const res = await fetch(API.customers);
  const customers = await res.json();
  const list = document.getElementById('customerList');
  list.innerHTML = '';
  customers.forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `${c.name} (${c.email}) — ${c.address}
      <button onclick="deleteCustomer('${c._id}')">Delete</button>`;
    list.appendChild(li);
  });
}

async function addCustomer(e) {
  e.preventDefault();
  const data = {
    name: document.getElementById('custName').value,
    email: document.getElementById('custEmail').value,
    address: document.getElementById('custAddress').value
  };
  await fetch(API.customers, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  e.target.reset();
  loadCustomers();
}

async function deleteCustomer(id) {
  await fetch(`${API.customers}/${id}`, { method: 'DELETE' });
  loadCustomers();
}

// ===================== ORDERS =====================
async function loadOrders() {
  const res = await fetch(API.orders);
  const orders = await res.json();
  const list = document.getElementById('orderList');
  list.innerHTML = '';
  orders.forEach(o => {
    const li = document.createElement('li');
    li.innerHTML = `Order: ${o.quantity}x "${o.bookId?.title}" by ${o.customerId?.name}
      <button onclick="deleteOrder('${o._id}')">Delete</button>`;
    list.appendChild(li);
  });
}


async function populateOrderDropdowns() {
  const customerRes = await fetch(API.customers);
  const customers = await customerRes.json();
  const customerSelect = document.getElementById('orderCustomerId');
  customerSelect.innerHTML = '<option disabled selected>Select Customer</option>';
  customers.forEach(c => {
    const option = document.createElement('option');
    option.value = c._id;
    option.textContent = `${c.name} (${c.email})`;
    customerSelect.appendChild(option);
  });

  const bookRes = await fetch(API.books);
  const books = await bookRes.json();
  const bookSelect = document.getElementById('orderBookId');
  bookSelect.innerHTML = '<option disabled selected>Select Book</option>';
  books.forEach(b => {
    const option = document.createElement('option');
    option.value = b._id;
    option.textContent = `${b.title} by ${b.author}`;
    bookSelect.appendChild(option);
  });
}

async function addOrder(e) {
  e.preventDefault();
  const data = {
    customerId: document.getElementById('orderCustomerId').value,
    bookId: document.getElementById('orderBookId').value,
    quantity: parseInt(document.getElementById('orderQuantity').value)
  };
  await fetch(API.orders, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  e.target.reset();
  loadOrders();
}

async function deleteOrder(id) {
  await fetch(`${API.orders}/${id}`, { method: 'DELETE' });
  loadOrders();
}

// ===================== PAYMENTS =====================
async function loadPayments() {
  const res = await fetch(API.payments);
  const payments = await res.json();
  const list = document.getElementById('paymentList');
  list.innerHTML = '';
  payments.forEach(p => {
    const li = document.createElement('li');
    const bookTitle = p.orderId?.bookId?.title || "Unknown Book";
    const custName = p.orderId?.customerId?.name || "Unknown Customer";
    li.innerHTML = `💳 ${p.amount} via ${p.method} for "${bookTitle}" by ${custName}
      <button onclick="deletePayment('${p._id}')">Delete</button>`;
    list.appendChild(li);
  });
}
async function populatePaymentDropdown() {
  const res = await fetch(API.orders);
  const orders = await res.json();
  const paymentSelect = document.getElementById('paymentOrderId');
  paymentSelect.innerHTML = '<option disabled selected>Select Order</option>';
  orders.forEach(order => {
    const bookTitle = order.bookId?.title || "Unknown Book";
    const customerName = order.customerId?.name || "Unknown Customer";
    const option = document.createElement('option');
    option.value = order._id;
    option.textContent = `${order.quantity}x ${bookTitle} for ${customerName}`;
    paymentSelect.appendChild(option);
  });
}

async function addPayment(e) {
  e.preventDefault();
  const data = {
    orderId: document.getElementById('paymentOrderId').value,
    amount: parseFloat(document.getElementById('paymentAmount').value),
    method: document.getElementById('paymentMethod').value
  };
  await fetch(API.payments, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  e.target.reset();
  loadPayments();
}

async function deletePayment(id) {
  await fetch(`${API.payments}/${id}`, { method: 'DELETE' });
  loadPayments();
}

// ========== INITIALIZE ==========
document.getElementById('bookForm').addEventListener('submit', addBook);
document.getElementById('customerForm').addEventListener('submit', addCustomer);
document.getElementById('orderForm').addEventListener('submit', addOrder);
document.getElementById('paymentForm').addEventListener('submit', addPayment);

loadBooks();
loadCustomers();
loadOrders();
loadPayments();
populateOrderDropdowns();
populatePaymentDropdown();
