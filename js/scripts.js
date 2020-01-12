const galleryItems = document.getElementById('gallery');
const peopleURL = 'https://randomuser.me/api/?results=12&nat=us';

// Fetch the data and return 12 Objects for the employee directory
async function fetchData(url) {
    const response = await fetch(url);
    const responseJSON = await response.json();

    const profiles = responseJSON.results.map(async (person) => {
        return {...person};
    });
    return Promise.all(profiles);
}

// Generate the HTML for the gallery section and fill it with the employee data
function generateGalleryHTML(data) {
    data.map(employee => {
        const employeeCard = document.createElement('div');
        employeeCard.setAttribute('class', 'card');
        galleryItems.appendChild(employeeCard);

        employeeCard.innerHTML = `
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        `;

        // If a card gets clicked, the employee data gets opened in the Modal window
        employeeCard.addEventListener('click', () => {
            generateModalHTML(employee);
        });
    });
}

// Generate the HTML for the Modal Window
function generateModalHTML(employee) {
    const modalDiv = document.createElement('div');
    modalDiv.setAttribute('class', 'modal-container');
    galleryItems.appendChild(modalDiv);

    // Getting the right value for Birthday [month-day-year]
    const dob = employee.dob.date;
    const modalBirthdayFormat = `${dob.slice(5, 7)}/${dob.slice(8, 10)}/${dob.slice(2, 4)}`;

    modalDiv.innerHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.medium}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}, ${employee.location.state}</p>
                <hr>
                <p class="modal-text">${employee.cell}</p>
                <p class="modal-text">
                    ${employee.location.street.number} ${employee.location.street.name}, 
                    ${employee.location.state}, ${employee.location.postcode}
                </p>
                <p class="modal-text">Birthday: ${modalBirthdayFormat}</p>
            </div>
        </div>
    `;

    // if the close button gets clicked, the modal window is removed from the page
    document.getElementById('modal-close-btn').addEventListener('click', () => {
        galleryItems.removeChild(modalDiv);
    });
}

// Generate the HTML or catch the error if fetching data fails
fetchData(peopleURL)
    .then(generateGalleryHTML)
    .catch(error => {
        galleryItems.innerHTML = '<h3>Sorry, something went wrong..</h3>';
        console.log(error);
    });
