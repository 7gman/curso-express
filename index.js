const express = require('express');
const req = require('express/lib/request');
const app = express();

function logger(req, res, next){
    console.log("Request recibido");
    next();
};

app.use(express.json());
app.use(logger);

app.all('/user/', (req, res, next) => {
    console.log('Por aquí pasó');
    next();
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

app.listen(3000, () => {
    console.log('Server on port 3000');
});