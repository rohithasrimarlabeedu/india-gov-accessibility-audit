const API_URL =
    "https://fakestoreapi.com/products";


export async function fetchProducts() {

    const response =
        await fetch(API_URL);


    if (!response.ok) {

        throw new Error(
            "Failed to fetch data from the REST API."
        );

    }


    const data =
        await response.json();


    return data;
}