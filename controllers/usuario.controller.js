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

export const UserMethod = {
    getAllUsers,
};
