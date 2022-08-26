/* DOM */
const increasingFont = document.querySelectorAll('div p');
const fontButton = document.getElementById("increasingButton");

/* Variables */
let swtichFont = false;

const increasingFontFunction = () => {
    /* switchFont == false */
    if(!swtichFont) {
        for (let box of increasingFont) {
            box.classList.add('increasing-font');
        }
        swtichFont = true;
    } else {
        for (let box of increasingFont) {
            box.classList.remove('increasing-font');
        }
        swtichFont = false;
    }

};

 /* Events */
fontButton.addEventListener('click', () => {
    increasingFontFunction()
});

 