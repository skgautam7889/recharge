const apiUrl = "https://pg.pkgrp.in/PGWPaymentByCard/";
const PaymentRequestwithWallets = "PaymentRequestwithWallets";
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Accept': '*/*',

}
export const PaymentService = {
    payPaymentRequestwithWallets: async (data) => {
        try {
            const response = await fetch(apiUrl + PaymentRequestwithWallets, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    },
}