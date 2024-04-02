const App = () => {
  const handlePayment = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/payments/create-checkout-session",
        {
          method: "POST",
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>GE MIG PENGAR</button>
    </div>
  );
};

export default App;
