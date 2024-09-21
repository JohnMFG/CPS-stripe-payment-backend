const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51Kl89YCUfB9y1XearGSRNC4MepeompGSuobs1xShvVClebM7OcEgIB8WTe1qDZNr7Dp5mLQwSVeX9pmgkyNOrWW200GIub0Am9');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // constant with a calculation of the order's amount
  // Calculating the order total on the server to prevent
  // people from directly manipulating the amount on the client
  console.log(items[0].amount)
  return items[0].amount;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const {currency} = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: currency,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/greet", async (req, res) => {
  res.send('helllo');
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));