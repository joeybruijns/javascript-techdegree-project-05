const galleryItems = document.getElementById('gallery');
const card = document.getElementsByClassName('card');
const peopleURL = 'https://randomuser.me/api/?results=12&seed=6dcfff5c6d6c8940';

// Fetch the data and return 12 Objects for the employee directory
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

// Generate the HTML for the gallery section and fill it with the employee data
function generateGalleryHTML(data) {
    data.map(employee => {
        const div = document.createElement('div');
        div.setAttribute('class', 'card');
        galleryItems.appendChild(div);
        div.innerHTML = `
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        `;
    });
}

// document.getElementsByClassName('card').addEventListener('click', (event) => {
//     if (event.target.tagName === 'DIV') {
//         alert('test123');
//     }
// });

fetchData(peopleURL)
    .then(generateGalleryHTML);
