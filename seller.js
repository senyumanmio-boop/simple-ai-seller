const API_KEY = "AIzaSyCfhw09Q6lP1xKyRG-3gVzW9kaloXr5yzk";

async function taketheinput() {
    const input = document.getElementById('input');
    const messages = document.getElementById('messages');
    const userText = input.value.trim();

    if (!userText) return;

    // Tampilkan chat kamu
    messages.innerHTML += `<div style="text-align: right; margin: 10px; background: #eee; padding: 10px; border-radius: 10px;"><b>Kamu:</b> ${userText}</div>`;
    input.value = "";

    // Ambil jawaban AI
    const aiAnswer = await getResponse(userText);
    
    // Tampilkan jawaban AI
    messages.innerHTML += `<div style="text-align: left; margin: 10px; background: #ff0000; color: white; padding: 10px; border-radius: 10px;"><b>AI:</b> ${aiAnswer}</div>`;
    
    // Auto scroll ke bawah
    messages.scrollTop = messages.scrollHeight;
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


