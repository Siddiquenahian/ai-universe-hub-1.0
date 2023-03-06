const loadAi = async(dataLimit)=> {
    const url =`https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayAi(data.data.tools, dataLimit);
}

const displayAi = (universes, dataLimit)=>{
    const aiContainer  = document.getElementById('ai-container');
    aiContainer.textContent='';
    const showAll = document.getElementById('show-all');
    if(dataLimit && universes.length > 6){
        universes = universes.slice(0,6);
        
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    universes.forEach(universe =>{
        const aiDiv = document.createElement('div');
        aiDiv.setAttribute('id', 'col-id');
        aiDiv.classList.add('col');
        aiDiv.innerHTML=`
        <div class="card h-100 p-4" data-date="${universe.published_in}">
            <img src="${universe.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol>
                    <li>Natural language processing</li>
                    <li>Contextual understanding</li>
                    <li>Text generation</li>
                </ol>
            </div>
            <div class="card-footer">
                <div>
                    <h5 class="card-title">${universe.name}</h5>
                    <p class="card-text"><i class="fa-solid fa-calendar-days"></i>${universe.published_in}</p>

                </div>
                <div class="mt-3">
                    <button id="btn-details" onclick ="loadUniverseDetails('${universe.id}')" class="btn-arrow border border-danger  modal-dialog-centered"  data-bs-toggle="modal" data-bs-target="#UniverseModal"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
        `;
        
        aiContainer.appendChild(aiDiv);
    });
   
    toggleSpinner(false);
}
const showAll = (dataLimit) =>{
    toggleSpinner(true);
    loadAi(dataLimit);
}
const toggleSpinner = isLoading =>{
    const loadSection = document.getElementById('loader');
    if(isLoading){
        loadSection.classList.remove('d-none');
    }
    else{
        loadSection.classList.add('d-none');
    }
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


document.getElementById('sort-by-date').addEventListener('click', function(){
        sortCards();
        
});
document.getElementById('btn-show-all').addEventListener('click', function(){
    showAll();
})

const loadUniverseDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayUniverseDetails(data.data);
}

const displayUniverseDetails = universe =>{
    const UniverseModal =document.getElementById('UniverseModal');
    const universeDetail = document.getElementById('universe-detail');
    // UniverseModal.textContent='';
    universeDetail.textContent='';
    universeDetail.innerHTML=`
    <div id="card-container">
        <div class="card card-1 me-4 p-4" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${universe.description ? universe.description: 'No Description'}</h5>
                <div class="price">
                    <div class="price-1">
                        <p class="me-3 text-center text-success">
                            ${universe.pricing ? universe.pricing[0].price:'Free of Cost/'}<br>
                            ${universe.pricing ? universe.pricing[0].plan: 'Basic'}
                        </p>
                    </div>
                    <div class="price-1">
                        <p class="me-3 text-center text-warning">
                            ${universe.pricing ? universe.pricing[1].price:'Free Of Cost/'}<br>
                            ${universe.pricing ? universe.pricing[1].plan: 'Pro'}
                        </p>
                    </div>
                    <div class="price-1">
                        <p class="me-3 text-center text-danger">
                            ${universe.pricing ? universe.pricing[2].price:'Free of Cost /'}<br>
                            ${universe.pricing ? universe.pricing[2].plan: 'Enterprise'}
                        </p>
                    </div>
                </div>
                <div class="feature">
                    <div class="me-2">
                        <h3>Features</h3>
                        <ul>
                            <li>${universe.features['1'].feature_name}</li>
                            <li>${universe.features['2'].feature_name}</li>
                            <li>${universe.features['3'].feature_name}</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Integrations</h3>
                        <ul>
                            <li>${universe.integrations ? universe.integrations[0] : 'No Data Found'}</li>
                            <li>${universe.integrations ? universe.integrations[1] : 'No Data Found'}</li>
                            <li>${universe.integrations ? universe.integrations[2] : 'No Data Found'}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="card container p-4" style="width: 18rem;">
            <img src="${universe.image_link[0]}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="text-center">${universe.input_output_examples ? universe.input_output_examples[0].input: 'Can you give any example?'}</h5>
                <p class="card-text text-center">${universe.input_output_examples ? universe.input_output_examples[0].output: 'No! Not Yet! Take a break!!!'}</p>
            </div>
            <div id="show-accuracy" class="overlay">
                <p class="text-center"><span id="accuracy-value">${universe.accuracy.score ? universe.accuracy.score*100:'d-none'}</span>% accuracy</p>
            </div>
        </div>
        
    </div>
    `
    const showAccuracy = document.getElementById('show-accuracy');
    if(typeof(universe.accuracy.score)==='number'){
        showAccuracy.classList.remove('d-none');
    }
    else{
        showAccuracy.classList.add('d-none');
    };
}

loadAi(6);