const apiUrl = "https://pg.pkgrp.in/PGWPaymentByCard/";
const PaymentRequestwithWallets = "PaymentRequestwithWallets";
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export const PaymentService = {
    payPaymentRequestwithWallets: async (data) => {
        try {
            const response = await fetch(apiUrl + PaymentRequestwithWallets, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });
            // const json = await response.text();
            return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title></head><body><h1>Hello</h1></body></html>';
        } catch (error) {
            console.error(error);
        }
    },
}