const inputTextField = document.getElementById('inputText');
const outputTextField = document.getElementById('outputText');
const encryptButton = document.getElementById('encryptBtn');
const decryptButton = document.getElementById('decryptBtn');
const copyButton = document.getElementById('copyBtn');
const themeToggleSwitch = document.getElementById('themeToggleInput');
const historyContainer = document.getElementById('historyList');

// Encriptar el texto
encryptButton.addEventListener('click', () => {
	const text = inputTextField.value;
	if (text) {
		const encryptedText = encrypt(text);
		outputTextField.textContent = encryptedText;
		copyButton.style.display = 'block';
		updateHistory(encryptedText, 'Encriptado');
	} else {
		outputTextField.textContent = 'Ningún mensaje fue encontrado';
		copyButton.style.display = 'none';
	}
});

// Desencriptar el texto
decryptButton.addEventListener('click', () => {
	const text = inputTextField.value;
	if (text) {
		const decryptedText = decrypt(text);
		outputTextField.textContent = decryptedText;
		copyButton.style.display = 'block';
		updateHistory(decryptedText, 'Desencriptado');
	} else {
		outputTextField.textContent = 'Ningún mensaje fue encontrado';
		copyButton.style.display = 'none';
	}
});

// Copiar texto al portapapeles
copyButton.addEventListener('click', () => {
	const text = outputTextField.textContent;
	navigator.clipboard.writeText(text).then(() => {
		alert('Texto copiado al portapapeles');
	});
});

// Funcionalidad del slider para cambiar el tema
themeToggleSwitch.addEventListener('change', () => {
	document.body.classList.toggle('dark-theme');
});

// Funciones de encriptación y desencriptación
function encrypt(text) {
	let result = '';
	for (let i = 0; i < text.length; i++) {
		let char = text[i];
		let code = text.charCodeAt(i);

		if (code >= 97 && code <= 122) { // a-z
			char = String.fromCharCode(((code - 97 + 3) % 26) + 97);
		}

		result += char;
	}
	return result;
}

function decrypt(text) {
	let result = '';
	for (let i = 0; i < text.length; i++) {
		let char = text[i];
		let code = text.charCodeAt(i);

		if (code >= 97 && code <= 122) { // a-z
			char = String.fromCharCode(((code - 97 - 3 + 26) % 26) + 97);
		}

		result += char;
	}
	return result;
}

// Actualizar historial de encriptaciones/desencriptaciones
function updateHistory(text, action) {
	const historyItem = document.createElement('li');
	historyItem.textContent = `${action}: ${text}`;
	historyContainer.appendChild(historyItem);
}
