import { pool } from "../database/connection.js";

const getAll = async () => {
    const { rows } = await pool.query("select * from usuarios order by saldo desc;");
    return rows;
};

const postOne = async (first_name, last_name, email, saldo) => {
    const query = {
        text: "insert into usuarios (first_name,last_name,email,saldo) values ($1,$2,$3,$4) returning *",
        values: [first_name, last_name, email, saldo],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

const getOne = async (email) => {
    const query = {
        text: "select * from usuarios where email = $1",
        values: [email],
    };

    const { rows } = await pool.query(query);

    return rows;
};

const deleteOne = async (email) => {
    const query = {
        text: "delete from usuarios where email = $1 returning *",
        values: [email],
    };
    const { rows } = await pool.query(query);
    return rows[0];
};

export const User = {
    getAll,
    postOne,
    getOne,
    deleteOne,
};
