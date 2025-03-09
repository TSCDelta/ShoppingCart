import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = ({ cartItems }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const totalAmount = cartItems
		.reduce((total, item) => total + parseFloat(item.price), 0)
		.toFixed(2);

	const handleCheckout = async () => {
		if (cartItems.length === 0) {
			setError("Your cart is empty.");
			return;
		}

		setLoading(true);
		try {
			const response = await axios.post("http://localhost:3000/api/checkout", {
				cartItems,
			});
			setLoading(false);
			alert(response.data.message);
			navigate("/");
		} catch (err) {
			setLoading(false);
			setError(
				err.response?.data?.message || "An error occurred during checkout."
			);
		}
	};

	return (
		<div className='checkout-page'>
			<h2>Checkout</h2>
			{cartItems.length === 0 ? (
				<p>Your cart is empty. Please add items to your cart.</p>
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
								</div>
							</div>
						))}
					</div>
					<div className='total-amount'>
						<p>Total Amount: ${totalAmount}</p>
					</div>
					{error && <p className='error-message'>{error}</p>}
					<button
						className='checkout-btn'
						onClick={handleCheckout}
						disabled={loading}>
						{loading ? "Processing..." : "Proceed to Payment"}
					</button>
				</>
			)}
		</div>
	);
};

export default CheckoutPage;
