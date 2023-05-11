const apiUrl = 'https://utility.pinkytravels.com/api/UtilityAPI/';

export const userService = {
    getCategoriesList: async (endPoint) => {
        try {
            const response = await fetch(apiUrl + endPoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const json = await response.json();
            const categorylists = json.paymentCategory;
            const responseCategories = categorylists.map((category) => {
                category.slug = category.PayCategory.toLowerCase()
                    .replace(/[^\w ]+/g, '')
                    .replace(/ +/g, '-');
                return category;
            });

            return responseCategories;
        } catch (error) {
            console.error(error);
        }
    },
    getGetSubCategoryList: async (endPoint, categoryId) => {
        try {
            const response = await fetch(apiUrl + endPoint + '?CategoryID=' + categoryId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const json = await response.json();
            const subCategoryList = json.categorylists;
            return subCategoryList;
        } catch (error) {
            console.error(error);
        }
    },
    getGetOperatorDetailsList: async (endPoint, number) => {
        try {
            const response = await fetch(apiUrl + endPoint + '?Number=' + number, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const json = await response.json();
            // const subCategoryList = json.categorylists;
            return json;
        } catch (error) {
            console.error(error);
        }
    },
    getGetCircleList: async (endPoint, billerid) => {
        try {
            const response = await fetch(apiUrl + endPoint + '?billerid=' + billerid, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const json = await response.json();
            const circles = json.circles;
            return circles;
        } catch (error) {
            console.error(error);
        }
    },
    allFetchPrepaidPlan: async (endPoint, data) => {
        try {
            const response = await fetch(apiUrl + endPoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            // const circles = json.circles;
            return json;
        } catch (error) {
            console.error(error);
        }
    }

};