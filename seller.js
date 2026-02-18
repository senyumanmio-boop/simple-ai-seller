const API_KEY = "AIzaSyCwVFXmF0ZSzVgzeqoGyNSekWHvC74eALA"; 

async function getResponse(query) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: query }] }]
            })
        });
        const data = await response.json();
        if (data.error) return "Waduh, API Key kamu bermasalah nih.";
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        return "Koneksi internet kamu lagi nggak stabil nih...";
    }
}

// FUNGSI UTAMA (Kita buat dua nama biar nggak bentrok sama HTML)
async function sendChat() {
    const inputField = document.getElementById('input');
    const messages = document.getElementById('messages');
    const userText = inputField.value.trim();

    if (!userText) return;

    // Tampilkan pesan kamu
    messages.innerHTML += `<div style="text-align: right; margin: 10px; color: blue;"><b>Kamu:</b> ${userText}</div>`;
    inputField.value = "";

    // Ambil jawaban AI
    const aiAnswer = await getResponse(userText);
    
    // Tampilkan jawaban AI
    messages.innerHTML += `<div style="text-align: left; margin: 10px; color: red;"><b>AI:</b> ${aiAnswer}</div>`;
    
    // Auto scroll ke bawah
    messages.scrollTop = messages.scrollHeight;
}

// SUPAYA ENTER BISA JALAN
document.getElementById('input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        sendChat();
    }
});

// Cadangan jika HTML memanggil nama fungsi lain
function taketheinput() { sendChat(); }
function takeinput() { sendChat(); }
