// fetch all products
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

// particular products
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/" + id);
    const data = await response.json();
    console.log("fetchProductsById", data);
    resolve({ data });
  });
}

// fetch all products with filter
export function fetchAllProductsByFilters(filter, sort, pagination) {
  // console.log("filter from api", filter);
  let queryString = "";

  for (let key in filter) {
    const categoryValues = filter[key];
    // console.log("categoryValues", categoryValues, key);

    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    // console.log(pagination);
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count"); /// in http request we have a X-TOTAL-Count which will return total number of products ->> used for pagination
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

// fetch Categories
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    // console.log(data);
    resolve({ data });
  });
}

// fetch Brands
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}
