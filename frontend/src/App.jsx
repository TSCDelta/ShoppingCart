import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import ProductList from "./components/ProductList";
import CartSidebar from "./components/CartSidebar";
import Navbar from "./components/Navbar";
import CheckoutPage from "./components/CheckoutPage";
import "./styles.css";

const App = () => {
	const [products, setProducts] = useState([]);
	const [cartItems, setCartItems] = useState(() => {
		return JSON.parse(localStorage.getItem("cart")) || [];
	});

	const [isCartOpen, setIsCartOpen] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:3000/api/products")
			.then((res) => setProducts(res.data))
			.catch((error) => console.error("Error fetching products:", error));
	}, []);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cartItems));
	}, [cartItems]);

	const handleAddToCart = (product) => setCartItems([...cartItems, product]);
	const handleRemoveFromCart = (product) =>
		setCartItems(cartItems.filter((item) => item.id !== product.id));
	const handleToggleCart = () => setIsCartOpen(!isCartOpen);

	return (
		<Router>
			<Navbar cartCount={cartItems.length} onToggleCart={handleToggleCart} />
			<div className='container'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='/products'
						element={
							<ProductList products={products} onAddToCart={handleAddToCart} />
						}
					/>
					<Route path='/about' element={<About />} />
					<Route
						path='/checkout'
						element={<CheckoutPage cartItems={cartItems} />}
					/>
				</Routes>
			</div>
			<CartSidebar
				isOpen={isCartOpen}
				cartItems={cartItems}
				onRemoveFromCart={handleRemoveFromCart}
				onClose={handleToggleCart}
			/>
		</Router>
	);
};

export default App;
