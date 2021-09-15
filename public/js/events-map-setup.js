function initMap() {
	const map = new google.maps.Map(document.querySelector('#map'), {
		zoom: 2,
		center: directions.Madrid.coords,
		// styles: mapStyles.silver,
	})
	const id = document.querySelector('#id').value
	console.log(id)
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
	//   events.forEach((elm) => {
	let position = {
		lat: events.location.coordinates[0],
		lng: events.location.coordinates[1],
	}

	new google.maps.Marker({map, position, title: events.name})
	//   });
}
