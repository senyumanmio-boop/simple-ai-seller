const API_KEY = "AIzaSyCwVFXmF0ZSzVgzeqoGyNSekWHvC74eALA"; // Ganti pake key asli!

async function panggilAI(pesanUser) {
    // Jalur resmi: v1beta dengan model gemini-1.5-flash
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: pesanUser }] }]
        })
    });

    const data = await response.json();
    
    // Cek kalau ada error dari Google
    if (data.error) {
        console.error("Error dari Google:", data.error.message);
        return "Sistem: " + data.error.message;
    }

    return data.candidates[0].content.parts[0].text;
}
