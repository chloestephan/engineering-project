CREATE TYPE Type AS ENUM ('User input long', 'user input court', 'Dropdown','Checkbox','Toggle','Selection Radio');

CREATE TABLE customer
(
    id SERIAL,
    username text,
    mail text,
    password text,
    entreprise text,
    CONSTRAINT customer_pkey PRIMARY KEY (id)
);

CREATE TABLE admin
(
    id SERIAL,
    username text,
    email text,
    password text,
    CONSTRAINT users_pkey PRIMARY KEY (id)
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
    customerId SERIAL,
    questionId SERIAL,
    answer text,
    CONSTRAINT FK_Customer_ID FOREIGN KEY (customerId) REFERENCES customer(id),
    CONSTRAINT FK_Question_ID FOREIGN KEY (questionId) REFERENCES formBuilder(id),
    CONSTRAINT form_answers_pkey PRIMARY KEY (customerId, questionId)
);

CREATE TABLE formCompleted
(
    customerId SERIAL,
    urlPDF text,
    CONSTRAINT FK_Customer_ID FOREIGN KEY (customerId) REFERENCES customer(id),
    CONSTRAINT form_completed_pkey PRIMARY KEY (customerId)
);



INSERT INTO customer (username, mail, password, entreprise) VALUES
('jsmith', 'jsmith@gmail.com', 'adcd', 'Chaos Corp.');

INSERT INTO admin (username, email, password) VALUES
('jsmith','jsmith@gmail.com', '123');

INSERT INTO formBuilder (ordre, questionType, answer) VALUES
('1', 'User input long', 'Ceci est un input utilisateur long');


INSERT INTO formAnswers (customerID, questionId, answer) VALUES
((SELECT id from customer where username='jsmith'), (SELECT id from formBuilder where ordre=1), 'Ceci est une réponse');

INSERT INTO formCompleted (customerID, urlPDF) VALUES
((SELECT id from customer where username='jsmith'),'https://aws');