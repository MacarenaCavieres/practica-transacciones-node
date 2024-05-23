const url = "/api/v1";
const tBody = document.querySelector("#tBody");
const tBodyTrans = document.querySelector("#tBodyTrans");
const formUsuarios = document.querySelector("#formUsuarios");
const formOne = document.querySelector("#formOne");
const formOneTrans = document.querySelector("#formOneTrans");
const formEdit = document.querySelector("#formEdit");
const formTrans = document.querySelector("#formTrans");

const myModal = new bootstrap.Modal(document.getElementById("modal"));

const getUsers = async () => {
    try {
        const { data } = await axios.get(url + "/usuarios");

        printUsers(data);
    } catch (error) {
        console.error("Error front===> ", error);
        return alert("Ups... algo salio mal");
    }
};

const printUsers = (data) => {
    tBody.textContent = "";

    data.forEach((item) => {
        const tr = document.createElement("tr");
        const tdName = document.createElement("td");
        const tdLast = document.createElement("td");
        const tdMail = document.createElement("td");
        const tdBalance = document.createElement("td");
        const tdbtnes = document.createElement("td");
        const btnEdit = document.createElement("button");
        const btnDelete = document.createElement("button");

        tdName.textContent = item.first_name;
        tdLast.textContent = item.last_name;
        tdMail.textContent = item.email;
        tdBalance.textContent = item.saldo;

        btnEdit.textContent = "Editar";
        btnDelete.textContent = "Eliminar";

        btnEdit.classList.add("btn", "btn-warning", "btn-editar", "mb-2");
        btnDelete.classList.add("btn", "btn-danger", "btn-eliminar");

        btnEdit.dataset.email = item.email;
        btnDelete.dataset.email = item.email;

        btnDelete.addEventListener("click", (e) => {
            if (confirm("¿Seguro quieres eliminar este usuario?")) {
                removeOne(e.target.dataset.email);
            }
        });

        btnEdit.addEventListener("click", (e) => {
            myModal.show();

            formEdit.first_name.value = item.first_name;
            formEdit.last_name.value = item.last_name;
            formEdit.email.value = item.email;
            formEdit.saldo.value = item.saldo;

            formEdit.dataset.email = item.email;
        });

        tdbtnes.appendChild(btnEdit);
        tdbtnes.appendChild(btnDelete);

        tr.appendChild(tdName);
        tr.appendChild(tdLast);
        tr.appendChild(tdMail);
        tr.appendChild(tdBalance);
        tr.appendChild(tdbtnes);

        tBody.appendChild(tr);
    });
};

formUsuarios.addEventListener("submit", async (e) => {
    e.preventDefault();
    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const email = e.target.email.value;
    const saldo = e.target.saldo.value;

    if (!first_name.trim() || !last_name.trim() || !email.trim() || !saldo.trim())
        return alert("Todos los campos obligatorios");

    try {
        await axios.post(url + "/usuarios", {
            first_name,
            last_name,
            email,
            saldo,
        });
        alert("Usuario agregado");
        getUsers();
    } catch (error) {
        console.error("Error front===> ", error);
        return alert("Ups... algo salio mal");
    }
});

formOne.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    if (!email) return alert("Campo obligatorio");

    try {
        const { data } = await axios.get(url + `/usuarios/${email}`);

        printUsers(data);
    } catch (error) {
        console.error("Error front===> ", error);
        return alert("Ups... algo salio mal");
    }
});

const removeOne = async (email) => {
    try {
        await axios.delete(url + `/usuarios/${email}`);
        getUsers();
        alert("Usuario eliminado");
    } catch (error) {
        console.error("Error front===> ", error);
        return alert("Ups... algo salio mal");
    }
};

formEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    updateOne(formEdit.dataset.email);
});

const updateOne = async (email) => {
    try {
        const first_name = formEdit.first_name.value;
        const last_name = formEdit.last_name.value;
        const email_user = formEdit.email.value;
        const saldo = formEdit.saldo.value;

        if (!first_name || !last_name || !email_user || !saldo) return alert("Todos los campos obligatorios");

        const { data } = await axios.put(url + `/usuarios/${email}`, {
            first_name,
            last_name,
            email: email_user,
            saldo,
        });

        printUsers(data);
        myModal.hide();
        alert("Usuario editado");
    } catch (error) {
        console.error("Error front===> ", error);
        return alert("Ups... algo salio mal");
    }
};

getUsers();

// -----------------------transacciones-----------------------

const getTrans = async () => {
    try {
        const { data } = await axios.get(url + "/transacciones");
        printTrans(data);
    } catch (error) {
        console.error("Error front===> ", error);
        return alert("Ups... algo salio mal");
    }
};

const printTrans = (data) => {
    tBodyTrans.textContent = "";

    data.forEach((item) => {
        const tr = document.createElement("tr");
        const tdID = document.createElement("td");
        const tdOrigin = document.createElement("td");
        const tdAmount = document.createElement("td");
        const tdDestination = document.createElement("td");

        tdID.textContent = item.id;
        tdOrigin.textContent = item.email_origen;
        tdAmount.textContent = item.monto_transferencia;
        tdDestination.textContent = item.email_destino;

        tr.appendChild(tdID);
        tr.appendChild(tdOrigin);
        tr.appendChild(tdAmount);
        tr.appendChild(tdDestination);

        tBodyTrans.appendChild(tr);
    });
};

formTrans.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email_origen = e.target.email_origen.value;
    const monto_transferencia = e.target.monto_transferencia.value;
    const email_destino = e.target.email_destino.value;

    if (!email_origen.trim() || !monto_transferencia.trim() || !email_destino.trim())
        return alert("Todos los campos obligatorios");

    try {
        await axios.post(url + "/transacciones", {
            email_origen,
            monto_transferencia,
            email_destino,
        });

        getTrans();
    } catch (error) {
        console.error("Error front===> ", error);
        return alert("Ups... algo salio mal");
    }
});

formOneTrans.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    if (!email.trim()) return alert("Campo obligatorio");

    try {
        const { data } = await axios.get(url + `/transacciones/${email}`);

        printTrans(data);
    } catch (error) {
        console.error("Error front===> ", error);
        return alert("Ups... algo salio mal");
    }
});

getTrans();
