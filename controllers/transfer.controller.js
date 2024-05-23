import { Trans } from "../models/transfer.model.js";
import { handleErrors } from "../database/erros.js";

const getAllTrans = async (req, res) => {
    try {
        const data = await Trans.getAll();

        return res.json(data);
    } catch (error) {
        console.error("Error==> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const postOneTrans = async (req, res) => {
    try {
        const { email_origen, monto_transferencia, email_destino } = req.body;

        if (!email_origen || !monto_transferencia || !email_destino)
            return res.status(400).json({ ok: false, msg: "Faltan datos" });

        const data = await Trans.postOne(email_origen, monto_transferencia, email_destino);

        if (!data) return res.status(500).json({ ok: false, msg: "Error de servidor" });

        return res.status(201).json(data);
    } catch (error) {
        console.error("Error==> ", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

export const TransMethod = {
    getAllTrans,
    postOneTrans,
};
