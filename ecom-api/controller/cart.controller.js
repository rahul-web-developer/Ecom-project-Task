const CartSchema = require("../model/cart.model");

const fetchCart = async (req, res) => {
  try {
    const carts = await CartSchema.find({ user: req.user.uid }).populate(
      "product"
    );

    res.status(200).json(carts);

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    req.body.user = req.user.uid;
    const cart = new CartSchema(req.body);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeToCart = async (req, res) => {
  try {
     
     await CartSchema.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true
    })
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addToCart,
  removeToCart,
  fetchCart,
};
