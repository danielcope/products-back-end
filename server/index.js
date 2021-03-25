require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const controller = require('./controller')

const { port,connection_string } = process.env;
app.use(express.json())

//--------Endpoints

app.get('/api/products',controller.getAll)
app.get('/api/products/:id',controller.getOne)
app.put('/api/products',controller.update)
app.post('/api/products',controller.create)
app.delete('/api/products',controller.delete)



//-----------------


massive ({
  connectionString: connection_string,
  ssl:{
    rejectUnauthorized:false
  }
})
  .then(dbInst => {
    app.set('db',dbInst)
      
    app.listen(port,() => console.log(`Server running on port` + port))
  })
  .catch(err => console.log(err))
