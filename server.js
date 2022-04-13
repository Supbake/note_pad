const express = require('express');
const app = express();
const PORT = 3001;
const apiRoutes = require('./Develop/public/routes/api');
const htmlRoutes = require('./Develop/public/routes/html');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => {

    console.log(`Working on port ${PORT}`);
})