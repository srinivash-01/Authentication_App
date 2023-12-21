const express = require("express");
const axios = require("axios");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require("path")
const PORT = process.env.PORT || 5000;
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;



const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../client/build");

app.use(express.static(buildPath))

app.get("/*", function(req, res){

    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
      );

})

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  info: {
    age: { type: Number },
    gender: { type: String },
    dob: { type: Date },
    mobileno: { type: String },
  },
  // Add other properties as needed
});


const User = mongoose.model('User', userSchema);








app.use(bodyParser.json()); // Middleware to parse JSON data

app.post("/AddUser", function (req, res, user) {
  const data = req.body.user;
  console.log(data);
  const newUser = new User({
    name: data.name,
    email: data.email,
    password: data.password,
    info: {
      age: null,
      gender: null,
      dob: null,
      mobileno: null
    }
  });

  
    newUser.save()
    .then((savedUser) => {
      // Send the saved user data back to the client
      res.json(savedUser);
    })
    .catch((error) => {
      console.error('Error saving user:', error.keyValue);
      res.status(500).json({ message: error.keyValue });
    });
  

  

});

app.post("/SignIn", function (req, res) {
  const data = req.body.user;
  console.log(data);

  User.findOne({ email: data.Email })
    .then((user) => {
      if (user) {
        // Compare the provided password with the stored password in the database
        if (data.Password === user.password) {
          console.log('Password is correct. User found:', user);
          res.json(user);
        } else {
          console.log('Incorrect password');
          res.status(401).json({ message: 'Incorrect password' });
        }
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((error) => {
      console.error('Error finding user:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});



app.post('/api/user', async (req, res) => {
  const { email, info } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // Create a new user if not found
      user = new User(req.body);
      await user.save();
      res.status(201).json({ message: 'User created successfully', user });
    } else {
      // Update existing user data
      user.info = { ...user.info, ...info };
      await user.save();
      res.json({ message: 'User data updated successfully', user });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.listen(PORT, () => {
  console.log(`The App listening on port ${PORT}`);
});