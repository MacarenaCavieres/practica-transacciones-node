import { pool } from "../database/connection.js";

const getAll = async () => {
    const { rows } = await pool.query("select * from usuarios;");
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

export const User = {
    getAll,
    postOne,
};
