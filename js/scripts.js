const galleryItems = document.getElementById('gallery');
const peopleURL = 'https://randomuser.me/api/?results=10&seed=81ecb727f6ff0098';

async function fetchData(url) {
    const response = await fetch(url);
    console.log(response.url);
    const responseJSON = await response.json();

    const profiles = responseJSON.results.map( async (person) => {
        return {...person};
    });
    console.log(profiles);
    return Promise.all(profiles);
}

function generateHTML(data) {
    data.map(person => {
        const div = document.createElement('div');
        div.setAttribute('class', 'card');
        galleryItems.appendChild(div);
        div.innerHTML = `
            <div class="card-img-container">
                <img class="card-img" src="${person.picture.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="card-text">${person.email}</p>
                <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
            </div>
        `;
    });
}

fetchData(peopleURL)
    .then(generateHTML);