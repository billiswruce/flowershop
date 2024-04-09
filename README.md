<img width="833" alt="2" src="https://github.com/billiswruce/shop/assets/98770226/8af26657-32db-473e-b2ab-5c83a1c6c7ed">
____________________________________________________________________________

### Checkout Session Payment Service with Stripe Integration

#### Description
This webshop is created for order placement and payment through integration with Stripe. 
Users can register, log in, and make purchases of products managed through Stripe. 

#### Minimum Requirements for Approval
1. **Products**: Listing of products on a page, fetched from Stripe.
2. **Shopping Cart**: Ability to add products to a shopping cart.
3. **Order through Stripe**: Ability to place an order through Stripe based on the contents of the shopping cart.
4. **Registration**: Ability to register as a user on the webshop, creating a "Customer" in Stripe and saving the user in a JSON file.
5. **Login**: Ability to log in as a customer using a custom-built login system with cookie-session.
6. **Saved Orders**: All placed orders are saved to a list in a JSON file.
7. **Payment Validation**: The order is only saved if payment through Stripe has been completed.

#### Additional Requirements for High Approval
In addition to the minimum requirements, the following must be met to recieve High Approval.
1. **Discount Code**: Ability to enter a discount code to receive a discount on purchases, through Stripe.
2. **Order History**: Logged-in users should be able to view their previously placed orders.
3. **Address and Pickup Point**: Users must fill in their address and choose a pickup point before payment, integrated with PostNord API.

#### Before You Start
- Make sure you have node.js installed
- Register your test account at STRIPE and save your API-key
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
- Configure environment variables for Stripe and PostNord API.
- New Terminal for Client: First `cd client` then run `npm i` and `npm run dev`
- New Terminal for Server: First`cd server` Run `npm i` and `npm start test` or `node server.js`
- Make sure your express server is running 
- Navigate to http://localhost:5173/ in your browser to use the app

#### Stripe Test Cards
Use the following test cards from Stripe to process payments during development: [Stripe Test Cards](https://stripe.com/docs/testing).




