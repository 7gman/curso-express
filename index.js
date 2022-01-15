const express = require('express');
const app = express();
const morgan = require('morgan');

// Settings
app.set('appName', 'Fazt Express Tutorial');
app.set('view engine', 'ejs');

// Middlewares
function logger(req, res, next){
    console.log(`Route Received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
};


//Routes
app.use(express.json());
app.use(logger);
app.use(morgan('dev'));

app.all('/user', (req, res, next) => {
    console.log('Por aquí pasó');
    next();
});

app.get('/', (req, res) => {
    const data = [{name: 'Olga'}, {name: 'Fernando'}, {name: 'Luis'}];
    res.render('index.ejs', {people: data});
});

app.get('/user', (req, res) => {
    res.json({
            username: 'Mami',
            lastname: 'Cameron'
        });
});

app.post('/user/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.send(`Post request recibido`);
});

app.put('/user/:id', (req, res) => {
    console.log(req.body);
    req.params.id = '000';

    res.send(`Usuario ${req.params.id} actualizado` );
    console.log(req.params.id);
});

app.delete('/delete/:id', (req, res) => {
    res.send(`Usuario ${req.params.id} eliminado`);
});

app.use(express.static('public'));

app.listen(3000, () => {
    console.log(app.get('appName'));
    console.log('Server on port 3000');
});