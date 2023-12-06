# walmart-nodejs

## Routes 
### Retailer
(get)/retailer --  gets all retailers
(post)/retailer/signup -- add new retailer
(post)/retailer/login -- login retailer
(patch)/retailer -- edit retailer data
### Customer
(get)/customer -- gets all customers
(post)/customer/signup -- add new customer
(post)/customer/login -- login customer
(patch)/customer/update -- edit customer data
(delete)/customer/delete/:customerID -- delete customer
### Product
(get)/product -- get all products
(post)/product -- add product by retailer
(post)/product/:productID -- customer add product to cart
(patch)/product/:productID-- update product details by retailer
(delete)/product/:productID-- delete product by retailer
### Cart
(get)/customer/cart -- get customer's cart
(get)/customer/cart/price -- get total price of cart 
(patch)/customer/cart/:productID -- remove product feom cart
(patch)/customer/cart/:productID/quantity -- edit product quantity in the cart
(delete)/customer/cart -- emptying the cart
### Orders
(get)/customer/order -- get all customer's orders
(post)/customer/order -- create order
(patch)/customer/order/:orderID -- edit order state
(delete)/customer/order/:orderID -- delete order if it's not shipped yet
### Payment
(post)/payment -- create customer's payment
(get)/payment -- get customer's payment 
