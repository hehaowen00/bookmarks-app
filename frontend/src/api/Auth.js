const BASE_URL = '/api';

export async function login(username, password) {
  try {
    let resp = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      })
    });

    if (resp.ok) {
      let token = await resp.json();
      return { error: false, token }
    }

    return { error: true }
  } catch (error) {
    return { error: true }
  }
}

export async function register(username, password) {
  try {
    let resp = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      })
    });

    if (resp.ok) {
      let token = await resp.json();
      return { error: false, token }
    }

    let message = await resp.json();
    return { error: true, message  }
  } catch (error) {
    return { error: true }
  }
}

export async function verifyToken(token) {
  try {
    let resp = await fetch(BASE_URL + '/verify', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (resp.status === 401) {
      return { error: true, unauthorized: true };
    }

    if (resp.ok) {
      let username = await resp.json();
      return { error: false, username };
    }

    let message = await resp.json();
    return { error: true, message };
  } catch (error) {
    return { error: true, message: 'Could not connect to server' }
  }
}
