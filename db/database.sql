

-- para ver mis bases de datos en mysql
show databases;



-- CREATE TABLE client(
--     id_user INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     user_name VARCHAR(30),
--     password VARCHAR(30),
--     email VARCHAR(30)
-- );

create database if not exists recycle;

use recycle;

CREATE TABLE Rol(
    id_rol INT(2) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(30) NOT NULL
);

CREATE TABLE User(
    id_user INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(30) NOT NULL,
    email VARCHAR(30)NOT NULL,
    password VARCHAR(100) NOT NULL,
    id_rol INT(2) NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES Rol(id_rol)
);

CREATE TABLE Person(
    dni INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30),
    last_name VARCHAR(30)
);

CREATE TABLE Container_type(
    id_container_type INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    residuo VARCHAR(50),
    color VARCHAR(30),
    description VARCHAR(200)
);

CREATE TABLE Province(
    id_province INT(2) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    province_name VARCHAR(30)
);

CREATE TABLE Department(
    id_department INT(2) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    departament_name VARCHAR(30),
    id_province INT(2),
    FOREIGN KEY (id_province) REFERENCES Province(id_province)
);

CREATE TABLE Location(
    id_location INT(2) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    location_name VARCHAR(30),
    id_department INT(2),
    FOREIGN KEY (id_department) REFERENCES Department(id_department)
);

CREATE TABLE Organization(
    organization_name VARCHAR(30) NOT NULL PRIMARY KEY,
    phone VARCHAR(20),
    email VARCHAR(30),
    id_province INT(2),
    id_department INT(2), 
    id_location INT(2), 
    Organization_type VARCHAR(50),
    FOREIGN KEY (id_province) REFERENCES Province(id_province),
    FOREIGN KEY (id_department) REFERENCES Department(id_department),
    FOREIGN KEY (id_location) REFERENCES Location(id_location)
);

CREATE TABLE Container(
    id_container INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    longitude VARCHAR(30),
    latitude VARCHAR(30),
    id_province INT(2),
    id_department INT(2), 
    id_location INT(2), 
    id_container_type INT(10) NOT NULL,
    organization_name VARCHAR(30) NOT NULL,
    FOREIGN KEY (id_province) REFERENCES Province(id_province),
    FOREIGN KEY (id_department) REFERENCES Department(id_department),
    FOREIGN KEY (id_location) REFERENCES Location(id_location),
    FOREIGN KEY (id_container_type) REFERENCES Container_type(id_container_type),
    FOREIGN KEY (organization_name) REFERENCES Organization(organization_name)
);

insert into Rol(id_rol, rol) value (null, "admin");
insert into Rol(id_rol, rol) value (null, "user");

insert into Province(id_province, province_name) value (null, "Jujuy");
insert into Province(id_province, province_name) value (null, "Salta");
insert into Province(id_province, province_name) value (null, "Tucumán");

insert into Department(id_department, departament_name, id_province) value (null, "Dr. Manuel Belgrano", 1);
insert into Department(id_department, departament_name, id_province) value (null, "Palpalá", 1);
insert into Department(id_department, departament_name, id_province) value (null, "El Carmen", 1);
insert into Department(id_department, departament_name, id_province) value (null, "San Pedro", 1);
insert into Department(id_department, departament_name, id_province) value (null, "Tilcara", 1);

insert into Location(id_location, location_name, id_department) value (null, "San Salvador de Jujuy", 1);
insert into Location(id_location, location_name, id_department) value (null, "La Almona", 1);
insert into Location(id_location, location_name, id_department) value (null, "Lozano", 1);
insert into Location(id_location, location_name, id_department) value (null, "León", 1);
insert into Location(id_location, location_name, id_department) value (null, "Yala" 1);
insert into Location(id_location, location_name, id_department) value (null, "Palpalá", 2);


insert into Container_type(id_container_type, residuo, color, description) value (null, "envases de plasticos, metalicos", "amarillo", 
"latas de convservas bebidas, bandejas de aluminio, aerosoles, botellas de agua, refrescos y leche");
insert into Container_type(id_container_type, residuo, color, description) value (null, "envases de vidrio", "verde", "aqui se puede depositar cualquier envase de vidrio");

insert into Organization(organization_name, phone, email, id_province, id_department, id_location, Organization_type) 
    value ("ProNoa S.R.L.", "0388 427-0598", "pronoa@gmail.com", 1, 2, 6, "Sociedad de responsabilidad limitada");


insert into Organization(organization_name, phone, email, id_province, id_department, id_location, Organization_type) 
    value ("Eco Norte Reciclaje", "0388 15-462-2161", "info@econortereciclado.com.ar", 1, 1, 1, "Sociedad de responsabilidad limitada");


insert into Container(id_container, longitude, latitude, id_province, id_department, id_location, id_container_type, organization_name) 
    value (null, "-24.186265872215632", "-65.29993714871891", 1, 1, 1, 1, "ProNoa S.R.L.");

insert into Container(id_container, longitude, latitude, id_province, id_department, id_location, id_container_type, organization_name) 
    value (null, "-24.184266891394362", "-65.3138125596427", 1, 1, 1, 1, "ProNoa S.R.L.");

insert into Container(id_container, longitude, latitude, id_province, id_department, id_location, id_container_type, organization_name) 
    value (null, "-24.191218420633565", "-65.29398601458216", 1, 1, 1, 2, "ProNoa S.R.L.");

insert into Container(id_container, longitude, latitude, id_province, id_department, id_location, id_container_type, organization_name) 
    value (null, "-24.197691881172982", "-65.29108968307749", 1, 1, 1, 1, "ProNoa S.R.L.");

-- mostrar tablas
show tables;

-- mostrar la tabla cliente
describe client;


select * from client;

insert into client(id_user,user_name,password,email) 
	value (null, "first_user", "password_first_user", "first_user@gmail.com");

update Container set id_location = 2 where id_container = 3;



