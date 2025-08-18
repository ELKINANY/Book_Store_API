const router = require('express').Router();
const upload = require('../middlewares/uploadImage');

router.post('/', upload, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Image uploaded successfully",
    data: req.file
  });
});

module.exports = router;