export const currencyFormat = (value: number) => {
    return new Intl.NumberFormat('es-US', {
        style: 'currency',
        currency: 'CLP',
        currencyDisplay: 'narrowSymbol',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);

}