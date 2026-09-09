document.querySelectorAll('form[name]').forEach((form) => {
	form.addEventListener('submit', async (event) => {
		event.preventDefault();

		const errorMessage = form.querySelector('[id="submitErrorMessage"]');
		const successModal = document.getElementById('successModal');
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

			errorMessage.classList.add('d-none');
			form.reset();
			bootstrap.Modal.getOrCreateInstance(successModal).show();
		} catch (error) {
			errorMessage.classList.remove('d-none');
		} finally {
			submitButton.disabled = false;
		}
	});
});