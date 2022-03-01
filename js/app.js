const loadPhones = () => {
  const searchField = document.getElementById('search-input');
  const searchText = searchField.value;
  searchField.value = '';

  if (searchText === '') {
    alert('Please enter a search text');
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayPhones(data.data));
  }
};
const displayPhones = (phones) => {
  const searchResult = document.getElementById('search-result');
  searchResult.textContent = '';
  for (const phone of phones) {
    const phoneElement = document.createElement('div');
    phoneElement.innerHTML = `    
        <div class="col">
            <div class="card">
                <img src="${phone.image}" class="card-img-top " alt="...">
                <div class="card-body">
                    <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>                    
                    <h5 class="card-title text-muted">Brand: ${phone.brand}</h5>                    
                </div>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-outline-success w-50 mx-auto mb-3" type="submit">Explore More -></button>
            </div>
        </div>        
    `;
    searchResult.appendChild(phoneElement);
  }
};

const loadPhoneDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => phoneDetails(data.data));
};

const phoneDetails = (phone) => {
  console.log(phone);
  // const keyFeatures = Object.entries(phone.mainFeatures);
  const { chipSet, displaySize, memory, storage, sensors } = phone.mainFeatures;
  const phoneDetails = document.getElementById('phone-details');
  phoneDetails.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card', 'mb-3');
  div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="..." />
    <div class="card-body">
    <h5 class="card-title">Phone Name: ${phone.slug}</h5> 
    <p class="card-text text-danger fw-bold">Release Date: ${phone.releaseDate ? phone.releaseDate : 'Release date unavailable'}</p>                   
    <h5 class="card-title text-muted">Brand: ${phone.brand}</h5>
    <h5 class="card-text fw-bold">Features: </h5>
    <ul>
          <li>chipSet: ${chipSet}</li>
          <li>Display: ${displaySize}</li>
          <li>Memory: ${memory}</li>
          <li>Storage: ${storage}</li>
          <li>Sensors: ${sensors}</li>
    </ul>
    </div>
  `;
  phoneDetails.appendChild(div);
};
