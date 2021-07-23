# Getting Started with Transaction App

## Technologies Used in Project
React Js (Client Side): Version 17.0.1\
Node/Express Js (Server Side): Version 4.17.1\
MongoDb Atlas to store the data.\
Project is build using VS Code in Windows 10 OS.

## Available Scripts
In the project directory, you can run:

### `npm run dev`

Runs the client and server side using concurrently in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view client side in the browser.\
Open [http://localhost:5000](http://localhost:5000) to view server side in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Login Credentials
Email: varunkarwa484@gmail.com\
Password: Password012

## Schemas of the Collections.
There are three collections, Users, Accounts, Transactions for storing the data.
Following are the schemas:

### Users
name: Name of the user,\
email: Email of the user, it is required and should be unique,\
password: Password of the user,\
date: Date on which the user registered

### Accounts
user: User Id given by the database, it will help for showing the data of that user only.\
name: Account Holder Name,\
accountNo: Account Number,\
amount: Latest Account Amount,\
type: Type of account saving or current

### Transactions
user: Same as of Accounts Schema,\
accountNo: Account Number from Transaction is done ,\
amount: Amount Withdrawn or Deposited,\
type: Withdraw or Deposit,\
date: Date on which transaction is done

## How the Project Works

### Server Side
#### config folder
In this folder MongoURI is integrated and connectDb function is called which tries to connect to the database.

Following are the set of APIs and their corresponding functionalities:
https://localhost:5000/

#### '/api/auth'(POST REQUEST)
When user tries to login, frontend sends the email and password to the server in the body of the request.\
Then server searches the user in the users collection.\
If the user is present and credentials are valid, it will send a token to the frontend in the response.\
But if credentials are invalid or user is not present, then it will send error message with status of 400.\
It uses Users Schema.

#### '/api/auth'(GET REQUEST)
When user is in the application and moves from one page to another, it sends request to this API.\
It sends the token(issued in the above request) in header of the request with key as 'x-auth-token'.\
And in the reponse it sends the data of the user from the users collection.\
It also uses Users Schema.

#### '/api/accounts'(GET REQUEST)
After logging in at the home page, frontend sends the request for fetching accounts of the user.\
In reponse, server fetches the accounts from the accounts collections and send it in response with status 200.\
It uses Account Schema.

#### '/api/accounts/:id'(PUT REQUEST)
When a transaction is done, frontend requests to update the amount in the database.\
It sends the id of the account to be updated in the params section.\
In reponse, server searches the account in the accounts collection. If the account is not there, then sends response with 404 status.\
If the account is present, then it will update the account in the database and send the response with status of 200.\
It also uses Account Schema.

#### '/api/transactions/'(GET REQUEST)
At the home page when frontend requests to this API,
server fetches the transactions from the transactions collection and send in response with 200 status.\
It uses Transaction Schema.

#### '/api/transactions/'(POST REQUEST)
When the transaction is occurred, frontend requests to add it in the database.\
It sends the transaction object in the body section.\
Server then add the object in the collection and sends back a response with status of 200.\
It also uses Transaction Schema.

### Client Side
The main code of the frontend resides in the client/src folder 

#### App.js 
It is the entry point of the React for the project. In this folder different routes are declared.

#### actions folder
In this folder all .js files requests server for updating or adding data in database or fetch data from the database.\
The data recieved from the server is dispatched to the reducer which then changes the state.

#### componenets folder

#### accounts folder
#### AccountsFilter.js
When user enter text in the filter box, it filters accounts by matching the text with account number, account holder name, type.\
It then accordingly updates filtered state and display only the matching ones.

#### AccountItem.js
It displays the details(latest amount, account number, name, type) of a account on a card.\
Also two buttons are given for initiating a transaction.

#### layout folder
#### Timer.js
When a transaction is initiated this file will get called and timer will be initialized.\
If the time is over it will directly load home page.

#### pages folder
#### Home.js
When user is logged in home page is loaded. It calls Accounts and Transactions components for displaying them.

#### Transact.js
When user initiates a transaction he/she will be taken to this page.\
In this page timer will be displayed.\
It also contains form which displays amount in account and takes amount to be deposited/ withdrawn from the account.\
If the withdraw amount is greater from the amount in account, it sets alert.\
After the transaction is successfully carried out home page will load and latest amount is shown in the respective account card.\
And a new transaction card is added for the recent one.

#### routing folder
#### PrivateRoute.js
As '/' and '/:id/:type' are meant to be private, therefore this file checks if the user is authenticated or not.
If not the user will be redirected to login page.

#### transactions folder
#### TransactionsFilter.js
When user enter text in the filter box, it filters transactions by matching the text with account number, amount, type.
It then accordingly updates filtered state and display only the matching ones.

#### Transactions.js
This file displays the transactions of the user.

#### TransactionItem.js
It displays the details(amount withdrawn/deposited, account number, date, type) of a transaction on a card.

#### reducers folder
In this folder, all the files are triggering the changes in the state when the actions are dispatched from the actions folder.

#### utils folder
#### setAuthToken.js
When the user logs in, server responses with a token, then this file adds a field in axios header for indicating that the user authenticated.
