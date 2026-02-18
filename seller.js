const API_KEY = "AIzaSyD-L0kG3n1m1_T3st_K3y_2026_Ok";

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
    console.log(data); // Tambahkan baris ini!
    if (data.error) return "Error: " + data.error.message; 
    return data.candidates[0].content.parts[0].text;
}

// FUNGSI INI YANG PENTING BIAR NGGAK ERROR TIAP KETIK HURUF
async function taketheinput() {
    const inputField = document.getElementById('input');
    const messages = document.getElementById('messages');
    const userText = inputField.value.trim();

    if (!userText) return;

    // Tampilkan chat kamu di layar
    messages.innerHTML += `<div style="text-align: right; margin: 10px; color: blue;"><b>Kamu:</b> ${userText}</div>`;
    
    // Kosongkan kotak ketik
    inputField.value = "";

    // Ambil jawaban AI (Cuma dipanggil SEKALI di sini)
    const aiAnswer = await getResponse(userText);
    
    // Tampilkan jawaban AI
    messages.innerHTML += `<div style="text-align: left; margin: 10px; color: red;"><b>AI:</b> ${aiAnswer}</div>`;
    
    // Auto scroll ke bawah
    messages.scrollTop = messages.scrollHeight;
}

// Hapus event listener 'oninput' kalau ada, ganti pakai ini:
document.getElementById('input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        taketheinput();
    }
});


