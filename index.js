const express = require('express');
const app = express();
const authApp = require('./authRoutes');




app.use(authApp);
app.use('/', express.static('./public'));

app.listen(3088, () => {
    console.log('Exchangagram Live!')
})