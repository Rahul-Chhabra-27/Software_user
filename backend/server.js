const express = require('express');
const dotenv = require('dotenv');
const { application } = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');

const denv = dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded( { extended:false }))

app.use('/api/goals',require('./routes/goalRoutes'));
app.use(errorHandler)
app.listen(PORT,() => console.log(`server is started on port ${PORT}`));
