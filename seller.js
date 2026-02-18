const API_KEY = "AIzaSyB54xf2a9elcJxOLeR8YQRbf5O3vwCG9gY"; // Kunci dari kamu

async function chatDenganAI(pesan) {
    // Pake url v1beta supaya model Flash-nya terbaca
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: pesan }] }]
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error("Waduh, ada masalah:", data.error.message);
            return "Maaf Bos, ada error: " + data.error.message;
        }

        return data.candidates[0].content.parts[0].text;
    } catch (err) {
        return "Koneksi ke server Google putus, Bos!";
    }
}

    const data = await response.json();
    
    // Cek kalau ada error dari Google
    if (data.error) {
        console.error("Error dari Google:", data.error.message);
        return "Sistem: " + data.error.message;
    }

    return data.candidates[0].content.parts[0].text;
}

