const getMethod = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Hiba: " + response.status);
        }
        return response.json();
    }
    catch(error) {
        console.log(error);
    }
}

const postFetch = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error("Hiba: ", response.status);
        }
        return await response.json();
    }
    catch(error) {
        console.log(error);
    }
}

const ertekelesBetolt = (array) => {
    const ol = document.getElementById('ertekeles-lista');
    ol.replaceChildren();
    for (let i = array.length-1; i >= 0; i--) {
        
        let li = document.createElement('li');
        li.classList = "list-group-item";
        li.textContent = array[i];
        
        ol.appendChild(li);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await getMethod("/api/ratings")
        
        document.getElementById('average').textContent = "Átlag: " + response.average;
        ertekelesBetolt(response.ratings);

        document.getElementById('sendButton').addEventListener('click', async () => {
            try {
                console.log(document.getElementById('ratingSelect').value);
                const response = await postFetch("/api/ratings", {
                    rating: Number(document.getElementById('ratingSelect').value)
                });

                ertekelesBetolt(response.ratings);
                document.getElementById('average').textContent = "Átlag: " + response.average;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    catch(error) {
        console.log(error);
    }
});