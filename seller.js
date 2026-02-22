// --- MASUKKAN API KEY ANDA DI DALAM TANDA KUTIP DI BAWAH INI ---
const API_KEY = "AIzaSyC1rSdFmAxtxe0JA8ibRGCBruC3f0Y9wc8I"; 

async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const message = inputField.value.trim();

    if (!message) return;

    // Tampilkan pesan user
    chatBox.innerHTML += `<div class="message user">${message}</div>`;
    inputField.value = "";

    // Tampilkan status loading
    const loadingId = "load-" + Date.now();
    chatBox.innerHTML += `<div id="${loadingId}" class="message bot">Sedang berpikir...</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
        });

        const data = await response.json();

        // Deteksi error dari Google
        if (!response.ok) {
            let errorMsg = data.error ? data.error.message : "Error tidak diketahui.";
            throw new Error(errorMsg);
        }

        const botReply = data.candidates[0].content.parts[0].text;
        document.getElementById(loadingId).outerHTML = `<div class="message bot">${botReply}</div>`;

    } catch (error) {
        // Jika gagal, tampilkan pesan error merah di chat
        document.getElementById(loadingId).outerHTML = `<div class="message bot error"><b>Gagal Terhubung:</b><br>${error.message}</div>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Menjalankan fungsi saat tombol diklik atau Enter ditekan
document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") sendMessage();
});
