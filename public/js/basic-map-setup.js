function initMap() {
	const myMap = new google.maps.Map(document.querySelector('#myMap'), {
		zoom: 12,
		center: directions.ironhackBCN.coords,
		styles: mapStyles.yellowParks,
	})

	new google.maps.Marker({
		map: myMap,
		position: directions.ironhackBCN.coords,
		title: directions.ironhackBCN.title,
	})
}
