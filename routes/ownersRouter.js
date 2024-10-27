const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owners-model');

router.get('/', (req, res) => {
    res.send('Hello, this is the owners route!');
});

if (process.env.NODE_ENV === 'development') {
    router.post("/create", async function (req, res) {
      let owners = await ownerModel.find();
      if (owners.length > 0) {
        return res.send(503, "You don't have permission to create an owner");
      }
      let {fullname, email, password} = req.body;
      let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
      });
      res.status(201).send(createdOwner);
    });
  }


module.exports = router;