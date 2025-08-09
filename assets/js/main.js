/* variable declaration */
function $ (selector) {
    return document.querySelector(selector);
}

const addBtn = $('#addBtn');
const formSection = $('#formSection');
const mainSection = $('#mainSection');

function $ (selector) {
    return document.querySelector(selector);
}

addBtn.addEventListener('click', () => {
    formSection.classList.toggle('hidden');
})