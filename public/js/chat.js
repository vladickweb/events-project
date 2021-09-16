let currentMessages = 0
window.addEventListener('load', () => {
	// const currentMessages = checkNewMessages().then((res) => res)
	setInterval(() => {
	// currentMessages !== checkNewMessages().then((res))
	checkNewMessages(currentMessages)
	// clearChat()
	// getMessages()
	// scrollDiv()
	}, 500)
})

document
	.getElementById('newMessageForm')
	.addEventListener('submit', function (e) {
		e.preventDefault()

		const form = document.querySelectorAll('#newMessageForm input')
		const message = {
			name: form[0].value,
			body: form[1].value,
			id: form[2].value,
		}
		clearChat()
		getMessages()
		sendMessage(message)
		scrollDiv()
		form[1].value = ''
	})

function sendMessage(message) {
	axios({
		method: 'POST',
		url: '/api/messages/create',
		data: message,
	})
}

function checkNewMessages(current) {
	const form = document.querySelectorAll('#newMessageForm input')
	const id = form[2].value
	return axios({
		method: 'GET',
		url: `/api/messages/${id}`,
	}).then((res) => {
		const numMessages = res.data.length
		if (numMessages !== current) {
			clearChat()
			getMessages()
			// sendMessage(message)
			scrollDiv()
			currentMessages = numMessages
		}
	})
}

function getMessages() {
	const form = document.querySelectorAll('#newMessageForm input')
	const id = form[2].value
	axios({
		method: 'GET',
		url: `/api/messages/${id}`,
	}).then((res) => {
		const chat = document.querySelector('.chat-body')

		res.data.forEach((message) => {
			chat.innerHTML += `<h6>${message.name.name}</h6> <p class="btn btn-primary rounded-pill">${message.body}</p> <br/>`
		})
	})
}

function clearChat() {
	const chat = document.querySelector('.chat-body')
	chat.innerHTML = ''
}

function scrollDiv() {
	console.log('funciono')
	let div = document.getElementById('chat-body')
	console.log(div)
	div.scrollTop = 9999
}

window.addEventListener('load', scrollDiv())
