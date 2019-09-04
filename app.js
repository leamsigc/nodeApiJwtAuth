const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
//connect to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
	console.log('Connected to DB');
});
app.use(express.json());
const authRoute = require('./Routes/auth');
const postRoute = require('./Routes/post');

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
	res.send('Hello from the back end');
});
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);

app.listen(PORT, () => {
	console.log(`Server started on ${PORT}`);
});
