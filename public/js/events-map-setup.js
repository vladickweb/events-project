function initMap() {
  const map = new google.maps.Map(document.querySelector("#map"), {
    zoom: 10,
    center: directions.Amnesia.coords,
   // styles: mapStyles.silver,
  });

   getEvents(map);
  }

  function getEvents(map) {
    axios
      .get("/eventos/api")
      .then((response) => printEvents(response.data, map))
      .catch((err) => console.log(err));
  }

  function printEvents(events, map) {
    events.forEach((elm) => {
      let position = {
        lat: elm.location.coordinates[0],
        lng: elm.location.coordinates[1],
      };

      new google.maps.Marker({ map, position, title: elm.name });
    });
}
