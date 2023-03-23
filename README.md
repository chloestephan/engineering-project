# Engineering-project

## AWS Project

Our project provides a digital transformation assistance solution to help AWS customers conduct their digital transformation audit. AWS has found that many customers are struggling to upgrade their systems and choose the most appropriate solutions for their needs. So they asked us to develop a web application that allows customers to fill out a form and automatically get a detailed report on what they need to do to optimise their digital transformation.

## Installation

- __Frontend__:

Go to the client folder `cd .\client\`, and use this command to install the dependencies:
```shell
npm install
```

- __Backend__:

Go to the server folder `cd .\server\`, and use this command to install the dependencies:
```shell
npm install
```

- __.env__:

Inside the server folder, create a .env file with the following content:
```ruby
ACCESS_TOKEN_SECRET=ACCESSTOKENSECRET
REFRESH_TOKEN_SECRET=REFRESHTOKENSECRET

POSTGRES_HOST=postgres
POSTGRES_DB=aws_db
POSTGRES_DB_TEST=aws_db_test
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_PORT=5432

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=email@email.com
EMAIL_PASSWORD=password

BASE_URL=http://localhost:3000

USER_TEST_PASSWORD=passwordTest
CUSTOMER_TEST_LINK_FORM=/fill-form/123456789
```
It is strongly recommended that you change the above values as you want.

- __Docker__:

You can use our `docker-compose.yml` file inside the server folder, if you want, with this command: 
```shell
docker compose up --build -d
```

## Run the application

To run the application you just have to run the frontend part, if you are using Docker, with this command:
```shell
npm start
```

If you don't want to use Docker, you can also run the backend part by your own with this command:
```shell
npm run dev
```

When the application is running you can connect to the admin part with the default admin:

email: admin

password: admin

## Test the application

There are some backend test that you can run by using this command:
```shell
npm run test
```
Make sure that the backend is not running when you want to test the application.
