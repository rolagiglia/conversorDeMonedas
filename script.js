// script.js
document.getElementById("conversionForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const monedaOrigen = document.getElementById("monedaOrigen").value;
    const monedaDestino = document.getElementById("monedaDestino").value;
    const valor = parseFloat(document.getElementById("valor").value);

    if (!monedaOrigen || !monedaDestino || isNaN(valor)) {
        alert("Por favor, completa todos los campos.");
        return;
    }

   const BASE_URL = "https://Exchange-Rate.proxy-production.allthingsdev.co/ExchangeRate";
    
    const myHeaders = new Headers();
    // mi api key
    myHeaders.append("x-apihub-key", "EBINIHzN-5HGei39yhBC6ZkhCUrtrEhCsRH3B3mC-s5-GXVzsM");
    myHeaders.append("x-apihub-host", "Exchange-Rate.allthingsdev.co");
    myHeaders.append("x-apihub-endpoint", "c9207840-b078-4940-be6f-ffb3034ac644");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
     };
    try {
          // Construye la URL de la solicitud
            const url = `${BASE_URL}?fromCurrency=${monedaOrigen}&toCurrency=${monedaDestino}&amount=${valor}`;
            const response = await fetch(url,requestOptions);
            
    
            // Verifica si la respuesta es válida
            if (!response.ok) throw new Error("No se pudo obtener la tasa de cambio.");
            
            const data = await response.json();
                
            // Obtiene el resultado
            const resultado = data.convertedAmount;
            if (!resultado) throw new Error(`No se encontró la tasa para ${monedaDestino}.`);
    
            // Muestra el resultado en la página
            document.getElementById("resultado").innerText =
                `El resultado es ${resultado.toFixed(2)} ${data.toCurrency}`;
      
                } catch (error) {
            // Maneja errores y los muestra al usuario
            document.getElementById("resultado").innerText =
                "Ocurrió un error al realizar la conversión. Inténtalo más tarde.";
            console.error(error.message);
        }
});