document.addEventListener("DOMContentLoaded", () => {
	const inputText = document.getElementById("inputText");
	const outputText = document.getElementById("outputText");
	const encryptBtn = document.getElementById("encryptBtn");
	const decryptBtn = document.getElementById("decryptBtn");
	const checkbox = document.getElementById("checkbox");
	const logoImg = document.getElementById("logo-img");
	const historyList = document.getElementById("historyList");

	// Creación y configuración del modal de copia
	const copyModal = document.createElement("div");
	copyModal.id = "copyModal";
	document.body.appendChild(copyModal);

	// Función para mostrar el modal
	function showCopyModal(message) {
		copyModal.textContent = message;
		copyModal.style.display = "block";
		setTimeout(() => {
			copyModal.style.opacity = 1;
			document.body.classList.add("modal-active");
		}, 10); // Retardo para la transición

		setTimeout(() => {
			copyModal.style.opacity = 0;
			setTimeout(() => {
				copyModal.style.display = "none";
				document.body.classList.remove("modal-active");
			}, 300);
		}, 3000); // Visualización del modal
	}

	// Log acciones en el historial
	function logHistory(action, text) {
		const li = document.createElement("li");
		li.textContent = `${action}: ${text}`;
		historyList.appendChild(li);
	}

	// Determina si el texto es encriptado o desencriptado
	function getActionText() {
		return outputText.innerText === encrypt(inputText.value) ? "encriptado" : "desencriptado";
	}

	// Botones de copiar y limpiar
	const copyBtn = document.createElement("button");
	copyBtn.id = "copyBtn";
	copyBtn.classList.add("button-common"); // Asegurando estilos consistentes
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
		copyBtn.style.display = "none";
		logHistory("Limpiar", "Campo de texto limpio");
	});

	// Agregar botones al DOM
	const inputContainer = document.querySelector(".buttons");
	inputContainer.appendChild(copyBtn);
	inputContainer.appendChild(clearBtn);

	// Cambiar tema
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

	// Validar entrada
	function validateInput(text) {
		const regex = /^[a-zñ\s]+$/;
		return regex.test(text);
	}

	// Método de encriptado
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

	// Método de desencriptado
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

	// Mostrar mensaje de validación
	function showValidationMsg(msg) {
		const existingMsg = document.querySelector(".validation-msg");
		if (existingMsg) {
			existingMsg.remove();
		}

		const validationMsg = document.createElement("p");
		validationMsg.textContent = msg;
		validationMsg.classList.add("validation-msg");
		validationMsg.style.color = checkbox.checked ? "#64ffda" : "#FF0000";

		const inputContainer = document.querySelector(".input-container");
		inputContainer.appendChild(validationMsg);

		setTimeout(() => {
			validationMsg.remove();
		}, 2000);
	}

	// Listeners para encriptar y desencriptar
	encryptBtn.addEventListener("click", () => {
		const text = inputText.value;
		if (validateInput(text)) {
			outputText.style.color = checkbox.checked ? "#64ffda" : "#0A3871";
			outputText.innerText = encrypt(text);
			copyBtn.style.display = "inline-block";
			copyBtn.textContent = "Copiar texto encriptado";
			logHistory("Encriptar", text);
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
			logHistory("Desencriptar", text);
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
