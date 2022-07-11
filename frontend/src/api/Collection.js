const BASE_URL = `/api`

export async function getCollections(token) {
  let resp = makeRequest(
    `${BASE_URL}/collections`,
    'GET',
    token,
  );

  return resp;
}

export async function getCollection(token, id) {
  let resp = await makeRequest(
    `${BASE_URL}/collection/${id}`,
    'GET',
    token,
  );

  return resp;
}

export async function addCollection(token, name) {
  let resp = await makeRequest(
    `${BASE_URL}/collection`,
    'POST',
    token,
    JSON.stringify({ name })
  );

  return resp;
}

export async function updateCollection(token, item) {
  let resp = await makeRequest(
    `${BASE_URL}/collection`,
    'PUT',
    token,
    JSON.stringify(item)
  );

  return resp;
}

export async function deleteCollection(token, item) {
  let resp = await makeRequest(
    `${BASE_URL}/collection`,
    'DELETE',
    token,
    JSON.stringify(item)
  );

  if (resp.error) {
    return resp;
  }

  return { error: false };
}

async function makeRequest(url, method, token, body=undefined) {
  try {
    let resp = await fetch(url, {
      method,
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
      },
      body,
    });

    if (resp.ok) {
      let payload = await resp.json();
      return { error: false, payload };
    }

    let message = await resp.json();
    return { error: true, message };
  } catch (error) {
    return { error: true, message: error.message };
  }
}
