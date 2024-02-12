// SignUp
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
      method: "post",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

// Login
export function checkUser(userInfo) {
  return new Promise(async (resolve, reject) => {
    const email = userInfo.email;
    const password = userInfo.password;
    const response = await fetch("http://localhost:8080/users?email=" + email);
    const data = await response.json();
    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "credential not match" });
      }
    } else {
      reject({ message: "user not found" });
    }
  });
}

/// update user
export function updateUser(update) {
  return new Promise(async (resolve) => {
    console.log(update);
    const response = await fetch("http://localhost:8080/users/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
