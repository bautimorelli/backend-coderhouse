const socketClient = io()
const productsContainer = document.getElementById("productsContainer")
const chatContainer = document.getElementById("chatContainer")

document.getElementById("alertContainer").style.display = "block"
document.getElementById("tableContainer").style.display = "none"

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

socketClient.on("messagesChat", (data) => {
	let messages = ""
	data.forEach((element) => {
		messages += `<div class="chatRow">
        <spam class="chatUsername">${element.author}</spam>&nbsp;[
        <spam class="chatDate">${element.date}</spam>]:&nbsp;
        <spam class="chatText">${element.text}</spam>
        </div>`
	})
	chatContainer.innerHTML = messages
})

//capturar el nombre del usuario
let user = ""
Swal.fire({
	title: "Bienvenido",
	text: "Ingresa tu nombre de usuario",
	input: "text",
	allowOutsideClick: false,
}).then((response) => {
	user = response.value
	document.getElementById("username").innerHTML = `Usuario: ${user}`
})

const productForm = document.getElementById("productForm")
productForm.addEventListener("submit", (event) => {
	event.preventDefault()
	const product = {
		name: document.getElementById("inputName").value,
		price: document.getElementById("inputPrice").value,
		thumbnail: document.getElementById("inputThumbnail").value,
	}
	//envia nuevo mensaje
	socketClient.emit("newProduct", product)
})

const chatForm = document.getElementById("chatForm")
chatForm.addEventListener("submit", (event) => {
	event.preventDefault()
	const message = {
		author: user,
		date: formatDate(new Date()),
		text: document.getElementById("messageChat").value,
	}
	//envia nuevo mensaje
	socketClient.emit("newMsg", message)
})

function formatDate(date) {
	console.log(date)
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
