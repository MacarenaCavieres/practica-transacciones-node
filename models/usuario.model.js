import { pool } from "../database/connection.js";

const getAll = async () => {
    const { rows } = await pool.query("select * from usuarios;");
    return rows;
};

export const User = {
    getAll,
};
