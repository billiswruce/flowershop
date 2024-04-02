const Payment = () => {
  const handlePayment = async () => {
    const response = await fetch(
      "http://localhost:3000/payments/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            product: "price_1Jd3v2JbQ9Vv6ZpQZ8sL1e2t",
            quantity: 1,
          },
          {
            product: "price_1P17xu05kEsouJvU9D264jnm",
            quantity: 1,
          },
        ]),
      }
    );
    const data = await response.json();
    window.location = data.url;
  };

  return (
    <div>
      <button onClick={handlePayment}>GE MIG PENGAR</button>
    </div>
  );
};

export default Payment;
