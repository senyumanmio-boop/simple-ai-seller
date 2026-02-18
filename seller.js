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
        if (data.error) return "Error: " + data.error.message;
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        return "Koneksi ke AI terputus, coba cek internet kamu...";
    }
}

// FUNGSI UTAMA UNTUK JALANIN CHAT
async function jalankanChat() {
    const input = document.getElementById('input');
    const messages = document.getElementById('messages');
    
    if (!input || !messages) return;
    
    const text = input.value.trim();
    if (!text) return;

    // Tampilkan chat kamu
    messages.innerHTML += `<div style="text-align: right; margin: 10px; color: blue; font-family: sans-serif;"><b>Kamu:</b> ${text}</div>`;
    input.value = "";

    // Ambil jawaban AI
    const jawaban = await getResponse(text);
    
    // Tampilkan jawaban AI
    messages.innerHTML += `<div style="text-align: left; margin: 10px; color: red; font-family: sans-serif;"><b>AI:</b> ${jawaban}</div>`;
    messages.scrollTop = messages.scrollHeight;
}

// PASANG DETEKSI ENTER SECARA OTOMATIS
document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('input');
    if (inputField) {
        inputField.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                jalankanChat();
            }
        });
    }
});

// CADANGAN NAMA FUNGSI BIAR PASTI JALAN
function taketheinput() { jalankanChat(); }
function takeinput() { jalankanChat(); }
function sendChat() { jalankanChat(); }
