const cards = document.querySelectorAll('.card'); // select all card elements
        cards.forEach(card => {
            card.classList.add('col-sm-6', 'col-md-4', 'col-lg-4', 'mb-4');
        });
        const cardArray = Array.from(cards); // convert to array for sorting

        cardArray.sort(function(a, b) {
        const dateA = new Date(a.dataset.date.split('-').reverse().join('-'));
        const dateB = new Date(b.dataset.date.split('-').reverse().join('-'));
        return dateA - dateB;
        });

        const cardContainer = document.querySelector('.card-container'); // select the container for your cards
        cardArray.forEach(function(card) {
        cardContainer.appendChild(card); // append each sorted card to the container
        });
function sortCards() {
  // Select all the card elements
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
        card.classList.add('col-sm-6', 'col-md-4', 'col-lg-4', 'mb-4');
        card.classList.remove('h-100');
    });

  // Convert the NodeList to an array
  const cardsArray = Array.from(cards);

  // Sort the array based on the data-date attribute value
  cardsArray.sort((a, b) => {
    const dateA = new Date(a.dataset.date.split('-').reverse().join('-'));
    const dateB = new Date(b.dataset.date.split('-').reverse().join('-'));
    return dateB - dateA;
  });

  // Loop through the sorted array and append each card element to its parent container
  const parent = document.querySelector('.card-container');
  cardsArray.forEach(card => {
    parent.appendChild(card);
  });
}

function sortCards() {
  // Select all the card elements
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.classList.add('col-sm-6', 'col-md-4', 'col-lg-4', 'mb-4');
    card.classList.remove('h-100');
  });

  // Convert the NodeList to an array
  const cardsArray = Array.from(cards);

  // Sort the array based on the data-date attribute value
  cardsArray.sort((a, b) => {
    const dateA = a.dataset.date ? new Date(a.dataset.date.split('-').reverse().join('-')) : new Date(0);
    const dateB = b.dataset.date ? new Date(b.dataset.date.split('-').reverse().join('-')) : new Date(0);
    return dateB - dateA;
  });

  // Loop through the sorted array and append each card element to its parent container
  const parent = document.querySelector('.card-container');
  if (parent !== null) {
    cardsArray.forEach(card => {
      parent.appendChild(card);
    });
  }

  // Move the modal details element outside of the parent container
//   const modalDetails = document.querySelector('#modal-details');
//   const newDiv = document.createElement('div');
//   if (modalDetails !== null) {
//     newDiv.innerHTML = modalDetails.innerHTML;
//     const modalParent = document.querySelector('body');
//     modalParent.appendChild(newDiv);
//   }
}