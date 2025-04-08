let upload;
let imageInput;
let idOwnImage;

document.addEventListener('DOMContentLoaded', () => {
    upload = document.querySelector('.upload');
    idOwnImage = document.querySelector('.id_own_image');
    imageInput = document.createElement('input');
    
    imageInput.type = 'file';
    imageInput.accept = 'image/.jpeg,image/.png,image/.gif';
    imageInput.style.display = 'none';
    document.body.appendChild(imageInput);

    upload.addEventListener('click', () => {
        imageInput.value = '';
        imageInput.click();
        upload.classList.remove('error_shown');
    });

    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        upload.classList.add('upload_loading');
        
        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem('uploadedImage', e.target.result);
            upload.querySelector('.upload_uploaded').src = e.target.result;
            upload.classList.remove('upload_loading');
            upload.classList.add('upload_loaded');
        };
        reader.onerror = () => {
            upload.classList.remove('upload_loading');
            showError('Błąd podczas odczytu pliku');
        };
        reader.readAsDataURL(file);
    });
});

var selector = document.querySelector(".selector_box");
selector.addEventListener('click', () => {
    selector.classList.toggle("selector_open");
});

document.querySelectorAll(".date_input").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".date").classList.remove("error_shown");
    });
});

var sex = "m";
document.querySelectorAll(".selector_option").forEach((option) => {
    option.addEventListener('click', () => {
        sex = option.id;
        document.querySelector(".selected_text").innerHTML = option.innerHTML;
    });
});

document.querySelectorAll(".input_holder").forEach((element) => {
    const input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    });
});

document.querySelector(".go").addEventListener('click', processForm);

function processForm() {
    var empty = [];
    var params = new URLSearchParams();

    var birthday = "";
    var dateEmpty = false;
    document.querySelectorAll(".date_input").forEach((element) => {
        birthday = birthday + "." + element.value;
        if (isEmpty(element.value)) {
            dateEmpty = true;
        }
    });

    birthday = birthday.substring(1);

    if (dateEmpty) {
        var dateElement = document.querySelector(".date");
        dateElement.classList.add("error_shown");
        empty.push(dateElement);
    } else {
        params.set("birthday", birthday);
        params.set("sex", sex);
    }

    document.querySelectorAll(".input_holder").forEach((element) => {
        var input = element.querySelector(".input");
        if (isEmpty(input.value)) {
            empty.push(element);
            element.classList.add("error_shown");
        } else {
            params.set(input.id, input.value);
            localStorage.setItem(`input_${input.id}`, input.value);
        }
    });

    if (empty.length === 0) {
        forwardToId(params);
    } else {
        empty[0].scrollIntoView({ behavior: 'smooth' });
    }
}

function forwardToId(params) {
    const formData = {
        params: params.toString(),
        image: localStorage.getItem('uploadedImage') || ''
    };
    localStorage.setItem('formData', JSON.stringify(formData));
    window.location.href = '/id?' + params.toString();
}

function isEmpty(value) {
    return /^\s*$/.test(value);
}

var guide = document.querySelector(".guide_holder");
guide.addEventListener('click', () => {
    guide.classList.toggle("unfolded");
});
