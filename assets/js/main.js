/* variable declaration */


const addBtn = $('#addBtn');
const formSection = $('#formSection');
const mainSection = $('#mainSection');
const cancelBtn = $('#cancelBtn');


/* function */
function $ (selector) {
    return document.querySelector(selector);
}

addBtn.addEventListener('click', () => {
    formSection.classList.toggle('hidden');
    mainSection.classList.toggle('hidden');
})

cancelBtn.addEventListener('click', () => {
    formSection.classList.toggle('hidden');
    mainSection.classList.toggle('hidden');
})