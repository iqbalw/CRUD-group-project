# CRUD-group-project

# NWEN304 Group Project

### https://crud-project-nwen-304.herokuapp.com/

Our CRUD application was made by Pravin Modotholi, Iqbal Wan and Praveen Bandarage. It is a footwear shop. Currently hosted on Heroku - https://crud-project-nwen-304.herokuapp.com/

### Installation

After cloning the repo, run npm install to download all of the packages and dependencies. Then run npm start to run the application.

```npm install npm start ```

### How to use the system

In terms of how to use the web application, first boot up the application on the browser if running locally. Locally the application runs on port 3000 hence the following link can be used to run the app in the browser - http://localhost:3000. Once booted any unauthenticated user will be presented with the index page which only displays products. 

<img width="1196" alt="Screen Shot 2021-10-16 at 10 27 59 PM" src="https://user-images.githubusercontent.com/51874907/137582471-58d89ef5-8007-42c6-95e8-9ea7bbcb20bd.png">



### Registration

To view all features of the application, you should first register. To register a user you must click the sign up link from the nav bar or by performing a POST request for the /auth/register route. with your name, email and a password. The password must be of length 7 characters minimum, include at least 1 number, 1 capital lette and on special character. 

### Registration through the application

<img width="563" alt="Screen Shot 2021-10-16 at 10 21 57 PM" src="https://user-images.githubusercontent.com/51874907/137582269-ad443d58-673a-4052-8d54-57c060ca0acf.png">

### Registration through a POST API request
<img width="560" alt="Screen Shot 2021-10-16 at 10 22 22 PM" src="https://user-images.githubusercontent.com/51874907/137582278-0e4efbf3-052d-4fdb-b3f7-f5bbc1186e8f.png">

<img width="566" alt="Screen Shot 2021-10-16 at 10 22 39 PM" src="https://user-images.githubusercontent.com/51874907/137582284-2f3b66c2-063d-44f4-9b71-e8c256c6aaac.png">

If successful a redirect will be performed to the login page, where the user can now login.

### Login

To login simply enter a valid email and password on the login page, if an incorrect value is given then the page would populated with an alert depending on the error observed. If the login is successful will redirect back to the index page, where an extra add to Cart option will be visible below each product with an extra link to view the cart.

<img width="1143" alt="Screen Shot 2021-10-16 at 10 23 35 PM" src="https://user-images.githubusercontent.com/51874907/137582313-d0780cd4-e0df-49fd-a6e7-07bb274c7530.png">

Authenticated users have the ability to add items to their cart as those protected routes are now open. 

### Login Request through a POST API request
<img width="565" alt="Screen Shot 2021-10-16 at 10 24 14 PM" src="https://user-images.githubusercontent.com/51874907/137582329-08dfeb90-b268-4a1b-91d9-b04e53aea30c.png">

### Shopping Cart

A user who is currently logged in is able to view all the products that they had added to their cart. In this page three actions can be perform; increase quantity, decrease quantity and remove product from cart. After decreasing if the quantity comes down to 0 then the product will be removed from the user’s cart. 

<img width="1202" alt="Screen Shot 2021-10-16 at 10 25 16 PM" src="https://user-images.githubusercontent.com/51874907/137582368-d3f337e1-9f17-4e8a-a13d-2fb302e017e0.png">

### API request to get a user Cart page: 

<img width="596" alt="Screen Shot 2021-10-16 at 10 26 10 PM" src="https://user-images.githubusercontent.com/51874907/137582399-b2ad0399-36a7-4f54-a19d-fa8c87ea218f.png">

Note - need to set a header with the a current authenticated user’s session ID. This value is assigned when a user logs in and the session related to the current user is saved on the database. To access that session to check for authentication a session ID must which is what’s stored in the cookie. 

### Add Product

This function is only available to admin users, for testing an admin user with the credentials of test@mail.com (email) and password (password) can be used. Admin users will have two more links available in the nav bar. An add product and Edit product link. Admins can also add products to their shopping cart similar to authenticated users. 

<img width="1286" alt="Screen Shot 2021-10-16 at 10 28 20 PM" src="https://user-images.githubusercontent.com/51874907/137582480-8ac68c4e-6992-40bb-b117-65e70f818bc1.png">

The add product page is just like any other form where you enter the details and the product will be added to the database. This form also allows the option to add an image with the product which will be saved locally on the server and the path of the image will be saved with the product in the database.
API post request for adding a product: Note for this function a sID of an admin will be required.

<img width="594" alt="Screen Shot 2021-10-16 at 10 29 04 PM" src="https://user-images.githubusercontent.com/51874907/137582496-68485568-7dee-44c7-ab55-46e199bc6854.png">

<img width="595" alt="Screen Shot 2021-10-16 at 10 29 18 PM" src="https://user-images.githubusercontent.com/51874907/137582503-2f73bf60-a125-4d8b-b0b8-fe6144420447.png">

### Update Product

This functionality can be accessed on the edit product page. This page contains a dropdown menu of all the products in the database. The user simply selects one to make changes on. Once selected the form values will get autofilled for edits to be performed as shown below.

<img width="562" alt="Screen Shot 2021-10-16 at 10 29 48 PM" src="https://user-images.githubusercontent.com/51874907/137582515-a7994ac9-d5e8-4639-acc1-1d464ee35cdc.png">

All values can be edited and once complete the update button should be clicked. Note to perform this action the user will need to have admin rights.

<img width="548" alt="Screen Shot 2021-10-16 at 10 30 09 PM" src="https://user-images.githubusercontent.com/51874907/137582520-a8101573-b47a-4fd1-9ebc-e5523cae7060.png">

### Delete Product

Delete works in a similar fashion to update where the user selects a product from the dropdown and instead of clicking update the delete button is clicked. Both of the actions will provide visual feed whether it was successful or not. 

<img width="566" alt="Screen Shot 2021-10-16 at 10 30 36 PM" src="https://user-images.githubusercontent.com/51874907/137582530-7717a36e-7be9-41c7-8fdd-508651da0b73.png">

### What the interface is (both for the web application and with REST API)

As mentioned previously, the interface for our web application and REST API is a footwear shop which allows authenticated users to add products to their shopping cart and admin users to add shoes, view shoes, edit shoes, remove shoes and add shoes to cart. The REST API enables users to complete these functions and functions/requests for this can be viewed above. 
   
### What error handling has been implemented in your system(both for the web application and with REST API)?

With the web application, we provided thorough error handling as well as helpful tips to users whenever they encountered an error. For example during registration users will only see the register button once all fields have been filled out.

<img width="534" alt="Screen Shot 2021-10-16 at 10 31 09 PM" src="https://user-images.githubusercontent.com/51874907/137582542-e4fa06d7-a4ca-49a0-9c9d-90e4a87a56ef.png">

No registration button has been added. Similarly we provide feedback to the user based on the password they have provided and only show the registration button once it meets the specs of being of the specified length of 7, a numeric character and a special character. For example a valid password would be “password192@g” however “password2” would not be sufficient.

### Insufficient password

<img width="464" alt="Screen Shot 2021-10-16 at 10 32 22 PM" src="https://user-images.githubusercontent.com/51874907/137582565-21e21915-12de-4b8f-8a91-2971b4445cdc.png">

### Sufficient password

<img width="533" alt="Screen Shot 2021-10-16 at 10 33 02 PM" src="https://user-images.githubusercontent.com/51874907/137582575-22178429-1146-40aa-ba6c-4d231b30ca0b.png">

As I had already used praveenbandarage@gmail.com I encountered this error which told the user, the email was in fact already used.

<img width="566" alt="Screen Shot 2021-10-16 at 10 33 31 PM" src="https://user-images.githubusercontent.com/51874907/137582584-cbaee4a6-b5f4-46c0-b704-62be865c7a0e.png">

For the login page similar visual feedback is displayed to the user when the request doesn’t meet the required criteria. Possible error include “incorrect email or password”, “password” is not allowed to be empty” and “email is not allowed to be empty”.

<img width="534" alt="Screen Shot 2021-10-16 at 10 33 59 PM" src="https://user-images.githubusercontent.com/51874907/137582593-e88c9d7c-32d8-48cd-9dac-c58a8549b768.png">

This was achieved by converting out validation function into middleware functions. This way the request will only proceed to the next middleware function once its successfully validated. This can be seen in our access management code section, which contains the code for registerValidation.

Throughout our web application and REST API we utilised similar error checking to provide users with feedback and responses when they had provided either an invalid input or were unauthorised. For example if a user attempts to remove a product that does not exist or a product which is not in their cat, they encounter a 400 error representing a client error.

<img width="568" alt="Screen Shot 2021-10-16 at 10 34 23 PM" src="https://user-images.githubusercontent.com/51874907/137582617-7db69273-831e-40fd-9652-8234cbae115d.png">

### The test cases for frontend and the test scripts (e.g. a list of CURL commands / POSTMAN Requests) for the server end of your web application / service.

Please refer to above CURL commands which can be used to test the frontend, which can also be done via POSTMAN.

### Database Design and Access Management Code
The current database uses MongoDB. This is NoSQL

We have developed two databases to store our data “myFirstDatabase” and “shop.” They both store products, sessions and users. The difference is “myFirstDatabase” is a test database we used for our testing process whilst “shop” is our production database. Products as the name suggests, stores the name of the product, “Converse” for example, the price, a description of the product, a unique id (for selection/querying) and an image.  

We used validation throughout our project to ensure that products meet our specifications. This was done primarily through the package mongoose as well as JOI. For our users and products model we used mongoose to declare the types, as well as set requirements for each aspect.

<img width="562" alt="Screen Shot 2021-10-16 at 10 35 21 PM" src="https://user-images.githubusercontent.com/51874907/137582654-7b3f1199-b68a-47a6-83b3-841408ff0778.png">

JOI was used for validation (middleware/dataValidation.js) to ensure that requests did meet the specifications when doing POST requests. 

<img width="563" alt="Screen Shot 2021-10-16 at 10 35 42 PM" src="https://user-images.githubusercontent.com/51874907/137582669-7d941b55-3fba-42c9-9d69-2297519872bf.png">

To connect to our database you must be authenticated, the DB connection code is 

<img width="564" alt="Screen Shot 2021-10-16 at 10 36 03 PM" src="https://user-images.githubusercontent.com/51874907/137582686-dd103e68-98c8-4cdc-9bf7-03ce948aaca2.png">

In regards to how to access the database, the DB is connected here and the driver for the database is in startup/database.js. 

This is where we pass in the connection code which is stored in our .env file as well as connect to the database. Upon a successful connection a user will see a print statement in the terminal saying “Database connection successful.”


<img width="562" alt="Screen Shot 2021-10-16 at 10 36 48 PM" src="https://user-images.githubusercontent.com/51874907/137582717-82eed285-6554-4626-adc3-6fb86622c6a2.png">

### User Model Database schema

The user model contains the following properties:

- Name: 
     - This property is just a string which is used to Identify the user by their name. Helps customize the web page and target each specific user.
-Email: 
     - This property is used as the username as email tends to be unique, proves to be useful when trying to find the user from the database and serves as a better alternative compared to using the object ID. 
Password:
 - This property is used to authenticate a user and check if the account/information they are trying to access is actually theirs. Passwords are hashed using bcrypt before being saved in the database. For the required field a function is used which makes the password required if a local user is trying to create an account.
type: 
This property lets the server determine which type of user they are. Currently there can be two types of users: “local” and “google”. This property is used as we don’t have access to the passwords of google users. Hence every time a user logs in using google they will be authenticated against google users.
Cart:
This property is an object array, where each object contains a reference to a product model and a quantity. This array is used to keep track of the products in each user's cart. Everytime a query is made for the user's cart, reference IDs get populated with the products in the database.
date: 
This property simply means the date at which the user registered into the server.
isAdmin: 
This property is used to distinguish admin users from normal customers, the property is a boolean value which is set to false by default on creation. All admin users will start off as normal users and in order to turn a user into an admin this property must be manually changed in from the database.





