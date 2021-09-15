document
	.getElementById('newMessageForm')
	.addEventListener('submit', function (e) {
		e.preventDefault()
		console.log('hola')
		const form = document.querySelectorAll('#newMessageForm input')
		const message = {
			name: form[0].value,
			body: form[1].value,
		}

		clearChat()
		sendMessage(message)
		getMessages()
	})

function sendMessage(message) {
	axios({
		method: 'POST',
		url: '/api/messages/create',
		data: message,
	})
}

function getMessages() {
	axios({
		method: 'GET',
		url: '/api/messages',
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
