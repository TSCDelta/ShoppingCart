import React from "react";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ cartItems, isOpen, onClose, onRemoveFromCart }) => {
	const navigate = useNavigate();

	const handleCheckoutRedirect = () => {
		if (cartItems.length === 0) {
			alert("Your cart is empty. Add items to proceed to checkout.");
			return;
		}
		navigate("/checkout");
	};

	return (
		<>
			<div
				className={`overlay ${isOpen ? "show" : ""}`}
				onClick={onClose}></div>
			<div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
				<button className='close-btn' onClick={onClose}>
					×
				</button>
				<h2>Your Cart</h2>
				{cartItems.length === 0 ? (
					<p className='empty-cart'>Your cart is empty.</p>
				) : (
					<>
						<div className='cart-items'>
							{cartItems.map((item, index) => (
								<div key={index} className='cart-item'>
									<img src={item.image} alt={item.name} />
									<div className='cart-item-details'>
										<p>{item.name}</p>
										<p>
											<strong>${item.price}</strong>
										</p>
										<button onClick={() => onRemoveFromCart(item)}>
											Remove
										</button>
									</div>
								</div>
							))}
						</div>
						<button className='checkout-btn' onClick={handleCheckoutRedirect}>
							Proceed to Checkout
						</button>
					</>
				)}
			</div>
		</>
	);
};

export default CartSidebar;
