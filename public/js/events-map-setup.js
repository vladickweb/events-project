function initMap() {
	const map = new google.maps.Map(document.querySelector('#map'), {
		zoom: 16,
		center: directions.Madrid.coords,
	})
	const id = document.querySelector('#id').value
	getEvents(map, id)
}

function getEvents(map, id) {
	axios
		.get(`http://localhost:3000/api/eventos/${id}`)
		.then((response) => {
			printEvents(response.data, map)
		})
		.catch((err) => console.log(err))
}

function printEvents(events, map) {
	let position = {
		lat: events.location.coordinates[0],
		lng: events.location.coordinates[1],
	}
	map.setCenter({lat: position.lat, lng: position.lng});

	new google.maps.Marker({map, position, title: events.name})
}