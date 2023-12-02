//Imports
require('cypress-plugin-tab');
var fs = require('fs');
var faker = require('faker');

const url = Cypress.config('baseUrl') || "https://uniandes.edu.co/";
const appName = Cypress.env('appName')|| "your app";
const events = Cypress.env('events')|| 100;
const delay = Cypress.env('delay') || 100;
var seed = Cypress.env('seed');

const num_categories = 7;

const pct_clicks = Cypress.env('pctClicks') || 12;
const pct_scrolls = Cypress.env('pctScroll') || 12;
const pct_selectors = Cypress.env('pctSelectors') || 12;
const pct_keys = Cypress.env('pctKeys') || 12;
const pct_spkeys = Cypress.env('pctSpKeys') || 12;
const pct_pgnav = Cypress.env('pctPgNav') || 12; 
const pct_browserChaos = Cypress.env('pctBwChaos') || 12;
const pct_actions = Cypress.env('pctActions') || 16;

const LOG_FILENAME = "../../../results/smart-monkey-execution.html";

/*
 Bob Jenkins Small Fast, aka smallprng pseudo random number generator is the chosen selection for introducing seeding in the tester
 Credits of the implementation to bryc's answer in this stackoverflow post: https://stackoverflow.com/a/47593316 
*/
function jsf32(a, b, c, d) {
    return function() {
        a |= 0; b |= 0; c |= 0; d |= 0;
        var t = a - (b << 27 | b >>> 5) | 0;
        a = b ^ (c << 17 | c >>> 15);
        b = c + d | 0;
        c = d + t | 0;
        d = a + t | 0;
        return (d >>> 0) / 4294967296;
    }
}

var random = jsf32(0xF1AE533D, seed, seed, seed);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(random() * (max - min)) + min;
}

function fullPath(el){
    var names = [];
    while (el.parentNode){
      if (el.id){
        names.unshift('#'+el.id);
        break;
      }else{
        if (el==el.ownerDocument.documentElement) names.unshift(el.tagName);
        else{
          for (var c=1,e=el;e.previousElementSibling;e=e.previousElementSibling,c++);
          names.unshift(el.tagName+":nth-child("+c+")");
        }
        el=el.parentNode;
      }
    }
    return names.join(" > ");
}

function logCommand(index, funtype, info){
    let html = `<h2>(${index}.) ${funtype} event</h2>`
    if(!!info) html+=`<p><strong>Details: </strong> ${info}</p>`
    fs.appendFile(LOG_FILENAME, html, (err) => {
        if (err) throw err;
        console.log(`Logged #${index}`);
    });
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Start of smart monkey
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var viewportHeight = Cypress.config("viewportHeight")
var viewportWidth = Cypress.config("viewportWidth")
var curX = 0
var curY = 0
var curPageMaxX = viewportWidth
var curPageMaxY = viewportHeight
var evtIndex = 1
var focused = false

function randClick(){
    
    let randX = getRandomInt(curX, viewportWidth)
    let randY = getRandomInt(curY, viewportHeight)
    
    cy.window().then((win)=>{
        let info = "";
        let element = win.document.elementFromPoint(randX, randY);
        if(element){
            if(element.tagName.toLowerCase() === 'canvas'){
                cy.get(`canvas#${element.id}`).scrollIntoView()
                    .click({ force: true });
                info = `Forced click on canvas with id: ${element.id}`;
            } else if(element.id){
                cy.get(`#${element.id}`).click();
                info = `${element.tagName} with id: ${element.id}`;
            } else{
                let jsPath = fullPath(element);
                cy.get(jsPath).click({force: true});
                info = `DOM element with path: ${jsPath}`;
            }
        } else{
            cy.get('body').click(randX, randY, {force: true});
            info = `Position: (${randX}, ${randY}). INVALID, no selectable element`;
        }
        cy.task("logCommand", { funtype: "Random click", info: info});
        focused = !!win.document.activeElement;
    });
}

function randDClick(){
    let randX = getRandomInt(curX, viewportWidth)
    let randY = getRandomInt(curY, viewportHeight)
    
    cy.window().then((win)=>{
        let info = ""
        console.log(win.document)
        let element = win.document.elementFromPoint(randX, randY)
        console.log(element)
        if(!!element){
            // Check if the element is a canvas and if so, force the double click
            if(element.tagName.toLowerCase() === 'canvas'){
                cy.get(`#${element.id}`).scrollIntoView()
                    .dblclick({ force: true });
                info = `Forced double click on canvas with id: ${element.id}`;
            }
            else if(!!element.id){ //boolean that indicates if the element has a non-empty id
                cy.get(`#${element.id}`).dblclick()
                info = `${element.tagName} with id: ${element.id}`
            }
            else{
                let jsPath = fullPath(element)
                cy.get(jsPath).then($candidates => {
                    //dblclick the first visible candidate
                    for(let i = 0; i < $candidates.length; i++){
                        let candidate = $candidates.get(i)
                        if(!Cypress.dom.isHidden(candidate)){
                            cy.wrap(candidate).dblclick({force:true})
                            break
                        }
                    }
                })
                info = `DOM element with path: ${jsPath}`
            }
        }
        else{
            cy.get('body').dblclick(randX, randY, {force:true})
            info = `Position: (${randX}, ${randY}). INVALID, no selectable element`
        }
        cy.task("logCommand", { funtype: "Random double click", info: info})
        focused = !!win.document.activeElement
    })
}

function randRClick(){
    
    let randX = getRandomInt(curX, viewportWidth)
    let randY = getRandomInt(curY, viewportHeight)
    
    cy.window().then((win)=>{
        let info = "";
        let element = win.document.elementFromPoint(randX, randY);
        if(element){
            if(element.tagName.toLowerCase() === 'canvas'){
                cy.get(`canvas#${element.id}`).scrollIntoView()
                    .rightclick({ force: true });
                info = `Forced right click on canvas with id: ${element.id}`;
            } else if(element.id){
                cy.get(`#${element.id}`).rightclick();
                info = `${element.tagName} with id: ${element.id}`;
            } else{
                let jsPath = fullPath(element);
                cy.get(jsPath).rightclick({force: true});
                info = `DOM element with path: ${jsPath}`;
            }
        } else{
            cy.get('body').rightclick(randX, randY, {force: true});
            info = `Position: (${randX}, ${randY}). INVALID, no selectable element`;
        }        
        cy.task("logCommand", { funtype: "Random right click", info: info});
        focused = !!win.document.activeElement;
    });
}

function randHover(){
    
    let randX = getRandomInt(curX, viewportWidth)
    let randY = getRandomInt(curY, viewportHeight)

    cy.window().then((win)=>{
        let info = ""
        let element = win.document.elementFromPoint(randX, randY)
        if(!!element){
            if(element.hasAttribute('onmouseover')){
                //Use cypress selector if any fits
                if(!!element.id){ //boolean that indicates if the element has a non-empty id
                    cy.get(`#${element.id}`).trigger('mouseover')
                    info = `${element.tagName} with id: ${element.id}`
                }
                /*else if(!!element.className){ //boolean that indicates if the element has a non-empty className
                    cy.get(`.${element.className}`).then($candidates => {
                        //rightclick the first visible candidate
                        for(let i = 0 i < $candidates.length i++){
                            let candidate = $candidates.get(i)
                            if(!Cypress.dom.isHidden(candidate)){
                                cy.wrap(candidate).trigger('mouseover')
                                break
                            }
                        }
                    })
                }*/
                else{
                    let jsPath = fullPath(element)
                    cy.get(fullPath(element)).then($candidates => {
                        //hover the first visible candidate
                        for(let i = 0; i < $candidates.length; i++){
                            let candidate = $candidates.get(i)
                            if(!Cypress.dom.isHidden(candidate)){
                                cy.wrap(candidate).trigger('mouseover')
                                break
                            }
                        }
                    })
                    info = `DOM element with path: ${jsPath}`
                }
            }
            else info = `Position: (${randX}, ${randY}). INVALID, element has no attribute onmouseover`
        }
        else info = `Position: (${randX}, ${randY}). INVALID, no selectable element`
        cy.task("logCommand", { funtype: "Selector focus (hover)", info: info})
        focused = !!win.document.activeElement
    })
}

function avPag(){
    let info = "";
    // Ensure that the body is scrollable before attempting to scroll
    cy.document().then((doc) => {
        let maxScrollY = doc.body.scrollHeight - doc.documentElement.clientHeight;
        if(maxScrollY > 0 && curY < maxScrollY){
            let newY = Math.min(curY + viewportHeight, maxScrollY);
            cy.scrollTo(curX, newY);
            info += `Successfully scrolled down from y=${curY} to y=${newY}`;
            curY = newY; // Update the current Y position
        } else {
            info = "INVALID. Not able to scroll down anymore or the document is not scrollable.";
        }
        cy.task("logCommand", { funtype: "Scroll event (pg down)", info: info});
    });
}

function rePag(){
    let info = "";
    // Ensure that there is space to scroll up before attempting to scroll
    if(curY > 0){
        let newY = Math.max(curY - viewportHeight, 0);
        cy.scrollTo(curX, newY);
        info += `Successfully scrolled up from y=${curY} to y=${newY}`;
        curY = newY; // Update the current Y position
    } else {
        info = "INVALID. Not able to scroll up anymore.";
    }
    cy.task("logCommand", { funtype: "Scroll event (pg up)", info: info});
}

function horizontalScrollFw(){
    let info = "";
    cy.document().then((doc) => {
        let maxScrollX = doc.body.scrollWidth - doc.documentElement.clientWidth;
        if(maxScrollX > 0 && curX < maxScrollX){
            let newX = Math.min(curX + viewportWidth, maxScrollX);
            cy.scrollTo(newX, curY);
            info += `Successfully scrolled to the right from x=${curX} to x=${newX}`;
            curX = newX; // Update the current X position
        } else {
            info = "INVALID. Not able to scroll to the right anymore or the document is not horizontally scrollable.";
        }
        cy.task("logCommand", { funtype: "Scroll event (horizontal fw)", info: info});
    });
}

function horizontalScrollBk(){
    let info = "";
    // Ensure that there is space to scroll left before attempting to scroll
    if(curX > 0){
        let newX = Math.max(curX - viewportWidth, 0);
        cy.scrollTo(newX, curY);
        info += `Successfully scrolled to the left from x=${curX} to x=${newX}`;
        curX = newX; // Update the current X position
    } else {
        info = "INVALID. Not able to scroll to the left anymore.";
    }
    cy.task("logCommand", { funtype: "Scroll event (horizontal bk)", info: info});
}

function reload(){
    cy.reload()
    focused = false
    cy.task("logCommand", { funtype: "Page navigation (Reload)", info: "Successfully reloaded the page"})
}

function enter(){
    let info = ""
    if(focused){
        cy.focused().type("{enter}")
        info = "Pressed enter on the element in focus"
    }
    else{
        cy.get('body').type("{enter}")
        info = "INVALID. No element is in focus"
    }
    cy.task("logCommand", { funtype: "Special key press (enter)", info: info})
}

function typeCharKey(){
    let info = ""
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let type = chars.charAt(getRandomInt(0, chars.length-1))
    if(focused){
        cy.focused().type(type)
        info = `Pressed the ${type} key on the element in focus`
    }
    else{
        cy.get('body').type(type)
        info = "INVALID. No element is in focus"
    }
    cy.task("logCommand", { funtype: "Key press", info: info})
}

function spkeypress(){
    let info = ""
    const specialKeys = ["{{}","{backspace}", "{del}","{downarrow}", "{end}", "{esc}","{home}",  "{leftarrow}", "{pagedown}", "{pageup}", "{rightarrow}", "{selectall}", "{uparrow}"]
    const modifiers = ["{alt}", "{ctrl}", "{meta}", "{shift}", ""]
    let modIndex = getRandomInt(0, modifiers.length-1)
    let spkIndex = getRandomInt(0, specialKeys.length-1)
    let type = modifiers[modIndex] + specialKeys[spkIndex]
    if(focused){
        cy.focused().type(type)
        info = `Pressed the ${type} combination of special keys on the element in focus`
    }
    else{
        cy.get('body').type(type)
        info = `No element is in focus. Pressed the ${type} combination of special keys on the page body`
    }
    cy.task("logCommand", { funtype: "Special key press", info: info})
}

function changeViewport(){
    const viewports = ["ipad-2", "ipad-mini", "iphone-3", "iphone-4", "iphone-5", "iphone-6", "iphone-6+", "iphone-x", "iphone-xr", "macbook-11", "macbook-13", "macbook-15", "samsung-note9", "samsung-s10"];
    let index = getRandomInt(0, viewports.length-1);
    const orientations = ["portrait", "landscape"];
    let oindex = getRandomInt(0, orientations.length-1);
    cy.viewport(viewports[index], orientations[oindex]).then(() => {
        viewportHeight = Cypress.config("viewportHeight");
        viewportWidth = Cypress.config("viewportWidth");
        // Update the current maximum scrollable dimensions
        cy.document().then((doc) => {
            curPageMaxY = doc.body.scrollHeight - viewportHeight;
            curPageMaxX = doc.body.scrollWidth - viewportWidth;
        });
    });
    cy.task("logCommand", { funtype: "Viewport change", info: `Changed the viewport to ${viewports[index]} with ${orientations[oindex]} orientation`});
}

function navBack(){
    cy.url().then((path)=>{
        let info = ""
        if(url!==path){
            cy.go(-1)
            info = "Navigated 1 page back"
        }
        else info = "INVALID. Navigation stack empty"
        cy.task("logCommand", { funtype: "Page navigation (back)", info: info})
    })
}

function navForward(){
    cy.go(1)
    cy.task("logCommand", { funtype: "Page navigation (forward)", info: "Attempted to navigate 1 page forward"})
}

function tab(){
    let info = ""
    if(focused){
        cy.focused().tab().focus()
        info = "Tabbed to the next element after the one in focus"
    }
    else{
        cy.get('body').tab().focus()
        info = "Tabbed into the first focusable element of the document"
    }
    focused = true
    cy.task("logCommand", { funtype: "Selector focus (tab)", info: info})
}


function clickRandAnchor(){
    cy.window().then((win)=>{
        let $links = win.document.getElementsByTagName("a");
        let info = ""
        if($links.length > 0){
            let randomLink = $links.item(getRandomInt(0, $links.length));
            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                info = `Clicked link to: ${randomLink.href}`
            } else info = `Link to ${randomLink.href} is hidden`
        } else info = "INVALID. There are no anchor elements in the current page"
        cy.task("logCommand", {funtype: "Action: click anchor", info: info})
    })
}

function clickRandButton(){
    cy.window().then((win)=>{
        let $buttons = win.document.getElementsByTagName("button");
        let info = ""
        if($buttons.length > 0){
            let randomButton = $buttons.item(getRandomInt(0, $buttons.length));
            if(!Cypress.dom.isHidden(randomButton)) {
                cy.wrap(randomButton).click({force: true});
                info = `Clicked button ${randomButton.textContent} with jsPath ${fullPath(randomButton)}`
            } else info = `Button ${randomButton.textContent} is hidden`
        } else info = "INVALID. There are no buttons in the current page" 
        cy.task("logCommand", {funtype: "Action: click button", info: info})
    })
}

function fillInput(){ //Or fill form
    cy.window().then((win)=>{
        let $inputs = win.document.getElementsByTagName("input");
        let info = ""
        if($inputs.length > 0){
            var inp = $inputs.item(getRandomInt(0, $inputs.length));
            if(!Cypress.dom.isHidden(inp)) {
                focused = true;
                if(inp.getAttribute("type") == "email"){
                    let email = faker.internet.email(); // Invoca la función
                    cy.wrap(inp).type(email, { force: true });
                    info = `Input ${inp.id} was filled with ${email}`
                }
                else if(inp.getAttribute("type") == "button" || inp.getAttribute("type") == "submit" || inp.getAttribute("type") == "radio" || inp.getAttribute("type") == "checkbox"){
                    cy.wrap(inp).click();
                    info = `Input ${inp.id} of type ${inp.getAttribute("type")} was clicked`
                }
                else if(inp.getAttribute("type") == "date"){
                    let date = faker.date.future().toISOString().split('T')[0]; // Genera una fecha futura y la formatea como YYYY-MM-DD
                    cy.wrap(inp).type(date, { force: true });
                    info = `Input ${inp.id} was filled with ${date}`
                }
                else if(inp.getAttribute("type") == "tel"){
                    let phoneNumber = faker.phone.phoneNumber(); // Invoca la función
                    cy.wrap(inp).type(phoneNumber, { force: true });
                    info = `Input ${inp.id} was filled with ${phoneNumber}`
                }
                else if(inp.getAttribute("type") == "url"){
                    let url = faker.internet.url(); // Invoca la función
                    cy.wrap(inp).type(url);
                    info = `Input ${inp.id} was filled with ${url}`
                }
                else if(inp.getAttribute("type") == "number"){
                    let number = faker.random.number().toString(); // Invoca la función y convierte el número a cadena
                    cy.wrap(inp).type(number, { force: true });
                    info = `Input ${inp.id} was filled with ${number}`
                }
                else if(inp.getAttribute("type") == "text" || inp.getAttribute("type") == "password"){
                    let text = faker.random.alphaNumeric(10); // Invoca la función con un argumento para longitud de cadena
                    cy.wrap(inp).type(text, { force: true });
                    info = `Input ${inp.id} was filled with ${text}`
                }
                else {
                    focused = false;
                    info = `Input ${inp.id} is of type ${inp.getAttribute("type")}`
                }
            }
            else info = `Input ${inp.id} is hidden`
        }
        else info = "INVALID. There are no input elements in the current page"        
        console.log(info)
        cy.task("logCommand", {funtype: "Action: click anchor", info: info})
    })
}

function clearInput(){
    cy.window().then((win)=>{
        let info = ""
        let inputs = win.document.getElementsByTagName("input")
        if(inputs.length > 0){
             var inp = inputs.item(getRandomInt(0, inputs.length));
            if(!Cypress.dom.isHidden(inp)) {
                // Use the {force: true} option to bypass the error
                cy.wrap(inp).clear({force: true});
                focused = true;
                info = `Cleared input ${inp.id}`
            }
            else info = `Input ${inp.id} is hidden`
        }
        else info = "INVALID. There are no input elements in the current page"
        cy.task("logCommand", {funtype: "Action: click anchor", info: info})
    })
}
function clearLocalStorage(){
    cy.clearLocalStorage();
    cy.task("logCommand", {funtype: "Chaos: Clear local storage", info: "Local storage is clear"})
}
function clearCookies(){
    cy.clearCookies();
    cy.task("logCommand", {funtype: "Chaos: Clear cookies", info: "Cookies are clear"})
}

//var screenshotIndex = 0;

function randomEvent(){
    let typeIndex = getRandomInt(0, pending_events.length);
    if(pending_events[typeIndex] > 0){
        //screenshotIndex += 1;
        //cy.screenshot('smart/'+screenshotIndex+"-"+ getEvtType(typeIndex)+"-before");
        let fIndex = getRandomInt(0, functions[typeIndex].length-1);
        functions[typeIndex][fIndex]();
        pending_events[typeIndex] --;
        cy.wait(delay);
        //cy.screenshot('smart/'+screenshotIndex+"-"+ getEvtType(typeIndex)+"-after");
    }
    else{
        functions.splice(typeIndex, 1);
        pending_events.splice(typeIndex, 1);
    }
}

function getEvtType(i){
    if(i===0) return "Random click"
    else if (i===1) return "Scroll event"
    else if (i===2) return "Selector focus"
    else if (i===3) return "Keypress"
    else if (i===4) return "Special Keypress"
    else if (i===5) return "Page Navigation"
    else if (i===6) return "Browser Chaos"
    else if (i===7) return "Action/Click"
}

var pending_events = [,,,,,,,]; 

//Aggregate in a matrix-like constant
const functions = [
    [randClick, randDClick, randRClick], 
    [horizontalScrollBk, horizontalScrollFw, avPag, rePag], 
    [randHover, tab], 
    [typeCharKey], 
    [spkeypress, enter], 
    [reload, navBack, navForward],
    [changeViewport],
    [fillInput, clearInput, clickRandAnchor, clickRandButton]
];

describe( `${appName} under smarter monkeys`, function() {
    //Listeners
    cy.on('uncaught:exception', (err)=>{
        cy.task('genericLog', {'message':`An exception occurred: ${err}`})
        cy.task('genericReport', {'html': `<p><strong>Uncaught exception: </strong>${err}</p>`});
    });
    cy.on('window:alert', (text)=>{
        cy.task('genericLog', {'message':`An alert was fired with the message: "${text}"`})
        cy.task('genericReport', {'html': `<p><strong>An alert was fired with the message: </strong>${text}</p>`});
    });
    cy.on('fail', (err)=>{
        cy.task('genericLog', {'message':`The test failed with the following error: ${err}`});
        cy.task('genericReport', {'html': `<p><strong>Test failed with the error: </strong>${err}</p>`});
        return false;
    });
    it(`visits ${appName} and survives smarter monkeys`, function() {
        if(!seed) seed = getRandomInt(0, Number.MAX_SAFE_INTEGER);
        
        cy.task('logStart', {"type":"monkey", "url":url, "seed":seed})
        cy.log(`Seed: ${seed}`)
        cy.task('genericLog', {"message":`Seed: ${seed}`})
    
        // Inicio de sesión
        cy.visit(url)
        cy.get('input#identification.gh-input.email').type('thais.tamaio@hotmail.com')
        cy.get('input#password.gh-input.password').type('monicaramirez1966')
        cy.get('span[data-test-task-button-state="idle"]').click()
        cy.wait(1000) // Esperar a que la sesión inicie
    
        let pcg = pct_clicks+pct_scrolls+pct_keys+pct_pgnav+pct_selectors+pct_spkeys+pct_actions+pct_browserChaos;
        if(pcg === 100){
    
            pending_events[0] = events*pct_clicks/100;
            pending_events[1] = events*pct_scrolls/100;
            pending_events[2] = events*pct_selectors/100;
            pending_events[3] = events*pct_keys/100;
            pending_events[4] = events*pct_spkeys/100;
            pending_events[5] = events*pct_pgnav/100;
            pending_events[6] = events*pct_browserChaos/100;
            pending_events[7] = events*pct_actions/100;
            
            // Visita la URL después de iniciar sesión
            cy.visit(url).then((win)=>{   
                let d = win.document
                curPageMaxY = Math.max( d.body.scrollHeight, d.body.offsetHeight, d.documentElement.clientHeight, d.documentElement.scrollHeight, d.documentElement.offsetHeight) - win.innerHeight
                curPageMaxX = Math.max( d.body.scrollWidth, d.body.offsetWidth, d.documentElement.clientWidth, d.documentElement.scrollWidth, d.documentElement.offsetWidth) - win.innerWidth
            })
    
            //Add an event for each type of event in order to enter the else statement of randomEvent method
            for(let i = 0; i < events + 7; i++){
                evtIndex++
                randomEvent()
            }
        }
        else cy.task('logPctNo100')
        
    })
    
    afterEach(()=>{
        cy.task('logEnd')
    })
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//End of smart monkey
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------