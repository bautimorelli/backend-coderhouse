const socketClient = io()

document.getElementById("alertContainer").style.display = "block"
document.getElementById("tableContainer").style.display = "none"

//capturar los datos del usuario
let user = ""
Swal.fire({
	title: "Tu Perfil",
	html: `<input type="email" id="email" class="swal2-input" placeholder="correo electronico">
    <input type="text" id="name" class="swal2-input" placeholder="Nombre">
    <input type="text" id="lastname" class="swal2-input" placeholder="Apellido">
	<input type="number" id="age" class="swal2-input" placeholder="Edad">
	<input type="text" id="alias" class="swal2-input" placeholder="Alias">
	<input type="url" id="avatar" class="swal2-input" placeholder="Avatar URL">`,
	confirmButtonText: "Confirmar",
	focusConfirm: false,
	allowOutsideClick: false,
	preConfirm: () => {
		//capturar valores de los campos del formulario
		const email = Swal.getPopup().querySelector("#email").value
		const name = Swal.getPopup().querySelector("#name").value
		const lastname = Swal.getPopup().querySelector("#lastname").value
		const age = Swal.getPopup().querySelector("#age").value
		const alias = Swal.getPopup().querySelector("#alias").value
		const avatar = Swal.getPopup().querySelector("#avatar").value
		if (!email || !name || !lastname || !age || !alias || !avatar) {
			Swal.showValidationMessage(`Por favor completa todos los campos`)
		}
		return { email, name, lastname, age, alias, avatar }
	},
}).then((response) => {
	user = response.value
})

//Productos......
//Productos Socket
const productsContainer = document.getElementById("productsContainer")
socketClient.on("products", (data) => {
	if (data.length != 0) {
		document.getElementById("alertContainer").style.display = "none"
		document.getElementById("tableContainer").style.display = "block"
	}
	let products = ""
	data.forEach((element) => {
		products += `<tr>
        <th scope="row" class="align-middle"> ${element.name}</th>
        <td class="align-middle">${element.price}</td>
        <td class="align-middle"><img src=${element.thumbnail} class="thumbnail"></td>
        </tr>`
	})
	productsContainer.innerHTML = products
})

//Envio formulario de producto
const productForm = document.getElementById("productForm")
productForm.addEventListener("submit", (event) => {
	event.preventDefault()
	const product = {
		name: document.getElementById("inputName").value,
		price: document.getElementById("inputPrice").value,
		thumbnail: document.getElementById("inputThumbnail").value,
	}
	socketClient.emit("newProduct", product)
})

//Chat.....
//Denormalizacion
const authorSchema = new normalizr.schema.Entity(
	"authors",
	{},
	{ idAttribute: "email" }
)
const messageSchema = new normalizr.schema.Entity("messages", {
	author: authorSchema,
})
const chatSchema = new normalizr.schema.Entity("chats", {
	messages: [messageSchema],
})

//Chat Socket
const chatContainer = document.getElementById("chatContainer")
const compressionContainer = document.getElementById("compression")
socketClient.on("messagesChat", async (data) => {
	const denormalData = normalizr.denormalize(data.result, chatSchema, data.entities)
	let messagesElements = ""
	denormalData.messages.forEach((element) => {
		messagesElements += `<div class="chatRow">
        <spam class="chatUsername">${element.author.name}</spam>&nbsp;[
        <spam class="chatDate">${element.date}</spam>]:&nbsp;
        <spam class="chatText">${element.text}</spam>
        </div>`
	})
	chatContainer.innerHTML = messagesElements
	const porcentage = compressionPorcentage(data).toFixed(2)
	compressionContainer.innerHTML =
		"Porcentaje de Compresion: " + porcentage + "%"
})

//Envio de mensaje chat
const chatForm = document.getElementById("chatForm")
const chatMessage = document.getElementById("messageChat")
chatForm.addEventListener("submit", (event) => {
	event.preventDefault()
	const message = {
		author: user,
		date: formatDate(new Date()),
		text: chatMessage.value,
	}
	socketClient.emit("newMsg", message)
	chatMessage.value = ""
})

//Funciones.....
function formatDate(date) {
	const dd = date.getDate()
	const mm = date.getMonth() + 1
	const yyyy = date.getFullYear()
	const hh = date.getHours()
	const min = date.getMinutes()
	const ss = date.getSeconds()

	const formattedDate =
		dd + "/" + mm + "/" + yyyy + " " + hh + ":" + min + ":" + ss
	return formattedDate
}

function compressionPorcentage(normalizedData) {
	const normalizedDataSize = JSON.stringify(normalizedData, null, "\t").length
	const normalData = normalizr.denormalize(
		normalizedData.result,
		chatSchema,
		normalizedData.entities
	)
	const normalDataSize = JSON.stringify(normalData, null, "\t").length
	return 100 - (normalizedDataSize / normalDataSize) * 100
}
