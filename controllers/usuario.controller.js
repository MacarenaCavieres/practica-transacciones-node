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

        if (!data) return res.status(500).json({ ok: false, msg: "Algo salio mal" });
        return res.status(201).json(data);
    } catch (error) {
        console.error("Error==> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const getOneUser = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) return res.status(400).json({ ok: false, msg: "Algo salio mal" });

        const data = await User.getOne(email);

        if (!data) return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });

        return res.json(data);
    } catch (error) {
        console.error("Error==> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const deleteOneUser = async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) return res.status(400).json({ ok: false, msg: "Algo salio mal" });

        const data = await User.deleteOne(email);

        if (!data) return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });

        return res.json(data);
    } catch (error) {
        console.error("Error==> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const putOneUser = async (req, res) => {
    try {
        const { email } = req.params;
        const { first_name, last_name, saldo } = req.body;

        if (!first_name || !last_name || !email || !saldo)
            return res.status(400).json({ ok: false, msg: "Datos incompletos" });

        const data = await User.putOne(first_name, last_name, email, saldo);

        if (!data) return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });

        return res.json(data);
    } catch (error) {
        console.error("Error==> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

export const UserMethod = {
    getAllUsers,
    postOneUser,
    getOneUser,
    deleteOneUser,
    putOneUser,
};
