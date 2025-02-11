// import { useState, useEffect } from "react";
// import { FaTrash } from "react-icons/fa";
// import Footer from '../components/Footer';
// import { useNavigate } from "react-router-dom";


// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const shippingFee = 10; // Static shipping fee

//   useEffect(() => {
//     const cartData = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(cartData);
//     calculateSubtotal(cartData);
//   }, []);

//   const calculateSubtotal = (cartItems) => {
//     const total = cartItems.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
//     setSubtotal(total);
//   };

//   const updateQuantity = (index, quantity) => {
//     if (quantity < 1) return;

//     const updatedCart = [...cart];
//     updatedCart[index].quantity = quantity;
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     calculateSubtotal(updatedCart);
//   };

//   const removeItem = (index) => {
//     const updatedCart = [...cart];
//     updatedCart.splice(index, 1);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     calculateSubtotal(updatedCart);
//   };

//   const navigate = useNavigate(); 

//   return (
//     <div className="container my-5">
//       <h2 className="fw-bold text-center">YOUR CART</h2>

//       {cart.length === 0 ? (
//         <h4 className="text-center my-4">Your cart is empty.</h4>
//       ) : (
//         <>
//           <table className="table mt-4">
//             <thead>
//               <tr>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Size</th>
//                 <th>Quantity</th>
//                 <th>Remove</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.map((item, index) => (
//                 <tr key={index}>
//                   <td className="d-flex align-items-center">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="img-thumbnail me-3"
//                       style={{ width: "80px", height: "80px" }}
//                     />
//                     {item.name}
//                   </td>
//                   <td>${item.price}</td>
//                   <td>
//                     <button className="btn btn-outline-dark btn-sm">
//                       {item.size}
//                     </button>
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       onChange={(e) =>
//                         updateQuantity(index, parseInt(e.target.value))
//                       }
//                       className="form-control"
//                       style={{ width: "60px" }}
//                     />
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => removeItem(index)}
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="row">
//             <div className="col-md-6 offset-md-6">
//               <div className="border p-4 rounded">
//                 <h4 className="fw-bold">CART TOTALS</h4>
//                 <p className="d-flex justify-content-between">
//                   <span>Subtotal:</span>
//                   <strong>${subtotal.toFixed(2)}</strong>
//                 </p>
//                 <p className="d-flex justify-content-between">
//                   <span>Shipping Fee:</span>
//                   <strong>${shippingFee.toFixed(2)}</strong>
//                 </p>
//                 <hr />
//                 <p className="d-flex justify-content-between fs-5 fw-bold">
//                   <span>Total:</span>
//                   <span>${(subtotal + shippingFee).toFixed(2)}</span>
//                 </p>
//                 <button
//                   className="btn btn-dark w-100"
//                   onClick={() =>
//                     navigate("/checkout", {
//                       state: { cart, subtotal, shippingFee },
//                     })
//                   }
//                 >
//                   PROCEED TO CHECKOUT
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       <Footer/>
//     </div>
//   );
// };

// export default Cart;



import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const shippingFee = 10; // Static shipping fee

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
    calculateSubtotal(cartData);
  }, []);

  const calculateSubtotal = (cartItems) => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  };

  const updateQuantity = (index, quantity) => {
    if (quantity < 1) return;

    const updatedCart = [...cart];
    updatedCart[index].quantity = quantity;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateSubtotal(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateSubtotal(updatedCart);
  };

  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container my-5 flex-grow-1">
        <h2 className="fw-bold text-center">YOUR CART</h2>

        {cart.length === 0 ? (
          <h4 className="text-center my-4">Your cart is empty.</h4>
        ) : (
          <>
            <table className="table mt-4">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-thumbnail me-3"
                        style={{ width: "80px", height: "80px" }}
                      />
                      {item.name}
                    </td>
                    <td>${item.price}</td>
                    <td>
                      <button className="btn btn-outline-dark btn-sm">
                        {item.size}
                      </button>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(index, parseInt(e.target.value))
                        }
                        className="form-control"
                        style={{ width: "60px" }}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeItem(index)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="row">
              <div className="col-md-6 offset-md-6">
                <div className="border p-4 rounded">
                  <h4 className="fw-bold">CART TOTALS</h4>
                  <p className="d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <strong>${subtotal.toFixed(2)}</strong>
                  </p>
                  <p className="d-flex justify-content-between">
                    <span>Shipping Fee:</span>
                    <strong>${shippingFee.toFixed(2)}</strong>
                  </p>
                  <hr />
                  <p className="d-flex justify-content-between fs-5 fw-bold">
                    <span>Total:</span>
                    <span>${(subtotal + shippingFee).toFixed(2)}</span>
                  </p>
                  <button
                    className="btn btn-dark w-100"
                    onClick={() =>
                      navigate("/checkout", {
                        state: { cart, subtotal, shippingFee },
                      })
                    }
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer Positioned Properly */}
      <Footer />
    </div>
  );
};

export default Cart;

