const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// MASUKKAN API KEY ANDA DI SINI
const API_KEY = "AIzaSyB54xf2a9elcJxOLeR8YQRbf5O3vwCG9gY";

async function getAIResponse(message) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        return "Maaf, sepertinya ada gangguan koneksi. Coba lagi ya!";
    }
}

function appendMessage(text, type) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${type}-msg`;
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function handleChat() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    userInput.value = '';

    // Tampilkan loading sederhana
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'msg bot-msg';
    loadingDiv.innerText = 'Sedang berpikir...';
    chatBox.appendChild(loadingDiv);

    const aiText = await getAIResponse(text);
    chatBox.removeChild(loadingDiv);
    appendMessage(aiText, 'bot');
}

sendBtn.addEventListener('click', handleChat);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
});
