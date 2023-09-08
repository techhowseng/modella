export const formatCurrencyUSD = (amount: string) => {
    let returnAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return returnAmount.format(parseInt(amount));
};

export const formatCurrencyInteger = (amount: number, currency: string, fractionDigits = 2, language = "en-US") => {
    const zeroDecimalCurrencies = ["BIF", "MGA", "CLP", "DJF", "PYG", "RWF", "GNF", "JPY", "KMF", "KRW", "UGX", "VND", "VUV", "XAF", "XOF", "XPF"];
    let fractionDigitsInit= zeroDecimalCurrencies.includes(currency) ? 0 : fractionDigits;
    let numFormat = new Intl.NumberFormat(language, {
        style: "currency",
        currency: currency.toUpperCase(),
        minimumFractionDigits: fractionDigitsInit,
        maximumFractionDigits: fractionDigitsInit,
    });
    return numFormat.format(amount / 100);
};
