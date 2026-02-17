const API_KEY = "AIzaSyCfhw09Q6lP1xKyRG-3gVzW9kaloXr5yzk";

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
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        return "Waduh, koneksi ke otak AI saya lagi error nih...";
    }
}

// Fungsi utama biar chatnya muncul
async function taketheinput() {
    const input = document.getElementById('input');
    const messages = document.getElementById('messages');
    const userText = input.value;

    if (!userText) return;

    // Munculin chat kamu
    messages.innerHTML += `<div id='buyerblock'>${userText}</div>`;
    input.value = "";

    // Ambil jawaban dari AI Gemini
    const aiAnswer = await getResponse(userText);
    
    // Munculin jawaban AI
    messages.innerHTML += `<div id='sellerblock'>${aiAnswer}</div>`;
}

// Biar bisa kirim pakai tombol Enter
document.getElementById('input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        taketheinput();
    }
});

