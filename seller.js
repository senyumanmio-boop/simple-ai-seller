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
        return "Aduh, koneksi AI-nya lagi putus...";
    }
}

// Fungsi supaya tombol di web bisa jalan
async function takeinput() {
    const inputField = document.getElementById('input');
    const messages = document.getElementById('messages');
    const userText = inputField.value;

    if (!userText) return;

    // Tampilkan chat kamu
    messages.innerHTML += `<div id='buyerblock'>${userText}</div>`;
    inputField.value = "";

    // Ambil jawaban dari AI
    const aiAnswer = await getResponse(userText);
    
    // Tampilkan jawaban AI
    messages.innerHTML += `<div id='sellerblock'>${aiAnswer}</div>`;
}

// Supaya bisa enter buat kirim
document.getElementById('input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        takeinput();
    }
});
