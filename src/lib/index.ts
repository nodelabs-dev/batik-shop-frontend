export const priceTotalWithoutOngkir = (ongkos: any, total: any) => {
  const parsedOngkir = parseInt(
    ongkos.replace('RP', '').replace(/\./g, ''),
    10,
  );
  const parsedPriceTotal = parseInt(
    total.replace('RP', '').replace(/\./g, ''),
    10,
  );

  const totalWithoutOngkir = parsedPriceTotal - parsedOngkir;

  const formattedTotalWithoutOngkir =
    'Rp' + totalWithoutOngkir.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return formattedTotalWithoutOngkir;
};
