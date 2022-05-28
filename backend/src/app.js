const express = require('express');
require('./db/conn');
const userRouter = require('./router/user-router');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8000;


app.use(cors({ origin: 'http://localhost:4200' }));
app.use(cors());
// app.use(express.json());  // we are not using this method then data will not saved in db only id will be save
app.use(bodyParser.json());  // we are not using this method then data will not saved in db only id will be save
app.use('/userapi', userRouter);


app.listen(port, () => {
    console.log(`Server is listening the Port No: ${port}`);
})