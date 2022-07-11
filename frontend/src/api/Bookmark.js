const BASE_URL = '/api';

export async function getBookmarks(token, listId) {
  let resp = await makeRequest(
    `${BASE_URL}/bookmarks/${listId}`,
    'GET',
    token,
  );

  return resp;
}

export async function addBookmark(token, item) {
  let resp = await makeRequest(
    `${BASE_URL}/bookmark`,
    'POST',
    token,
    JSON.stringify(item),
  );

  return resp;
}

export async function deleteBookmark(token, item) {
  let resp = await makeRequest(
    `${BASE_URL}/bookmark`,
    'DELETE',
    token,
    JSON.stringify(item),
  );

  return resp;
}

async function makeRequest(url, method, token, body=undefined) {
  try {
    let resp = await fetch(url, {
      method,
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
