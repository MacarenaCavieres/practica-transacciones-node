const url = "/api/v1";
const tBody = document.querySelector("#tBody");
const formUsuarios = document.querySelector("#formUsuarios");

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

    if (!first_name || !last_name || !email || !saldo) return alert("Todos los campos obligatorios");

    try {
        await axios.post(url + "/usuarios", {
            first_name,
            last_name,
            email,
            saldo,
        });
        getUsers();
    } catch (error) {
        console.error("Error front===> ", error);
        return alert("Ups... algo salio mal");
    }
});

getUsers();
