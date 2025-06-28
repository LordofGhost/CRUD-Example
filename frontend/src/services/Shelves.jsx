export const getShelves = async (category) => {
  try {
    let url = "api/Shelves";

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
    console.error("Could not get Shelves: " + error);
    return null;
  }
};

export const createShelf = async (shelfId, category, products) => {
  try {
    const response = await fetch("api/Products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shelfId: shelfId,
        category: category,
        products: products,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Shelf could not be created: " + error);
    return false;
  }
};

export const getShelf = async (shelfId) => {
  try {
    const response = await fetch(`api/Shelves/${shelfId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Could not get Shelf: " + error);
    return null;
  }
};

export const editShelf = async (shelfId, category, products) => {
  try {
    const response = await fetch(`api/Shelves/${shelfId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shelfId: shelfId,
        category: category,
        products: products,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Shelf could not be edited: " + error);
    return false;
  }
};

export const deleteShelf = async (shelfId) => {
  try {
    const response = await fetch(`api/Shelves/${shelfId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Shelf could not be deletet: " + error);
    return false;
  }
};
