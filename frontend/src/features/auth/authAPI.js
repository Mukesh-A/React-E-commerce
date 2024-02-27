// SignUp
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "post",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

// Login
export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    console.log("api", JSON.stringify(loginInfo));
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(loginInfo),
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
// SignOut
export function signOut(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}
