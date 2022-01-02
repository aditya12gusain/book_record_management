# book_record_management

This is a book record management API Backend for the management of records and books

# Routes and Endpoints

## /user

POST: ### Create a new user
GET: ### Get all users ✅

## /user/{id}

GET: ### Get a user by id ✅
PUT: ### Update a user by id
DELETE: ### Delete a user by id (check if he still has an issued book first or any applicable fine).

## /user/subscription/{id}

GET: ### Get user subscription details 1. Date of subscription 2. Valid till 3. Fine if any ✅

## /book

GET: ### Get all books ✅
POST: ### Create a new book

## /book/{id}

GET: ### Get a book by id ✅
PUT: ### Update a book by id

## /book/issued

GET: ### Get all issued books ✅

## /book/issued/withFine

Task 1:
GET: ### Get all issued books with fine

NOTE:
Subscription Plans
Basic (3 months)
Standard (6 months)
Premium (12 months)

If the Subscription date is 01/10/21
and Subscription type is Standard
the valid till date will be 01/04/22

If he has an Issued book and the issued book is to be returned at 01/03/22
and he misses it, then he gets a fine of Rs. 100

If he has an Issued book and the issued book is to be returned at 01/03/22
If he misses it, and his subscription also expires, then he will get a fine of Rs. 200
