function validateForm() {
    const name = document.getElementById('name');
    const artist = document.getElementById('artist');
    const picture = document.getElementById('picture');
    const url = document.getElementById('url');

    const fields = [name, artist, picture, url];

    let isValid = true;

    fields.forEach(field => {
        if (field.value.trim() === '') {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });

    if (!isValid) {
        alert('Por favor, preencha todos os campos.');
    }

    return isValid;
}