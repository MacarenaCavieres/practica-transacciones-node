import { User } from "../models/usuario.model.js";
import { handleErrors } from "../database/erros.js";

const getAllUsers = async (req, res) => {
    try {
        const data = await User.getAll();

        return res.json(data);
    } catch (error) {
        console.error("Error==> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const postOneUser = async (req, res) => {
    try {
        const { first_name, last_name, email, saldo } = req.body;

        if (!first_name || !last_name || !email || !saldo)
            return res.status(400).json({ ok: false, msg: "Datos incompletos" });

        const data = await User.postOne(first_name, last_name, email, saldo);

        if (!data) throw new Error("Ups... algo salio mal");

        return res.status(201).json(data);
    } catch (error) {
        console.error("Error==> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

export const UserMethod = {
    getAllUsers,
    postOneUser,
};
