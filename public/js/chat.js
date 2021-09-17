let currentMessages = 0
window.addEventListener('load', () => {
	// const currentMessages = checkNewMessages().then((res) => res)
	setInterval(() => {
		// currentMessages !== checkNewMessages().then((res))
		checkNewMessages(currentMessages)
		// function pageScroll() {
		// 	// If condition to set repeat
		// 	if (count < 2) {
		// 		var objDiv = document.getElementById('chat-body')
		// 		objDiv.scrollTop = objDiv.scrollTop + 1
		// 		if (objDiv.scrollTop == objDiv.scrollHeight - 61) {
		// 			setTimeout(function () {
		// 				objDiv.scrollTop = 0
		// 				count++
		// 			}, 1200)
		// 		}
		// 		//set scrolling time start
		// 		my_time = setTimeout('pageScroll()', 10)
		// 		//set scrolling time end
		// 	}
		// }
		scrollDiv()
	}, 1000)
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
	let div = document.getElementById('chat-body')
	div.scrollTop = 9999
}

window.addEventListener('load', scrollDiv())
