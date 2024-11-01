const express = require('express');
const indexRouter = require('./routes/index');
const app = express();
require('dotenv').config();
const expressSession = require('express-session');
const flash = require('connect-flash');
const db = require('./config/mongoose-connection');
const cookieParser = require('cookie-parser');
const path = require('path');
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const isLoggedIn = require('./middlewares/isLoggedIn');
const { logout } = require('./controllers/authController');
app.use(flash());
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/', indexRouter)
app.use('/owners', ownersRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);


app.get('/', (req, res) => {
    const error = "" // Or any error message you want to display
    res.render('index', { error })
  })
  
app.get('/logout', logout);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});