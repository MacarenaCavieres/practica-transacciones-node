import "dotenv/config";
import express from "express";
import userRoute from "./routes/usuario.route.js";
import transRouter from "./routes/transfer.routes.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/usuarios", userRoute);
app.use("/api/v1/transacciones", transRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
