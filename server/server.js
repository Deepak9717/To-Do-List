require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routers/todo');

const app = express();
const port = process.env.PORT || 8000;

connectDB();

app.use(cors({origin:true, credentials: true}));
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
   res.send('Server up and running :)')
});

app.use('/api/todo', routes);

app.listen(port, () => console.log('> Server is up and running on port : ' + port))