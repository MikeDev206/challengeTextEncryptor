document.addEventListener("DOMContentLoaded", () => {
	const inputText = document.getElementById("inputText");
	const outputText = document.getElementById("outputText");
	const encryptBtn = document.getElementById("encryptBtn");
	const decryptBtn = document.getElementById("decryptBtn");
	const checkbox = document.getElementById("checkbox");
	const logoImg = document.getElementById("logo-img");

	// Creation and configuration of copy modal
	const copyModal = document.createElement("div");
	copyModal.id = "copyModal";
	document.body.appendChild(copyModal);

	// Show modal
	function showCopyModal(message) {
		copyModal.textContent = message;
		copyModal.style.display = "block";
		setTimeout(() => {
			copyModal.style.opacity = 1;
			document.body.classList.add("modal-active");
		}, 10); // Delay for transition

		setTimeout(() => {
			copyModal.style.opacity = 0;
			setTimeout(() => {
				copyModal.style.display = "none";
				document.body.classList.remove("modal-active");
			}, 300);
		}, 3000); // Modal visualization
	}

	// Determines whether the text is encrypted or decrypted
	function getActionText() {
		return outputText.innerText === encrypt(inputText.value) ? "encriptado" : "desencriptado";
	}

	// Add copy and clear buttons
	const copyBtn = document.createElement("button");
	copyBtn.id = "copyBtn";
	copyBtn.classList.add("button-common"); // Ensuring consistent styles
	copyBtn.textContent = "Copiar texto encriptado";
	copyBtn.style.display = "none";
	copyBtn.addEventListener("click", () => {
		const actionText = getActionText();
		navigator.clipboard.writeText(outputText.innerText)
			.then(() => {
				showCopyModal(`Texto ${actionText} copiado al portapapeles`);
			})
			.catch(err => {
				alert("Error al copiar el texto: " + err);
			});
	});

	const clearBtn = document.createElement("button");
	clearBtn.id = "clearBtn";
	clearBtn.classList.add("button-common");
	clearBtn.textContent = "Limpiar campo";
	clearBtn.addEventListener("click", () => {
		inputText.value = "";
		outputText.innerText = "Ningún mensaje fue encontrado";
		copyBtn.style.display = "none";
	});

	// Add buttons to DOM
	const inputContainer = document.querySelector(".buttons");
	inputContainer.appendChild(copyBtn);
	inputContainer.appendChild(clearBtn);

	// Change theme
	checkbox.addEventListener("change", () => {
		document.body.classList.toggle("dark");

		if (checkbox.checked) {
			logoImg.src = "../assets/img/logo-dark.png";
			copyBtn.style.backgroundColor = "#112240";
			copyBtn.style.color = "#64ffda";
			copyBtn.style.border = "2px solid #64ffda";
		} else {
			logoImg.src = "../assets/img/logo.png";
			copyBtn.style.backgroundColor = "#0A3871";
			copyBtn.style.color = "#FFFFFF";
			copyBtn.style.border = "none";
		}

		const legend = document.querySelector("p[style]");
		legend.style.color = checkbox.checked ? "#64ffda" : "#0A3871";
		outputText.style.color = checkbox.checked ? "#64ffda" : "#0A3871";
	});

	// Validate input
	function validateInput(text) {
		const regex = /^[a-zñ\s]+$/;
		return regex.test(text);
	}

	// Encryption method
	function encrypt(text) {
		let encryptedText = text.split('').map(char => {
			if (char === ' ') return char;
			let charCode = char.charCodeAt(0) + 3;
			if ((charCode > 122 && char >= 'a') || (charCode > 90 && char < 'a')) {
				charCode -= 26;
			}
			return String.fromCharCode(charCode);
		}).join('');
		return encryptedText;
	}

	// Decryption method
	function decrypt(text) {
		let decryptedText = text.split('').map(char => {
			if (char === ' ') return char;
			let charCode = char.charCodeAt(0) - 3;
			if ((charCode < 97 && char >= 'a') || (charCode < 65 && char < 'a')) {
				charCode += 26;
			}
			return String.fromCharCode(charCode);
		}).join('');
		return decryptedText;
	}

	// Show validation message
	function showValidationMsg(msg) {
		// Delete existing validation message
		const existingMsg = document.querySelector(".validation-msg");
		if (existingMsg) {
			existingMsg.remove();
		}

		// Show actual validation message
		const validationMsg = document.createElement("p");
		validationMsg.textContent = msg;
		validationMsg.classList.add("validation-msg");
		validationMsg.style.color = checkbox.checked ? "#64ffda" : "#FF0000";

		// Add message to the document
		const inputContainer = document.querySelector(".input-container");
		inputContainer.appendChild(validationMsg);

		// Delete message after 2 seconds
		setTimeout(() => {
			validationMsg.remove();
		}, 2000);
	}

	// Encrypt and Decrypt Listeners
	encryptBtn.addEventListener("click", () => {
		const text = inputText.value;
		if (validateInput(text)) {
			outputText.style.color = checkbox.checked ? "#64ffda" : "#0A3871";
			outputText.innerText = encrypt(text);
			copyBtn.style.display = "inline-block";
			copyBtn.textContent = "Copiar texto encriptado";
		} else {
			showValidationMsg("Solo se permiten letras minúsculas y espacios.");
		}
	});

	decryptBtn.addEventListener("click", () => {
		const text = inputText.value;
		if (validateInput(text)) {
			outputText.style.color = checkbox.checked ? "#64ffda" : "#0A3871";
			outputText.innerText = decrypt(text);
			copyBtn.style.display = "inline-block";
			copyBtn.textContent = "Copiar texto desencriptado";
		} else {
			showValidationMsg("Solo se permiten letras minúsculas y espacios.");
		}
	});

	inputText.addEventListener("keypress", (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			encryptBtn.click();
		}
	});
});
