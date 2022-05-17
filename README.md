# Order Eat - API

This is a fictional API for food ordering services. Customers can order different foods and get the bill, which is the sum of the prices of the ordered food and the bill will be deducted from their already funded accounts.

They also have the following services available:

* Open a food ordering account
* Fund their accounts for immediate and future food ordering
* Get the list of all food items
* Place a food order
* Check the status of their food order
* Cancel their food order
* Get the bill of their current food order
* Get the list of current orders
* View a history of all their orders with bill amount
* Close their account

Please note that this project is still being developed and some services are currently unavailable.

## Authors

- [@greazleay](https://www.github.com/greazleay)


## Tech Stack

* TypeScript
* Express
* PostgreSQL
* TypeORM
* JsonWebToken
* Supertest


## Installation

Install order-eat-api with npm

```bash
  npm install order-eat-api
  cd order-eat-api
```
## Run Locally

Clone the project

```bash
  git clone https://github.com/greazleay/order-eat-api
```

Go to the project directory

```bash
  cd order-eat-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## License

[MIT](https://choosealicense.com/licenses/mit/)


## API Reference

### Base URL

* `https://api-ordereat.herokuapp.com/`

#### Post login

```https
  POST /auth/login
```

| Parameter  | Type     | Description                  |
| :--------  | :------- | :--------------------------- |
| `email`    | `string` | **Required**. Customer email |
| `password` | `string` | **Required**. Email password |

#### Post logout

```https
  POST /auth/logout
```

| Parameter  | Type     | Description                      |
| :--------  | :------- | :------------------------------  |
| `token`    | `string` | **Required**. Valid bearer token |

#### Post logout

```https
  POST /auth/refresh_token
```

| Parameter         | Type     | Description                       |
| :---------------  | :------- | :-------------------------------  |
| `refreshToken`    | `string` | **Required**. Valid refresh token |

#### Post create customer

```https
  POST /customer/register
```

| Parameter         | Type     | Description                         |
| :---------------  | :------- | :---------------------------------- |
| `firstName`       | `string` | **Required**. Customer's first name |
| `lastName`        | `string` | **Required**. Customer's last name  |
| `age`             | `string` | **Required**. Customer's age        |
| `address`         | `string` | **Required**. Customer's address    |

#### Get all customers

```https
  GET /customers/all
```

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `token` | `string` | **Required**. Valid bearer token |

#### Get a customer

```http
  GET /customers/${id}
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :-----------------------------------  |
| `id`      | `string` | **Required**. Id of customer to fetch |
