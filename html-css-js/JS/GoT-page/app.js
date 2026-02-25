console.log('Loading app.js');

const BASE_URL = "https://thronesapi.com/api/v2";

const listContainer = document.getElementById('list');
const detailImage = document.getElementById('detail-image');
const detailFullName = document.getElementById('detail-fullname');
const detailFamily = document.getElementById('detail-family');
const detailTitle = document.getElementById('detail-title');

let currentActiveItem = 

document.addEventListener('DOMContentLoaded', init);

async function init() {
    console.log('1. init');
    console.log('DOM loaded');
    try {
        const data = await fetchCharacterList();
        renderCharacterList(data);
        if(data.length > 0) {
            fetchCharacterDetails(data[0].id);
            setActiveItem(listContainer.firstChild);
        }

    } catch (err) {
        console.log(err)
    };
}

// Fetch Functions
async function fetchCharacterList() {
    console.log('2. fetchCharacterList');
    //https://thronesapi.com/api/v2/Characters
    const response = await fetch(`${BASE_URL}/Characters`);
    if (!response.ok) {
        throw new Error('Failed to fetch the characters');
    }
    return await response.json();
}

async function fetchCharacterDetails(id) {
    console.log('4. fetchCharacterDetails')
    //https://thronesapi.com/api/v2/Characters/25
    const response = await fetch(`${BASE_URL}/Characters/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch the character details');
    }
    const character = await response.json();
    renderCharacterDetails(character);
}

// Render Functions
function renderCharacterList(characters) {
    console.log('3. renderCharacterList');
    listContainer.innerHTML = "";
    characters.forEach(character => {
        const item = document.createElement('div');
        item.textContent = `${character.firstName} ${character.lastName}`;
        item.classList.add('list-item');

        item.addEventListener('click', ()=> {
            fetchCharacterDetails(character.id);
            setActiveItem(item);
        })

        listContainer.appendChild(item);
    })
}

function renderCharacterDetails(character) {
    console.log('5. renderCharacterDetails');
    const fullname = `${character.firstName} ${character.lastName}`;
    detailImage.src = character.imageUrl;
    detailImage.alt = `Image of ${fullname}`;

    detailFullName.textContent = fullname;
    detailTitle.textContent = character.title;
    detailFamily.textContent = character.family;
}

// Helper Functions
function setActiveItem(item) {
    if(currentActiveItem) {
        currentActiveItem.classList.remove('active');
    }
    currentActiveItem = item;
    currentActiveItem.classList.add('active');
}