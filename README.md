# Engineering-project

## AWS Project

Notre projet propose une solution d’aide à la transformation digitale pour aider les clients d’AWS à effectuer leur audit de transformation digitale. AWS a constaté que de nombreux clients ont des difficultés à mettre à jour leurs systèmes et à choisir les solutions les plus adaptées à leurs besoins. Ils nous ont donc proposé de développer une application web qui permet aux clients de remplir un formulaire et d'obtenir automatiquement un rapport détaillé sur les actions à entreprendre pour optimiser leur transformation digitale.

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

POSTGRES_HOST=localhost
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

- __Init BDD__:

To initialise the BDD you have to use the `database-seed.sql` file inside the server folder. Just run the script inside pgAdmin after you launched it with the `docker-compose.yml`.

## Run the application

To run the application you just have to run the frontend part, if you are using Docker, with this command:
```shell
npm start
```

If you don't want to use Docker, you can also run the backend part by your own with this command:
```shell
npm run dev
```

## Test the application

There are some backend test that you can run by using this command:
```shell
npm run test
```
Make sure that the backend is not running when you want to test the application.
