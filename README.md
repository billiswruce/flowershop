<img width="833" alt="2" src="https://github.com/billiswruce/shop/assets/98770226/8af26657-32db-473e-b2ab-5c83a1c6c7ed">
____________________________________________________________________________

### Checkout Session Payment Service with Stripe Integration

#### Description

This webshop is created for order placement and payment through integration with Stripe.
Users can register, log in, and make purchases of products managed through Stripe.

#### Requirements

- [x] **Products**: Listing of products on a page, fetched from Stripe.
- [x] **Shopping Cart**: Ability to add products to a shopping cart.
- [x] **Order through Stripe**: Ability to place an order through Stripe based on the contents of the shopping cart.
- [x] **Registration**: Ability to register as a user on the webshop, creating a "Customer" in Stripe and saving the user in a JSON file.
- [x] **Login**: Ability to log in as a customer using a custom-built login system with cookie-session.
- [x] **Saved Orders**: All placed orders are saved to a list in a JSON file.
- [x] **Payment Validation**: The order is only saved if payment through Stripe has been completed.

#### Additional

In addition to the minimum requirements, the following must be met to recieve High Approval.

- [x] **Discount Code**: Ability to enter a discount code to receive a discount on purchases, through Stripe.
- [ ] **Order History**: Logged-in users should be able to view their previously placed orders.
- [ ] **Address and Pickup Point**: Users must fill in their address and choose a pickup point before payment, integrated with PostNord API.

#### Before You Start

- Make sure you have node.js installed
- Register your test account at [Stripe](https://stripe.com/se) and save your API-key
- Create your test shop and your testproducts in Stripe
- When the repository is cloned and set up is done:
- Create an .env file in client with following:

```plaintext
STRIPE_KEY={YOUR_KEY}
STRIPE_PUBLIC_KEY={YOUR KEY}
DISCOUNT={YOUR DISCOUNT KEY}
```

#### Building and Running the Project

To build and run the project, follow these steps:

- Clone this repository from [Github](https://github.com/billiswruce/flowershop.git)
- New Terminal for Client: First `cd client` then run `npm i` and `npm run dev`
- New Terminal for Server: First`cd server` Run `npm i` and `npm start test` or `node server.js`
- Make sure your express server is running
- Navigate to http://localhost:5173/ in your browser to use the app

#### Stripe Test Cards

Use the following test cards from Stripe to process payments during development: [Stripe Test Cards](https://stripe.com/docs/testing).
