export const getProducts = async (category) => {
  try {
    let url = "api/Products";

    if (category != null && category != "Alle") {
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

export const createProduct = async (product) => {
  try {
    const response = await fetch("api/Products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.productId,
        name: product.name,
        description: product.description,
        image: "",
        category: product.category,
        shelfId: null,
        purchasePrice: product.purchasePrice,
        sellingPrice: product.sellingPrice,
        taxRate: product.taxRate,
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

export const editProduct = async (product) => {
  try {
    const response = await fetch(`api/Products/${product.productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.productId,
        name: product.name,
        description: product.description,
        image: "",
        category: product.category,
        shelfId: product.shelfId,
        purchasePrice: product.purchasePrice,
        sellingPrice: product.sellingPrice,
        taxRate: product.taxRate,
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
      method: "DELETE",
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
