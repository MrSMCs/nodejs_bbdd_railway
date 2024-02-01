import express from 'express'
import {pool} from './db.js'
import {PORT} from './config.js'

// la creación de la aplicación web en Nodejs con express
const app = express()

// el puerto de nuestra aplicacion web por defecto va a ser el 3000
app.listen (PORT)
console.log ('servidor en el puerto 3000')

app.get('/', async (req, res) => {
const [rows] = await pool.query('SELECT * FROM users')
res.json(rows)
})

app.get('/ping', async (req, res) => {
    try {
        const [result] = await pool.query(`SELECT "hello world" as RESULT`);
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en la consulta a la base de datos');
    }
});


app.get('/create', async (req, res) => {
    try {
        const result = await pool.query('INSERT INTO users(name) VALUES ("John")');
        console.log(result);  // Agrega este log para ver la respuesta de la inserción en la consola
        if (result.affectedRows > 0) {
            res.json({ success: true, message: "Inserción exitosa" });
        } else {
            res.json({ success: false, message: "La inserción no tuvo éxito" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error en la consulta a la base de datos" });
    }
});

