import { pool } from "../database/connection.js";

const getAll = async () => {
    const { rows } = await pool.query("select * from transacciones");
    return rows;
};

const postOne = async (email_origen, monto_transferencia, email_destino) => {
    try {
        await pool.query("begin");

        const query1 = {
            text: "update usuarios set saldo = saldo - $1 where email = $2",
            values: [monto_transferencia, email_origen],
        };

        await pool.query(query1);

        const query3 = {
            text: "update usuarios set saldo = saldo + $1 where email = $2",
            values: [monto_transferencia, email_destino],
        };

        await pool.query(query3);

        const query2 = {
            text: "insert into transacciones (email_origen, monto_transferencia, email_destino) values ($1,$2,$3) returning *",
            values: [email_origen, monto_transferencia, email_destino],
        };

        const { rows } = await pool.query(query2);

        await pool.query("commit");

        return rows[0];
    } catch (error) {
        console.error("Error en la transaccion==> ", error);
        await pool.query("rollback");
        throw error;
    }
};

const getOne = async (email) => {
    const query = {
        text: "select * from transacciones where email_origen = $1 or email_destino = $1 limit 20",
        values: [email],
    };

    const { rows } = await pool.query(query);

    return rows;
};

export const Trans = {
    getAll,
    postOne,
    getOne,
};
