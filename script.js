// ########################################################
// ########### Generating the periodic table ##############
// ########################################################


// Finds the container that holds all the elements
var tableContainer = document.querySelector('.periodic-table');

var currentElementPosition = 1;

// Loops through the all the data in element-data.js
elementsData.forEach(item => {
    // Creates a generic div, which will hold the data for each element
    const element = document.createElement('button');
    
    // Sets attributes to each div, for styling and selecting
    element.setAttribute('class', 'element__container');
    element.setAttribute('data-element-category', item['category']);
    element.setAttribute('data-element-position', item['atomicNumber']);

    // Stores the position of each item, for other functions
    var elementPosition = Number(element.getAttribute('data-element-position'));

    // Adds click and hover events to each element
    element.addEventListener('click', function(){
        currentElementPosition = elementPosition;
        toggleContainerVisibility();
        createElementDetails();
    });
    element.addEventListener('mouseenter', function(){
        hoverInfo(elementPosition);
    });
    element.addEventListener('focus', function(){
        hoverInfo(elementPosition);
    });

    // Injects child elements with Atomic Number and Symbol
    element.innerHTML = `
        <h5 class='element__atomic-number'>${item['atomicNumber']}</h5>
        <h3 class='element__atomic-symbol'>
            <abbr title='${item['name']}'>
                ${item['symbol']}
            </abbr>
        </h3>
    `
    tableContainer.appendChild(element);
});

// On hover
function hoverInfo(currentHover) {
    const currentIndex = currentHover - 1;

    var hoverName = document.querySelector('.info--name');
    var hoverMass = document.querySelector('.info--mass');
    var hoverPhase = document.querySelector('.info--phase');

    hoverName.innerHTML = `${elementsData[currentIndex]['name']}`;
    hoverMass.innerHTML = `${elementsData[currentIndex]['atomicMass']}`;
    hoverPhase.innerHTML = `${elementsData[currentIndex]['phase']}`;
}

document.addEventListener('keydown', function(event) {
    if (event.keyCode == '37'){
        currentElementPosition -= 1;
        createElementDetails();
        event.preventDefault();
    } else if (event.keyCode == '39'){
        currentElementPosition += 1;
        createElementDetails();
        event.preventDefault();
    }
});

var previousButton = document.querySelector('.navigation--previous');
previousButton.addEventListener('click', function(){
    currentElementPosition -= 1;
    createElementDetails();
});

var nextButton = document.querySelector('.navigation--next');
nextButton.addEventListener('click', function(){
    currentElementPosition += 1;
    createElementDetails();
});

function createElementDetails() {
    if (currentElementPosition < 1){
        currentElementPosition = elementsData.length;
    } else if (currentElementPosition > elementsData.length){
        currentElementPosition = 1;
    }

    // Lists every element with the same data attribute
    var elementDetails = document.querySelectorAll('[data-element-property]');

    // Loops through each item
    for(var i = 0; i < elementDetails.length; i++){

        // Finds what the current value is for item
        var currentElementProperty = elementDetails[i].getAttribute('data-element-property');

        // That value is then used to find the corresponding text from elements-data.js, using elementPosition to get the right index 

        elementDetails[i].innerHTML = elementsData[currentElementPosition-1][`${currentElementProperty}`];
    }
    var infoContainer = document.querySelector('.main-content');

    if (infoContainer.classList.contains('info__container--visible')){
        document.title = `${elementsData[currentElementPosition-1]['name']} | Elements+`;
    }
}

function toggleContainerVisibility() {
    window.scrollTo(0, 0);
    var infoContainer = document.querySelector('.main-content');
    infoContainer.classList.toggle('info__container--hidden');
    infoContainer.classList.toggle('info__container--visible');
    if(infoContainer.classList.contains('info__container--hidden')){
        document.title = 'Periodic Table | Elements+';
    } else if (infoContainer.classList.contains('info__container--visible')){
        document.title = `${elementsData[currentElementPosition-1]['name']} | Elements+`;
    }
};


// ########################################################
// ################ Section for Filters ###################
// ########################################################


// Lists the filter items
var filterItems = document.getElementsByClassName('filter__item');

// Loop through each item in the list
for (var i = 0; i < filterItems.length; i++){
    // The index of each item corresponds to a category from elements-data.js
    const itemCategory = elementCategory[i];

    // Lists all the elements with the current element category
    const getCurrentItems = document.querySelectorAll(`[data-element-category="${itemCategory}"]`);

    // On tabbing/hover of each filter, toggle an active class for each item in getCurrentItems

    filterItems[i].addEventListener('focus', function(){
        toggleCurrentItems(getCurrentItems);
    });

    filterItems[i].addEventListener('blur', function(){
        toggleCurrentItems(getCurrentItems);
    });

    // filterItems[i].addEventListener('mouseenter', function(){
    //     toggleCurrentItems(getCurrentItems);
    // });
    
    // filterItems[i].addEventListener('mouseleave', function(){
    //     toggleCurrentItems(getCurrentItems);
    // });

    // filterItems[i].addEventListener('mousedown', function(){
    //     toggleCurrentItems(getCurrentItems);
    // });
}

function toggleCurrentItems(getCurrentItems){
    // Loops through the elements with the current category
    // Toggles an active class, for styling purposes

    for (var x = 0; x < getCurrentItems.length; x++){
        getCurrentItems[x].classList.toggle('filter__item--active');
    }
};