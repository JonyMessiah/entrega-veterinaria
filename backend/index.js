const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const authRoutes = require('./authentication/routes');
const petRoutes = require('./pets/routes');
const paymentRoutes = require('./payments/routes')

mongoose.connect(
  'mongodb://admin:password@localhost:27017/mydatabase', 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
);



const app = express()
const port = 3000

app.use(express.json());
app.use(cors())

app.use("/auth", authRoutes);
app.use("/pets", petRoutes);
app.use("/payments", paymentRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})