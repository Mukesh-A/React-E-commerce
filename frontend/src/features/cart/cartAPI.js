// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "post",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    console.log("cart details", data);
    resolve({ data });
  });
}

// fetching all products in cart
export function fetchItemsByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart");
    const data = await response.json();
    // console.log(data);
    resolve({ data });
  });
}

//changing cart quantity
export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    console.log("cart details", data);
    resolve({ data });
  });
}

//Delete items from cart
export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    console.log("cart-DELETED details", data);
    resolve({ data: { id: itemId } });
  });
}

export function resetCart() {
  //get all items of user's cart -  and then delete each items from cart so we can use above function codes
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId();
    const items = response.data;
    console.log("items cartAPI", items);
    for (let item of items) {
      console.log("Deleted cartAPI", item);
      await deleteItemFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
