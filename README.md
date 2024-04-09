<img width="833" alt="2" src="https://github.com/billiswruce/shop/assets/98770226/8af26657-32db-473e-b2ab-5c83a1c6c7ed">

# Search Away!

Fullstack Webshop App with Stripe and Nodejs

## Key Features

- Webbshop connected through stripe 
- Register/Login with cookies and stripe
- Password crypting function
- Function to add products in cart
- Checkout - with stripe through server communication
- Discount code option

## Before You Start

- Make sure you have node.js installed
- Register your test account at STRIPE and save your API-key
- When the repository is cloned and set up is done:
- Create an .env file in client with following: 
```plaintext
STRIPE_KEY={YOUR_KEY}
STRIPE_PUBLIC_KEY={YOUR KEY}
DISCOUNT={YOUR DISCOUNT KEY}
```

## Set up
- Clone repository from [Github](https://github.com/billiswruce/flowershop.git)
- Open your Terminal in VS Code (or preferred developing tool)
- New Terminal for Client: First `cd client` then run `npm i` and `npm run dev`
- New Terminal for Server: First`cd server` Run `npm i` and `node server`
- Make sure your express server is running 
- Navigate to http://localhost:5173/ in your browser to use the app
