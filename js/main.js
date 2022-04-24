// Year footer ******************************* 
let d = new Date();
let currentYear = d.getFullYear();
window.onload = document.querySelector('.currentyear').innerHTML = '&COPY;' + '&nbsp;' + currentYear + '&nbsp;';

// Theme switch ******************************* 
let toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
toggleSwitch.addEventListener('change', themeSwitched, false);


function themeSwitched(e) {
    if (e.target.checked) setColorTheme('dark');
    else setColorTheme('light');
}


function setColorTheme(theme) {
    if (!theme) theme = localStorage.getItem('theme');
    
    switch (theme) {
        case 'dark':
            document.body.classList.remove('light');
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            toggleSwitch.checked = true;
            break;
        case 'light':
        default:
            document.body.classList.remove('dark');
            document.body.classList.add('light');
            localStorage.setItem('theme', 'light');
            toggleSwitch.checked = false;
            break;
    }
}


window.onload = function() {
    setColorTheme();
}
// Menu toggle ******************************* 
const sidebarMenu = document.querySelector('#box'),
    sidebarButtons = document.querySelector('#btn-m'),
    mCircle = document.querySelector('#m-circle');


mCircle.addEventListener('click', function (event) {
    if (sidebarMenu.classList.contains('m-active')) {
        sidebarButtons.classList.remove('m-active');
        sidebarMenu.classList.remove('m-active');
        mCircle.classList.remove('m-active');
    } else {
        sidebarButtons.classList.add('m-active');
        sidebarMenu.classList.add('m-active');
        mCircle.classList.add('m-active');
    }
});
// index page **********************************

// index animation *******************************
function indexAnim() {

    let bg = document.querySelector('.landing');
    let load = 0;
    let int = setInterval(animation, 5, true);
    
    function animation() {
    const scale = (num, in_min, in_max, out_min, out_max) => {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    };
    load++;
    if (load > 99) {
        clearInterval(int);
    };
    bg.style.borderBottom = 
        `${scale(load, 0, 100, 0, 1)}` + 'rem solid rgb(var(--clr-headings))';
    bg.style.backgroundImage = 'repeating-linear-gradient(' +
        `${scale(load, 0, 100, 180, 135)}deg` +
        ', rgb(var(--clr-headings)), rgb(var(--clr-headings)) calc(' +
        `${scale(load, 0, 100, 0, 25)}%` +
        ' + 1px), rgb(var(--clr-main)) calc(' +
        `${scale(load, 0, 100, 0, 25)}%` +
        ' + 1px), rgb(var(--clr-main)) 49.9%)';
    }
    

};