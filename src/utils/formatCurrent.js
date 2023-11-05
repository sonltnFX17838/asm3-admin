const formatCurrency = (number) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const formattedNumber = formatter.format(number);

  return formattedNumber.replace(/VND/g, "đ");
};

export default formatCurrency;
