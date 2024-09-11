const openButtons = document.querySelectorAll('.open-form-btn');
const formContainer = document.getElementById('form-container');
const closeFormButton = document.getElementById('close-form');
const form = document.getElementById('myForm');
const inputField = document.getElementById('lesson');
let redirectURL = '';

function closeForm() {
	formContainer.style.display = 'none';
}

openButtons.forEach((button) => {
	button.addEventListener('click', function () {
		const buttonText = this.textContent;
		inputField.value = buttonText;
		document.getElementById('form-container').style.display = 'block';
		redirectURL = this.getAttribute('data-href');
	});
});

closeFormButton.addEventListener('click', closeForm);

form.addEventListener('submit', function (event) {
	event.preventDefault();

	const name = document.getElementById('name').value.trim();
	const phone = document.getElementById('phone').value.trim();
	const lesson = document.getElementById('lesson').value.trim();

	if (name === '' || phone === '' || lesson === '') {
		errorMessage.style.display = 'block';
	} else {
		errorMessage.style.display = 'none';
		const formData = new FormData(form);
		const xhr = new XMLHttpRequest();
		const formURL =
			'https://docs.google.com/forms/d/e/1FAIpQLSfI60m1-IBEdWR4uWLn8tIuG0uhlVJx_cs-V0Tu3G4xr1h8yQ/formResponse';
		xhr.open('POST', formURL, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(new URLSearchParams(formData).toString());
		closeForm();
		window.location.href = redirectURL;
	}
});
