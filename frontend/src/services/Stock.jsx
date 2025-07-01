export const restockProduct = async (productId, amount) => {
  try {
    const response = await fetch(`api/Stock/RestockProduct`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        amount: amount,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Product could not be restocked: " + error);
    return false;
  }
};

export const sellProduct = async (products) => {
  try {
    const response = await fetch(`api/Stock/SellProducts`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    });
    return response.ok;
  } catch (error) {
    console.error("Product could not be sold: " + error);
    return false;
  }
};
