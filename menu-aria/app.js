function changeState(e){
    if (e.type == 'click' || (e.type == 'keydown' && e.keyCode == '13')) {
        var obj = e.target;
        if (obj) {
            var checked = obj.getAttribute('aria-checked')
            if (checked == 'true') {
                obj.setAttribute('aria-checked', 'false');
            }
            else {
                obj.setAttribute('aria-checked', 'true');
            }
        }
    }
}

var elements = document.getElementsByClassName("checkbox-item");

for (var i = 0; i < elementos.length; i++) {
    elements[i].addEventListener('click', changeState);
    elements[i].addEventListener('keydown', changeState);
}

var group = document.getElementById('radiogroup');
function changeStateRadio(e) {
    if (e.type == 'click' || (e.type == 'keydown' && e.keyCode == '13')) {
        var group = document.getElementById('radiogroup');
        for (var i = 0; i < group.children.length; i++) {
            var checked = group.children[i].getAttribute('aria-checked')
            if (checked == 'true') {
                group.children[i].setAttribute('aria-checked', 'false');
            }
        }

        var obj = e.target;

        if (obj) {
            var checked = obj.getAttribute('aria-checked')
            if (checked == 'true') {
                obj.setAttribute('aria-checked', 'false');
            }
            else {
                obj.setAttribute('aria-checked', 'true');
            }
        }

    }
}

var elements = document.getElementsByClassName("radio-item");
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', changeStateRadio);
    elements[i].addEventListener('keydown', changeStateRadio);
}
