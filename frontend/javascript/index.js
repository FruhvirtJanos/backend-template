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

const listaBetolt = (array) => {
    let ul = document.getElementById('termek-lista');
    ul.replaceChildren();
    for (let i = 0; i < array.length; i++) {
        let li = document.createElement('li');
        li.classList = "list-group-item";
        li.textContent = "Termék: " + array[i].name + " | Ár: " + array[i].price + "Ft";

        ul.appendChild(li);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await getMethod("/api/products");

        listaBetolt(response.products);


        document.getElementById('hozzaadButton').addEventListener('click', async () => {
            try {
                const fetch_response = await postFetch('/api/products', {
                    name: document.getElementById('nevInput').value,
                    price: Number(document.getElementById('arInput').value)
                });

                if (fetch_response) {
                    document.getElementById('siker-div').textContent = fetch_response.message;
                    setTimeout(() => {
                        document.getElementById('siker-div').textContent = "";
                    }, 3000)
                }

                const post_response = await getMethod('/api/products');

                listaBetolt(post_response.products);
            }
            catch (error) {
                console.log(error);
            }
        })
    }
    catch(error) {
        console.log(error);
    }
});