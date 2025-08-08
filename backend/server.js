const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Book = require('./models/Book.JS');
const Customer = require('./models/Customer.JS');
const Order = require('./models/Order.JS');
const Payment = require('./models/Payment.JS');


const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Replace this with your own MongoDB Atlas URI:
mongoose.connect('mongodb+srv://230953:1234@cluster0.aewlaov.mongodb.net/OnlineBookStoreSystem?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  

// ➕ GET all books
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// ➕ POST new book
app.post('/books', async (req, res) => {
  const { title, author, price, stock } = req.body;
  const book = new Book({ title, author, price, stock });
  await book.save();
  res.json(book);
});

// ❌ DELETE a book
app.delete('/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});


app.get('/customers', async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

app.post('/customers', async (req, res) => {
  const { name, email, address } = req.body;
  const customer = new Customer({ name, email, address });
  await customer.save();
  res.json(customer);
});


app.get('/orders', async (req, res) => {
  const orders = await Order.find().populate('customerId').populate('bookId');
  res.json(orders);
});

app.post('/orders', async (req, res) => {
  const { customerId, bookId, quantity } = req.body;
  const order = new Order({ customerId, bookId, quantity });
  await order.save();
  res.json(order);
});


app.get('/payments', async (req, res) => {
  const payments = await Payment.find().populate({
    path: 'orderId',
    populate: { path: 'bookId customerId' }
  });
  res.json(payments);
});

app.post('/payments', async (req, res) => {
  const { orderId, amount, method } = req.body;
  const payment = new Payment({ orderId, amount, method });
  await payment.save();
  res.json(payment);
});





// ▶️ Run the server
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
