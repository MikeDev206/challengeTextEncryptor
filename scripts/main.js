document.addEventListener("DOMContentLoaded", () => {
	const inputText = document.getElementById("inputText");
	const outputText = document.getElementById("outputText");
	const encryptBtn = document.getElementById("encryptBtn");
	const decryptBtn = document.getElementById("decryptBtn");
	const checkbox = document.getElementById("checkbox");
	const logoImg = document.getElementById("logo-img");
	const historyList = document.getElementById("historyList");

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
		}, 10);

		setTimeout(() => {
			copyModal.style.opacity = 0;
			setTimeout(() => {
				copyModal.style.display = "none";
				document.body.classList.remove("modal-active");
			}, 300);
		}, 3000);
	}

	// Log history
	function logHistory(action, text) {
		const li = document.createElement("li");
		li.textContent = `${action}: ${text}`;
		historyList.appendChild(li);
	}

	// Determine if is encrypted or not
	function getActionText() {
		return outputText.innerText === encrypt(inputText.value) ? "encriptado" : "desencriptado";
	}

	// Copy and clean buttons
	const copyBtn = document.createElement("button");
	copyBtn.id = "copyBtn";
	copyBtn.classList.add("button-common");
	copyBtn.textContent = "Copiar texto encriptado";
	copyBtn.style.display = "none";
	copyBtn.addEventListener("click", () => {
		const actionText = copyBtn.textContent.includes("encriptado") ? "encriptado" : "desencriptado";
		navigator.clipboard.writeText(outputText.innerText)
			.then(() => {
				showCopyModal(`Texto ${actionText} copiado al portapapeles`);
				logHistory(`Texto ${actionText} copiado`, outputText.innerText);
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
		outputText.removeAttribute("style");  // Remueve cualquier estilo en línea que pueda interferir
		copyBtn.style.display = "none";
		document.querySelector(".image-container img").style.display = "block";
		outputText.style.display = "block";
		logHistory("Limpiar", "Campo de texto limpio");
	});

	// Add buttons to DOM
	const inputContainer = document.querySelector(".buttons");
	inputContainer.appendChild(clearBtn);

	// Add copyBtn inside outputArea
	const outputArea = document.getElementById("outputArea");
	outputArea.appendChild(copyBtn);

	// Change theme
	checkbox.addEventListener("change", () => {
		document.body.classList.toggle("dark");

		if (checkbox.checked) {
			logoImg.src = "../assets/img/logo-dark.png";
			copyBtn.style.backgroundColor = "#112240";
			copyBtn.style.color = "#64ffda";
			copyBtn.style.border = "2px solid #64ffda";
			outputText.style.color = "#0A3871";  // Aplica color azul al texto en tema oscuro
		} else {
			logoImg.src = "../assets/img/logo.png";
			copyBtn.style.backgroundColor = "#0A3871";
			copyBtn.style.color = "#FFFFFF";
			copyBtn.style.border = "none";
			outputText.style.color = "#0A3871"; // Asegúrate de que el color del texto sea azul en tema claro
		}

		const legend = document.querySelector("p[style]");
		legend.style.color = checkbox.checked ? "#64ffda" : "#0A3871";
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
		const existingMsg = document.querySelector(".validation-msg");
		if (existingMsg) {
			existingMsg.remove();
		}

		const validationMsg = document.createElement("p");
		validationMsg.textContent = msg;
		validationMsg.classList.add("validation-msg");
		validationMsg.style.color = "#FF0000";

		const inputContainer = document.querySelector(".text-area");
		inputContainer.appendChild(validationMsg);

		setTimeout(() => {
			validationMsg.style.opacity = 1;
		}, 10);

		setTimeout(() => {
			validationMsg.style.opacity = 0;
			setTimeout(() => {
				validationMsg.remove();
			}, 500);
		}, 2000);
	}

	// Encrypt and decrypt listeners
	encryptBtn.addEventListener("click", () => {
		const text = inputText.value;
		if (validateInput(text)) {
			outputText.innerText = encrypt(text);
			outputText.removeAttribute("style");  // Remueve cualquier estilo en línea que pueda interferir
			copyBtn.style.display = "inline-block";
			copyBtn.textContent = "Copiar texto encriptado";
			logHistory("Encriptar", text);
			document.querySelector(".image-container img").style.display = "none";
			outputText.style.display = "block";
		} else {
			showValidationMsg("Recuerda, solo letras minúsculas y sin acentos.");
		}
	});

	decryptBtn.addEventListener("click", () => {
		const text = inputText.value;
		if (validateInput(text)) {
			outputText.innerText = decrypt(text);
			outputText.removeAttribute("style");  // Remueve cualquier estilo en línea que pueda interferir
			copyBtn.style.display = "inline-block";
			copyBtn.textContent = "Copiar texto desencriptado";
			logHistory("Desencriptar", text);
			document.querySelector(".image-container img").style.display = "none";
			outputText.style.display = "block";
		} else {
			showValidationMsg("Recuerda, solo letras minúsculas y sin acentos.");
		}
	});

	inputText.addEventListener("keypress", (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			encryptBtn.click();
		}
	});
});
