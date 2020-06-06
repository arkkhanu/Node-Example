const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const ProductController = require("../controllers/products");

const multer = require("multer");
const mkdirp = require("mkdirp");

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		var des = "./uploads/";
		mkdirp.sync(des);
		cb(null, des);
	},
	filename: function(req, file, cb) {
		cb(
			null,
			new Date().toISOString().replace(/:/g, "-") + file.originalname
		);
	}
});
const fileFiler = (req, file, callback) => {
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
		callback(null, true);
	} else {
		callback(null, false);
	}
};
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFiler
});

const Product = require("../models/product", ProductController.products_get_all);

router.get("/");

router.post(
	"/",
	checkAuth,
	upload.single("productImage"),
	ProductController.product_create_product
);

router.get("/:productId", ProductController.products_get_product);

router.patch(
	"/:productId",
	checkAuth,
	ProductController.products_update_product
);

router.delete(
	"/:productId",
	checkAuth,
	ProductController.products_delete_product
);

module.exports = router;
