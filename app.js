require('dotenv').config();
const express = require('express');
const app = express();
const taskRoutes = require('./routes/tasksRoutes')

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/tasks', taskRoutes);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;