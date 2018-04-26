var dragged;

var verify_dropELement = false;

var dnd_alert = document.getElementById('alert-area');

function dragStart(event) {
    // TODO: trap focus in #maindrag when draggin operation start
    if (event.type == 'dragstart' || (event.type == 'keypress' && event.keyCode == '13')) {

        // Activate anchors in the beggining and end of #maindrag
        var anchors = document.getElementsByClassName('indicator-anchor');
        for (var i = 0; i < anchors.length; i++) {
            anchors[i].removeAttribute('style');
        }

        // Anounces that the element was dragged
        // NOTE: is is better to say "the element was dragged or captured"?
        var msg = document.createTextNode("The element is being dragged");
        dnd_alert.appendChild(msg);

        // Remove tabindex of dragged element
        dragged = event.target;
        dragged.removeAttribute('tabindex');
        var parent = dragged.parentNode;

        // Modify aria-grabbed atributte as true in the element
        event.target.setAttribute("aria-grabbed", true);

        // Add drop effect and tabindex in dropzones
        var dropzones = document.getElementsByClassName('dropzone');
        for (var i = 0; i < dropzones.length; i++) {
            dropzones[i].setAttribute("aria-dropeffect", "move");
            dropzones[i].setAttribute('tabindex', '0');
        }
    }
}

function dragEnd(event) {
    // modifica o atributo aria-grabbed para false
    if (event.type == 'dragend' || (event.type == 'keypress' && event.keyCode == '13' && verify_dropELement)) {
        if (verify_dropELement) {

            var anchors = document.getElementsByClassName('indicator-anchor');
            for (var i = 0; i < anchors.length; i++) {
                anchors[i].setAttribute('style', 'display:none;')
            }

            var msg = document.createTextNode("O elemento foi largado");
            dnd_alert.appendChild(msg);
            event.target.setAttribute("aria-grabbed", false);
            var dropzones = document.getElementsByClassName('dropzone');
            for (var i = 0; i < dropzones.length; i++) {
                dropzones[i].removeAttribute("aria-dropeffect");
                dropzones[i].removeAttribute('tabindex');
                dropzones[i].className = "dropzone"
            }
        }
        verify_dropELement = false;
    }
}

function dragOver(event) {
    // previne o comportamento padrão para permitir que o elemento arrastado seja soltado dentro
    event.preventDefault();
}

function dragEnter(event) {
    var el = event.target;
    if (el.className == "dropzone" || el.className == "dropzone drophover") {
        // adiciona o atributo aria-dropeffect como move, indicando que o efeito realizado ao arrastar e soltar um elemento é movê-lo
        el.className = "dropzone drophover";
    }
}



function dragLeave(event) {
    var el = event.target;
    if (el.className == "dropzone" || el.className == "dropzone drophover") {
        // remove o atributo quando o elemento arrastado não está mais sobre este alvo
        el.className = "dropzone";
    }
}



function dropElement(event) {
    if (event.type == 'drop' || (event.type == 'keypress' && event.keyCode == '13' && !verify_dropELement)) {
        // previne a ação padrão (abre como link para alguns elementos)
        event.preventDefault();
        var el = event.target;
        // move o elemento arrastado para o alvo
        dragged.setAttribute('tabindex', 0);
        if (el.className == "dropzone" || el.className == "dropzone drophover") {
            el.appendChild(dragged);
        }
        verify_dropELement = true;
    }
}

var main = document.getElementById('maindrag');

var draggable = document.getElementById('draggable');

var dropzones = document.getElementsByClassName('dropzone');


draggable.addEventListener('keypress', dragStart, false);
main.addEventListener("dragstart", dragStart, false);

main.addEventListener("dragend", dragEnd, false);

main.addEventListener("dragover", dragOver, false);

main.addEventListener("dragenter", dragEnter, false);

main.addEventListener("dragleave", dragLeave, false);

main.addEventListener("drop", dropElement, false);

for (var i = 0; i < dropzones.length; i++) {
    dropzones[i].addEventListener('focus', dragEnter, false);
    dropzones[i].addEventListener('blur', dragLeave, false);
    dropzones[i].addEventListener('keypress', dropElement, true);
    dropzones[i].addEventListener('keypress', dragEnd, true);
}
