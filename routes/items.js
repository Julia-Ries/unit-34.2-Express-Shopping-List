const express = require("express");
const Item = require('../item');
const router = new express.Router();



// GET /items
router.get('', (req, res, next) => {
  try {
    return res.json({ items: Item.findAll() });
  } catch(err){
    return next(err)
  }
});


// POST/items
router.post('', (req, res, next) => {
  try {
    let newItem = new Item(req.body.name, req.body.price);
    return res.json({item:newItem});
  } catch (e) {
    return next(e)
    }
  });

  //GET/items//:name
router.get('/:name', (req,res, next) => {
  try {
    let foundItem = Item.find(req.params.name);
    return res.json({item: foundItem});
  } catch (e){
    return next(e)
  }
});



//PATCH/items/:name
router.patch('/:name', (req,res, next) => {
  try {
    let foundItem = Item.update(req.params.name, req.body);
    return res.json({item: foundItem});
  } catch (e){
    return next(e)
  }
});

//DELETE/items/:name
router.delete("/:name", (req, res, next) => {
  try{
    Item.remove(req.params.name);
    return res.json({message: "DELETED"})
  } catch (e) {
    return next(e)
  }
});



module.exports = router;

