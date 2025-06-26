export const getProducts = async (category) => {
  try {
    let url = "api/Products";

    if (category) {
      url += `?category=${category}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Could not get Products: " + error);
    return null;
  }
};

export const createProduct = async (
  productId,
  name,
  description,
  category,
  shelfId,
  purchasePrice,
  sellingPrice,
  taxRate
) => {
  try {
    const response = await fetch("api/Products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        name: name,
        description: description,
        image: "",
        category: category,
        shelfId: shelfId,
        purchasePrice: purchasePrice,
        sellingPrice: sellingPrice,
        taxRate: taxRate,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Product could not be created: " + error);
    return false;
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await fetch(`api/Products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Could not get Product: " + error);
    return null;
  }
};

export const editProduct = async (
  productId,
  name,
  description,
  category,
  shelfId,
  purchasePrice,
  sellingPrice,
  taxRate
) => {
  try {
    const response = await fetch(`api/Products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        name: name,
        description: description,
        image: "",
        category: category,
        shelfId: shelfId,
        purchasePrice: purchasePrice,
        sellingPrice: sellingPrice,
        taxRate: taxRate,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Product could not be edited: " + error);
    return false;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`api/Products/${productId}`, {
      method: "DELTE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Product could not be deletet: " + error);
    return false;
  }
};
