document.querySelectorAll('form[name]').forEach((form) => {
	form.addEventListener('submit', async (event) => {
		event.preventDefault();

		const successMessage = form.querySelector('[id="submitSuccessMessage"]');
		const errorMessage = form.querySelector('[id="submitErrorMessage"]');
		const submitButton = form.querySelector('button[type="submit"]');
		const formData = new FormData(form);

		formData.set('form-name', form.getAttribute('name'));
		submitButton.disabled = true;

		try {
			await fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams(formData).toString(),
			});

			successMessage.classList.remove('d-none');
			errorMessage.classList.add('d-none');
			form.reset();
		} catch (error) {
			successMessage.classList.add('d-none');
			errorMessage.classList.remove('d-none');
		} finally {
			submitButton.disabled = false;
		}
	});
});