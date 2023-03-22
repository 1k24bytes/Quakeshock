const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
const earthquakeDataElements = document.querySelectorAll('.data');

function getMagnitudeColor(magnitude) {
  if (magnitude >= 3 && magnitude < 4.5) {
    return 'green';
  } else if (magnitude >= 4.5 && magnitude < 5.5) {
    return 'orange';
  } else if (magnitude >= 5.5) {
    return 'red';
  } else {
    return 'black';
  }
}

fetch(url)
  .then(response => response.json())
  .then(data => {
    const earthquakes = data.features.filter(earthquake => earthquake.properties.mag > 3).slice(0, 12);

    earthquakes.forEach((earthquake, index) => {
      const { mag, place, time } = earthquake.properties;
      const location = place.split(',').reverse().join(', ');
      const date = new Date(time).toLocaleDateString();
      const timeOfDay = new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      const magnitudeColor = getMagnitudeColor(mag);

      earthquakeDataElements[index].innerHTML = `
        <div class="mag" style="color: ${magnitudeColor};">${mag}</div>
        <div class="info">
          <div class="location">${location}</div>
          <div class="date">${date}</div>
          <div class="time">${timeOfDay}</div>
        </div>
      `;
    });

    console.log('Earthquake data fetched successfully:', data);
  })
  .catch(error => {
    console.error('Error fetching earthquake data', error);
    earthquakeDataElements.forEach(element => {
      element.innerHTML = 'Error fetching earthquake data';
    });
  });