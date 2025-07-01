export const getShelves = async () => {
  try {
    const response = await fetch("api/Shelves", {
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

export const createShelf = async (shelf) => {
  try {
    const response = await fetch("api/Shelves", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        compartments: shelf.compartments,
        compartmentsSize: shelf.compartmentsSize,
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

export const setCompartments = async (shelfId, ProductIds) => {
  let convertedProductIds = ProductIds.map((productId) => {
    if (productId === "") return null;
    else return productId;
  });
  try {
    const response = await fetch(`api/Shelves`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shelfId: shelfId,
        ProductIds: convertedProductIds,
      }),
    });
    console.log(response.ok);
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
