import React from "react";

const CartItem = ({ item, onRemoveFromCart }) => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				padding: "10px",
			}}>
			<span>{item.name}</span>
			<span>${item.price}</span>
			<button onClick={() => onRemoveFromCart(item)}>Remove</button>
		</div>
	);
};

export default CartItem;
