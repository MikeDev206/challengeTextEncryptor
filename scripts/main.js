const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const copyBtn = document.getElementById('copyBtn');
const themeToggleInput = document.getElementById('themeToggleInput');
const historyList = document.getElementById('historyList');

// Encriptar el texto
encryptBtn.addEventListener('click', () => {
	const text = inputText.value;
	if (text) {
		const encryptedText = encrypt(text);
		outputText.textContent = encryptedText;
		copyBtn.style.display = 'block';
		updateHistory(encryptedText, 'Encriptado');
	} else {
		outputText.textContent = 'Ningún mensaje fue encontrado';
		copyBtn.style.display = 'none';
	}
});

// Desencriptar el texto
decryptBtn.addEventListener('click', () => {
	const text = inputText.value;
	if (text) {
		const decryptedText = decrypt(text);
		outputText.textContent = decryptedText;
		copyBtn.style.display = 'block';
		updateHistory(decryptedText, 'Desencriptado');
	} else {
		outputText.textContent = 'Ningún mensaje fue encontrado';
		copyBtn.style.display = 'none';
	}
});

// Copiar texto al portapapeles
copyBtn.addEventListener('click', () => {
	const text = outputText.textContent;
	navigator.clipboard.writeText(text).then(() => {
		alert('Texto copiado al portapapeles');
	});
});

// Funcionalidad del slider para cambiar el tema
themeToggleInput.addEventListener('change', () => {
	document.body.classList.toggle('dark-theme');
	const slider = document.querySelector('.slider');
	if (themeToggleInput.checked) {
		slider.style.backgroundImage = "url('path/to/moon-icon.png')";
	} else {
		slider.style.backgroundImage = "url('path/to/sun-icon.png')";
	}
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
	historyList.appendChild(historyItem);
}
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const copyBtn = document.getElementById('copyBtn');
const themeToggleInput = document.getElementById('themeToggleInput');
const historyList = document.getElementById('historyList');

// Encriptar el texto
encryptBtn.addEventListener('click', () => {
	const text = inputText.value;
	if (text) {
		const encryptedText = encrypt(text);
		outputText.textContent = encryptedText;
		copyBtn.style.display = 'block';
		updateHistory(encryptedText, 'Encriptado');
	} else {
		outputText.textContent = 'Ningún mensaje fue encontrado';
		copyBtn.style.display = 'none';
	}
});

// Desencriptar el texto
decryptBtn.addEventListener('click', () => {
	const text = inputText.value;
	if (text) {
		const decryptedText = decrypt(text);
		outputText.textContent = decryptedText;
		copyBtn.style.display = 'block';
		updateHistory(decryptedText, 'Desencriptado');
	} else {
		outputText.textContent = 'Ningún mensaje fue encontrado';
		copyBtn.style.display = 'none';
	}
});

// Copiar texto al portapapeles
copyBtn.addEventListener('click', () => {
	const text = outputText.textContent;
	navigator.clipboard.writeText(text).then(() => {
		alert('Texto copiado al portapapeles');
	});
});

// Funcionalidad del slider para cambiar el tema
themeToggleInput.addEventListener('change', () => {
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
	historyList.appendChild(historyItem);
}
