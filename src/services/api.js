const URL = '/api';
const AUTH_URL = `${URL}/auth`;
const PRICES_URL = `${URL}/prices`;
const USERS_URL = `${URL}/users`;
const ACCOUNTS_URL = `${USERS_URL}/accounts`;
const TRANSACTIONS_URL = `${USERS_URL}/transactions`;


// helper functions
function responseHandler(response) {
  if(response.ok) return response.json();
  return response.json().then(body => { 
    throw body.error; 
  });
}
function getHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if(token) headers['Authorization'] = token;
  return headers;
}

// auth functions
export function signUp(credentials) {
  return fetch(`${AUTH_URL}/signup`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials)
  })
    .then(responseHandler)
    .then(user => {
      storeToken(user);
      return user;
    });
}
export function signIn(credentials) {
  return fetch(`${AUTH_URL}/signin`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials)
  })
    .then(responseHandler)
    .then(user => {
      storeToken(user);
      return user;
    });
}
function storeToken(user) {
  const token = user.token;
  window.localStorage.setItem('token', token);
}
export function signOut() {
  window.localStorage.removeItem('token');
}
export function getToken() {
  return window.localStorage.getItem('token');
}
export function getMe() {
  return fetch(`${AUTH_URL}/me`, {
    method: 'GET',
    headers: getHeaders()
  })
    .then(responseHandler);
}



// prices
export function getPrices() {
  return fetch(PRICES_URL, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

// accounts
export function getAccounts() {
  return fetch(ACCOUNTS_URL, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

// transactions
export function postTransaction(transaction) {
  return fetch(TRANSACTIONS_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(transaction)
  })
    .then(responseHandler);
}





// // programs
// export function getPrograms() {
//   return fetch(PROGRAMS_URL, {
//     headers: getHeaders()
//   })
//     .then(responseHandler);
// }
// export function addProgram(program) {
//   return fetch(`${PROGRAMS_URL}`, {
//     method: 'POST',
//     headers: getHeaders(),
//     body: JSON.stringify(program)
//   })
//     .then(responseHandler);
// }

// // workouts
// export function getWorkouts() {
//   return fetch(WORKOUTS_URL, {
//     headers: getHeaders()
//   })
//     .then(responseHandler);
// }
// export function addWorkout(programId) {
//   return fetch(WORKOUTS_URL, {
//     method: 'POST',
//     headers: getHeaders(),
//     body: JSON.stringify(programId)
//   })
//     .then(responseHandler);
// }
// export function removeWorkout(id) {
//   return fetch(WORKOUTS_URL, {
//     method: 'DELETE',
//     headers: getHeaders(),
//     body: JSON.stringify(id)
//   })
//     .then(responseHandler);
// }

// // logs
// export function getLogs() {
//   return fetch(LOGS_URL, {
//     headers: getHeaders()
//   })
//     .then(responseHandler);
// }
// export function addLog(log) {
//   return fetch(LOGS_URL, {
//     method: 'POST',
//     headers: getHeaders(),
//     body: JSON.stringify(log)
//   })
//     .then(responseHandler);
// }
// export function updateLog(log) {
//   return fetch(LOGS_URL, {
//     method: 'PUT',
//     headers: getHeaders(),
//     body: JSON.stringify(log)
//   })
//     .then(responseHandler);
// }
// export function removeLog(id){
//   return fetch(LOGS_URL, {
//     method: 'DELETE',
//     headers: getHeaders(),
//     body: JSON.stringify(id)
//   })
//     .then(responseHandler);
// }


