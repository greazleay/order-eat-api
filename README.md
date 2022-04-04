# Finsys - API

This is a fictional financial institution which offers traditonal financial services. New customers can open a new account while an existing account holder can perform the following:

* Open multiple accounts
* Check their account balance
* Withdraw money from their account
* Close their account


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

Install finsys-api with npm

```bash
  npm install finsys-api
  cd finsys-api
```
## Run Locally

Clone the project

```bash
  git clone https://github.com/greazleay/finsys-api
```

Go to the project directory

```bash
  cd finsys-api
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

* `https://api-finsys.herokuapp.com/`

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
