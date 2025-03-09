const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const products = Array.from({ length: 8 }, (_, i) => ({
	id: i + 1,
	name: `Product ${i + 1}`,
	price: (Math.random() * 100 + 50).toFixed(2),
	image: `https://picsum.photos/200/300?random=${i + 1}`,
}));

app.get("/api/products", (req, res) => res.json(products));

app.post("/api/checkout", (req, res) => {
	const { cartItems } = req.body;
	if (!cartItems || cartItems.length === 0) {
		return res.status(400).json({ message: "Cart is empty" });
	}
	const totalAmount = cartItems.reduce(
		(total, item) => total + parseFloat(item.price),
		0
	);
	res.status(200).json({
		message: "Checkout successful!",
		totalAmount: totalAmount.toFixed(2),
	});
});

app.listen(port, () =>
	console.log(`Server running at http://localhost:${port}`)
);
