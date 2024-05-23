drop table if exists transacciones;
drop table if exists usuarios;

create table usuarios (
	first_name varchar(100),
	last_name varchar(100),
	email varchar (100) primary key,
	saldo int check (saldo >= 0)
);



create table transacciones(
	id serial primary key,
	email_origen varchar (100),
	foreign key (email_origen) references usuarios (email) on update cascade on delete cascade,
	monto_transferencia int check (monto_transferencia > 0),
	email_destino varchar(100)
);

select * from usuarios;
select * from transacciones;