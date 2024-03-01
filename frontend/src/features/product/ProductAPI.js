// fetch all products
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("/products");
    const data = await response.json();
    resolve({ data });
  });
}

// Admin create Products products
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

//Admin update Products
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
// particular products
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/" + id);
    const data = await response.json();
    console.log("fetchProductsById", data);
    resolve({ data });
  });
}

// fetch all products with filter
export function fetchAllProductsByFilters(filter, sort, pagination, admin) {
  // console.log(
  //   "fetchAllProductsByFilters  filter",
  //   filter,
  //   "sort",
  //   sort,
  //   "pagination",
  //   pagination
  // );
  let queryString = "";

  for (let key in filter) {
    const categoryValues = filter[key];
    // console.log("categoryValues", categoryValues, key);

    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];

      // console.log("lastCategoryValue", lastCategoryValue);

      queryString += `${key}=${lastCategoryValue}&`;

      // console.log("queryString", queryString);
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    // console.log(pagination);
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString += `admin=true`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch("/products?" + queryString);
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count"); /// in http request we have a X-TOTAL-Count which will return total number of products ->> used for pagination
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

// fetch Categories
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("/categories");
    const data = await response.json();
    // console.log(data);
    resolve({ data });
  });
}

// fetch Brands
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands");
    const data = await response.json();
    resolve({ data });
  });
}
