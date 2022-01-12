const express = require('express');
const { send } = require('express/lib/response');
const app = express();

app.use(express.json());

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
    res.send(`User ${req.params.id} agregado en localhost`);
});

app.put('/put/:id', (req, res) => {
    console.log(req.body);
    let id_2 = req.params.id;
    id_2 = '123';
    req.params.id = '000';

    res.send(`Usuario ${req.params.id} actualizado al número ${id_2}` );
    console.log(req.params.id);
});

app.delete('/delete/:id', (req, res) => {
    res.send(`Usuario ${req.params.id} eliminado`);
});

app.listen(3000, () => {
    console.log('Server on port 3000');
});