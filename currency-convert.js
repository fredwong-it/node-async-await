
const axios = require('axios');

/* jshint ignore:start */
const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
        const rate = response.data.rates[to];

        if (rate) {
            return rate;
        } else {
            throw new Error();
        }
    } catch (e) {
        throw new Error(`Enable to get exchange rate for ${from} and ${to}.`)
    }
    
    // return axios.get(`http://api.fixer.io/latest?base=${from}`).then((response) => {
    //     return response.data.rates[to];
    // });
}

const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch (e) {
        throw new Error(`Enable to get countries that use ${currencyCode}.`)
    }
    
    // return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
    //     return response.data.map((country) => country.name);
    // });
};

const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries;
        return getExchangeRate(from, to);
    }).then((rate) => {
        const exchangedAmount = amount * rate;

        return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
    });
};


const convertCurrencyAsync = async (from, to, amount) => {
    const countries = await getCountries(to);
    const rate = await getExchangeRate(from, to);
    const exchangedAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
};


convertCurrencyAsync('USD', 'CAD', 100).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log(e.message);
});
/* jshint ignore:end */