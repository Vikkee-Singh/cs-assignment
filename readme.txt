
// create users table
CREATE TABLE users (id int(11) NOT NULL AUTO_INCREMENT, name VARCHAR(50), email VARCHAR(100), password VARCHAR(100) ,createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, primary key (id), UNIQUE KEY(email));

// create tokens table
CREATE TABLE tokens (userId int(11) NOT NULL, name VARCHAR(50), email VARCHAR(100),token VARCHAR(100), createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,  UNIQUE KEY(email), CONSTRAINT `fk_tokens_users` FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE ON UPDATE RESTRICT );

// create Products table
CREATE TABLE products (id int(11) NOT NULL  AUTO_INCREMENT, name VARCHAR(50), description VARCHAR(100), price DOUBLE(11,2), createdBy int(11), make int(5), createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, primary key (id), CONSTRAINT `fk_products_users` FOREIGN KEY (createdBy) REFERENCES users (id) ON DELETE CASCADE ON UPDATE RESTRICT, UNIQUE KEY(name));


yarn install
yarn run dev


API ===============>
1)End Point: /api/v1/signup
method: post
body: {
	"name": "YOUR NAME",
	"email":"YOUR EMAIL",
	"password":"YOUR PASSWORD"
}

2) End Point: /api/v1/products/list
method: get

3) End Point (/api/v1/login) method: post body: {
	"email":"Email address",
	"password":"Your Password"
}

4vikkeesingh@gmail.com) End Point: /api/v1/products/add
method: post
headers [x-access-token: token]
body: {"name":"Nikon","description":"Digital camera","price":"20134.34", "make": "2020"}

5) End Point (/api/v1/products/cart)
method: get
headers [x-access-token: token]

