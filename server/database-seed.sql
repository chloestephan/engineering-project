DROP TYPE IF EXISTS Type CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS formBuilder CASCADE;
DROP TABLE IF EXISTS formAnswers CASCADE;
DROP TABLE IF EXISTS formCompleted CASCADE;
DROP TABLE IF EXISTS linksForm CASCADE;
DROP EXTENSION IF EXISTS "uuid-ossp";

CREATE TYPE Type AS ENUM ('User input long', 'User input court', 'Dropdown','Checkbox','Toggle','Selection Radio');

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE customers
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    username text,
    email text,
    password text,
    company text,
    CONSTRAINT customer_pkey PRIMARY KEY (id)
);

CREATE TABLE admins
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    username text,
    email text,
    password text,
    CONSTRAINT admins_pkey PRIMARY KEY (id)
);

CREATE TABLE formBuilder
(
    id SERIAL,
    ordre INT,
    questionType Type,
    answer text, 
    CONSTRAINT form_builder_pkey PRIMARY KEY (id)
);

CREATE TABLE formAnswers
(
    customerId uuid NOT NULL DEFAULT uuid_generate_v4(),
    questionId SERIAL,
    answer text,
    CONSTRAINT FK_Customer_ID FOREIGN KEY (customerId) REFERENCES customers(id),
    CONSTRAINT FK_Question_ID FOREIGN KEY (questionId) REFERENCES formBuilder(id),
    CONSTRAINT form_answers_pkey PRIMARY KEY (customerId, questionId)
);

CREATE TABLE formCompleted
(
    customerId uuid NOT NULL DEFAULT uuid_generate_v4(),
    urlPDF text,
    CONSTRAINT FK_Customer_ID FOREIGN KEY (customerId) REFERENCES customers(id),
    CONSTRAINT form_completed_pkey PRIMARY KEY (customerId)
);

CREATE TABLE linksForm
(
    id SERIAL,
    url text,
    customerId uuid NOT NULL DEFAULT uuid_generate_v4(),
    CONSTRAINT FK_Customer_ID FOREIGN KEY (customerId) REFERENCES customers(id),
    CONSTRAINT links_pkey PRIMARY KEY (id)
);

INSERT INTO admins(username, email, password) VALUES ('admin', 'admin', '$2a$06$izwfhJ56u9WKlyZRI1utT.Sx1M7.cC0J2fQ22IKPV/7aLQEbfBJ46');

-- INSERT INTO customers (username, email, password, company) VALUES
-- ('jsmith', 'vnjzrbvjizbei@gmail.com', 'adcd', 'Chaos Corp.');

-- INSERT INTO admins (username, email, password) VALUES
-- ('jsmith','vnjzrbvjizbei.admin@gmail.com', '123');

-- INSERT INTO formBuilder (ordre, questionType, answer) VALUES
-- ('1', 'User input long', 'Ceci est un input utilisateur long');


-- INSERT INTO formAnswers (customerID, questionId, answer) VALUES
-- ((SELECT id from customers where username='jsmith'), (SELECT id from formBuilder where ordre=1), 'Ceci est une réponse');

-- INSERT INTO formCompleted (customerID, urlPDF) VALUES
-- ((SELECT id from customers where username='jsmith'),'https://aws');