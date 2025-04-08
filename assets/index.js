document.addEventListener('DOMContentLoaded', () => {
    const goButton = document.querySelector('.go');
    const inputs = document.querySelectorAll('.input');
    const dateInputs = document.querySelectorAll('.date_input');
    const errors = document.querySelectorAll('.error');

    goButton.addEventListener('click', () => {
        let isValid = true;

        // Resetowanie komunikatów o błędach
        errors.forEach(error => error.style.display = 'none');

        // Walidacja pól tekstowych
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.nextElementSibling.nextElementSibling.style.display = 'block'; // Wyświetl błąd
                isValid = false;
            }
        });

        // Walidacja daty urodzenia
        const [day, month, year] = dateInputs;
        const dayValue = parseInt(day.value);
        const monthValue = parseInt(month.value);
        const yearValue = parseInt(year.value);

        if (!dayValue || !monthValue || !yearValue || 
            dayValue < 1 || dayValue > 31 || 
            monthValue < 1 || monthValue > 12 || 
            yearValue < 1900 || yearValue > new Date().getFullYear()) {
            day.parentElement.nextElementSibling.style.display = 'block'; // Wyświetl błąd daty
            isValid = false;
        }

        // Jeśli wszystko jest poprawne, zapisz dane i przekieruj
        if (isValid) {
            const formData = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                sex: document.querySelector('.selector_text').textContent === 'Mężczyzna' ? 'M' : 'K',
                birthday: `${day.value.padStart(2, '0')}.${month.value.padStart(2, '0')}.${year.value}`,
                nationality: document.getElementById('nationality').value,
                familyName: document.getElementById('familyName').value,
                fathersFamilyName: document.getElementById('fathersFamilyName').value,
                mothersFamilyName: document.getElementById('mothersFamilyName').value,
                birthPlace: document.getElementById('birthPlace').value,
                countryOfBirth: document.getElementById('countryOfBirth').value,
                address: `${document.getElementById('adress1').value}, ${document.getElementById('adress2').value}, ${document.getElementById('city').value}`
            };

            // Zapis do localStorage
            localStorage.setItem('userData', JSON.stringify(formData));

            // Przekierowanie na stronę główną
            window.location.href = 'home.html';
        }
    });
});
