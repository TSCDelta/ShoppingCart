import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount, onToggleCart }) => {
	return (
		<nav className='navbar'>
			<h1>🛍️ MyShop</h1>
			<div className='nav-links'>
				<Link to='/'>Home</Link>
				<Link to='/products'>Products</Link>
				<Link to='/about'>About</Link>
			</div>
			<button className='cart-btn' onClick={onToggleCart}>
				🛒 {cartCount}
			</button>
		</nav>
	);
};

export default Navbar;
