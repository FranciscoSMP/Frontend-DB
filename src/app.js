const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'bibliotecaapp', resave: false, saveUninitialized: false }));
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Routes
app.use(require('./routes/rutasPrincipales'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
