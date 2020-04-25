import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const dbConfig = require('./app/config/db.config');

const app = express();

let corsOptions = {
  origin: 'http://localhost:4200'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require('./app/models');
const Role = db.role;
let err:any;

db.mongoose
  .connect(`mongodb://${dbConfig.config.HOST}:${dbConfig.config.PORT}/${dbConfig.config.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connect to MocngoDB.');
    initial();
  })
  .catch((err:any) => {
    console.error('Connection error', err);
    process.exit();
  });

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'API online' });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/data.router')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err:any, count:any) => {
    if (!err && count === 0) {
      new Role({
        name: 'user'
      }).save((err:any) => {
        if (err) {
          console.log('error', err);
        }

        console.log('Added user to roles collection');
      });

      new Role({
        name: 'moderator'
      }).save((err:any) => {
        if (err) {
          console.log('error', err);
        }

        console.log('Added moderator to roles collection');
      });

      new Role({
        name: 'admin'
      }).save((err:any) => {
        if (err) {
          console.log('error', err);
        }

        console.log('Added admin to roles collection');
      });
    }
  });
}
