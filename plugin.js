// Made by Jackson Lewis. Copyright 2018
const THRESHOLD = 600 // Maximum distortion rating
const ELEMENTS_TO_SELECT_PER_POINT = 0.5
const ELEMENT_AMOUNT_AFFECTER = 0.05;
const DISTORTION_MODIFIER_COUNT = 3;
const MAXIMUM_AMOUNT_OF_CHILDREN_RECURSIVE = 5;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_select_up_to(a,amount) {
    var i = 0;
    var nlist = [];
    while (i != amount && i < a.length) {
        nlist.push(a[getRandomInt(0,a.length-1)]);
        i++;
    }
    return nlist;
}

function get_children_recursive(elem) {
    var total = 0;
    for (var i = 0; i < elem.children.length; i++) {
        total += get_children_recursive(elem.children[i]);
    }
    return total + elem.children.length;
}

function meets_maximum_amount_of_recursive_children(element) {
    return get_children_recursive(element) <= MAXIMUM_AMOUNT_OF_CHILDREN_RECURSIVE;
}

function save_distortion_value(value) {
    window.localStorage.setItem("distortion-points",value);
    window.localStorage.setItem("distortion-activation",(new Date()).getTime());
}

function messup(element) {
    // Make sure it's a base-level element
    if (!meets_maximum_amount_of_recursive_children(element)) return;
    // Choose a random thing to mess it up
    var modifier = getRandomInt(1,DISTORTION_MODIFIER_COUNT);
    switch(modifier) {
        case 1: // Change it's color to pink
            element.style.color = "pink";
            break;
        case 2: // Mess up it's inner html
            element.innerHTML = "Ţ̟̙͍o̪̖͞ ̦͈̪̝i͓n̬͘v̭͚̤̞͉̮̙o̠̬̹̯͕̻k̢̗̰̟e̵̳̩ ͉̪̣t̥̝h͟ẹ̲͚̜̲͟ ̶͖͍͍͈̪̦ḩ̺͉̹i̝̟̞̝̠v̙̣e-̙m̥i̴͖̱͕̻̞͓n̩͖̞̺̫̹̙d̷ ̡̩̺̤͍̫r̖͟e̬̙p̵̳̲͖̞̩̼̞r͚̰̲̼e̤͓s͙̖̯e͏n̰̬̣̰̗͢ͅţ͓͚͓i̶̜͓n̵̥͇g̠̘̤̘̜ ̙c̦̩͖̠̪̼̱h̼̖̟͚̮̟ͅa̧̖o̭̹̹͓̪̤̬s̨̮̹̳̯̥.̵";
            break;
        case 3: // Make it twice as big
            element.height *= 2;
            element.width *= 2;
    }
}

function run(distortion_amount,count) {
    setTimeout( function() {
        if(!(distortion_amount < THRESHOLD)) return;
        distortion_amount += 1;
        save_distortion_value(distortion_amount);
        // mess up <distortion_amount> random elements
        var elements_to_select = Math.round((distortion_amount * ELEMENTS_TO_SELECT_PER_POINT)) + Math.round(count*ELEMENT_AMOUNT_AFFECTER);
        var elements = document.querySelectorAll("*");
        var shuffled_elements = get_select_up_to(elements,elements_to_select);
        console.log(elements_to_select);
        for (var i = 0; i < elements_to_select; i++) {
            messup(shuffled_elements[i]);
        }
        run(distortion_amount,count);
    },1000);
}

console.log("Running Distortion plugin");
// Get total div count
var count = document.querySelectorAll("*").length;

console.log(count);

// reset if it's been 1 hour (in the future, however long we want)

var distortion_date = parseInt(window.localStorage.getItem("distortion-activation"));
if(!distortion_date) {
    distortion_date = 0;
}

if ((new Date()).getTime() - distortion_date >= 3600) {
    // Reset
    save_distortion_value(0);
}

// Get the current distortion value
var distortion_amount = parseInt(window.localStorage.getItem("distortion-points"));

// Start it up

run(distortion_amount,count);
