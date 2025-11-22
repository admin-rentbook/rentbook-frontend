export function formatNamibianDollar(amount: number) {
  const formattedAmount = amount.toLocaleString('en-NA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return {
    symbol: 'N$',
    amount: formattedAmount,
  };
}
