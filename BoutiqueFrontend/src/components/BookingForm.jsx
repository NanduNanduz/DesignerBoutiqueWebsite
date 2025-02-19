// import React, { useState } from "react";
// import Footer from "../components/Footer";

// const AppointmentForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     preferredDate: "",
//     address: "",
//     message: "",
//     mobile: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

// const handleSubmit = (e) => {
//   e.preventDefault();

//   const phoneNumber = "+916238738546";
//   const message = `Hello, I would like to schedule an appointment.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPreferred Date: ${formData.preferredDate}\nAddress: ${formData.address}\nMessage: ${formData.message}`;

//   // Encode the message for URL
//   const encodedMessage = encodeURIComponent(message);

//   // Construct WhatsApp URL
//   const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

//   // Open in new tab
//   window.open(whatsappURL, "_blank");
// };

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="flex-grow flex items-center justify-center py-10">
//         <div className="bg-white p-5 rounded-xl shadow-lg w-full max-w-xs">
//           <h2
//             className="text-center text-lg font-semibold mb-3"
//             style={{ color: "#A48374" }}
//           >
//             Schedule Appointment
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-2">
//               <input
//                 type="text"
//                 name="name"
//                 className="form-control py-2"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-2">
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control py-2"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-2">
//               <input
//                 type="date"
//                 name="preferredDate"
//                 className="form-control py-2"
//                 value={formData.preferredDate}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-2">
//               <input
//                 type="text"
//                 name="address"
//                 className="form-control py-2"
//                 placeholder="Address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-2">
//               <input
//                 type="text"
//                 name="mobile"
//                 className="form-control py-2"
//                 placeholder="Mobile Number"
//                 value={formData.mobile}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-2">
//               <textarea
//                 name="message"
//                 className="form-control py-2"
//                 placeholder="Message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//               ></textarea>
//             </div>
//             <div className="flex justify-center">
//               <button
//                 style={{ backgroundColor: "#A48374" , }}
//                 type="submit"
//                 className="btn btn-success w-auto px-5 py-2"
//               >
//                 Send via WhatsApp
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AppointmentForm;


import React, { useState } from "react";
import Footer from "../components/Footer"; // Keep Footer outside
import { useNavigate } from "react-router-dom"; 

const AppointmentForm = () => {


   const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preferredDate: "",
    address: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "+916238738546";
    const message = `Hello, I would like to schedule an appointment.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPreferred Date: ${formData.preferredDate}\nAddress: ${formData.address}\nMessage: ${formData.message}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");

    setTimeout(() => {
      navigate("/thank-you"); // Navigate to Thank You Page after 2 seconds
    }, 2000);
  };
  

  return (
    <div className="page-container">
      <div className="appointment-container">
        <h2 className="appointment-title">Schedule Appointment</h2>
        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="whatsapp-btn">
            Send via WhatsApp
          </button>
        </form>
      </div>
      {/* Moved Footer Outside */}
      <Footer />
    </div>
  );
};

export default AppointmentForm;

