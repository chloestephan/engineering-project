CREATE TABLE employees
(
    id SERIAL,
    name text,
    title text,
    CONSTRAINT employees_pkey PRIMARY KEY (id)
);

CREATE TABLE customers
(
    id SERIAL,
    username text,
    firstname text,
    lastname text,
    email text,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE carCatalog
(
    licensePlate text,
    brand text,
    model text,
    CONSTRAINT catalogue_pkey PRIMARY KEY (licensePlate)
);

CREATE TABLE reservation
(
    id SERIAL,
    licensePlate text,
    startDate Date,
    endDate Date,
    CONSTRAINT FK_LicensePlate FOREIGN KEY (licensePlate) REFERENCES carCatalog(licensePlate),
    CONSTRAINT reservation_pkey PRIMARY KEY (id)
);

/*CREATE TABLE cart
(
    
)*/
INSERT INTO employees (name, title) VALUES
('John Smith', 'Manager'),
('Jane Doe', 'Assistant Manager'),
('Bob Johnson', 'Employee');

INSERT INTO customers (username, firstname, lastname, email) VALUES
('jsmith', 'John', 'Smith', 'jsmith@gmail.com'),
('jdoe', 'Jane', 'Doe', 'jdoe@gmail.com'),
('bjohnson', 'Bob', 'Johnson', 'bjohnson@gmail.com');

INSERT INTO carCatalog (licensePlate, brand, model) VALUES
('ABC123', 'Ford', 'Mustang'),
('DEF456', 'Toyota', 'Camry'),
('GHI789', 'Honda', 'Accord');

INSERT INTO reservation (licensePlate, startDate, endDate) VALUES
('ABC123', '2022-01-01', '2022-01-07'),
('DEF456', '2022-01-08', '2022-01-14'),
('GHI789', '2022-01-15', '2022-01-21');