import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function loadScript() {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    // load the script
    script.onload = () => {
      resolve(true)
    }
    // error handling
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}


async function openRazorpayCheckout() {
  await loadScript();
  // 1. get the order from backend 
  const resp = await fetch("http://localhost:3001/checkout", { method: "POST" });
  const data = await resp.json();
  const orderConfig = data.message;
  // // 2. create new order object that will be send to payment gateway
  const finalOrderObject = {
    "key": "rzp_test_aMoof3cAGQEOfS", // Enter the Key ID generated from the Dashboard
    "amount": orderConfig.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": orderConfig.currency,
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": orderConfig.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature)
    },
    "prefill": {
      "name": "Jasbir",
      "email": "Jasbir@example.com",
      "contact": "9000090000"
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#3399cc"
    }
  };
  // // 3. create the instance of Razorpay
  var rzp1 = new Razorpay(finalOrderObject);
  // // 4. open the checkout form of razorpay
  rzp1.open();

  // // error handling
  rzp1.on('payment.failed', function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });
}
function App() {
  return (
    <>
      <h1>Payment Demo</h1>
      <a onClick={openRazorpayCheckout}>Pay for 500</a >

    </>
  )
}

export default App
