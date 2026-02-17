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

async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const text = input.value.trim();
    if (!text) return;

    chatBox.innerHTML += `<p><b>Kamu:</b> ${text}</p>`;
    input.value = "";

    const response = await getResponse(text);
    chatBox.innerHTML += `<p><b>AI:</b> ${response}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}
