const apiUrl = "https://pg.pkgrp.in/PGWPaymentByCard/";
const PaymentRequestwithWallets = "PaymentRequestwithWallets";
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Accept': 'application/json',

}
export const PaymentService = {
    // payPaymentRequestwithWallets: async (data) => {
    //     try {
    //         const response = await fetch(apiUrl + PaymentRequestwithWallets, {
    //             method: 'POST',
    //             headers: headers,
    //             body: JSON.stringify(data)
    //         });
    //         const json = await response.json();
    //         return json;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // },
    payPaymentRequestwithWallets: async (data1) => {
        const data = {
            "txnid": "Adn1211232234",
            "amount": "10.00",
            "firstname": "Adnan",
            "email": "test@gmail.com",
            "phone": "9876543210",
            "productinfo": "iPhone14",
            "pg": "cash",
            "bankcode": "cash",
            "surl": "https://apiplayground-response.herokuapp.com/",
            "furl": "https://apiplayground-response.herokuapp.com/",
            "clientid": "0"
          }
        try {
            const response = await fetch(apiUrl + PaymentRequestwithWallets, {
                mode: 'no-cors',
                method: 'POST',
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                     "Access-Control-Allow-Origin": "*",
                   'Content-Type': 'application/json',
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
               },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    },
}