class HttpClient {
  async #fetch(url, config) {
    try {
      const response = await fetch(url, config);
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject({ reason: response.statusText });
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  get(url, headers) {
    const getConfig = { method: "GET", headers: headers };
    return this.#fetch(url, getConfig);
  }

  post(resource, headers, body) {
    const postConfig = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    };
    return this.#fetch(resource, postConfig);
  }

  put(resource, headers, body) {
    const putConfig = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(body),
    };
    return this.#fetch(resource, putConfig);
  }

  // delete(resource, headers, body) {
  //   const deleteConfig = {
  //     method: "DELETE",
  //     headers: headers,
  //     body: JSON.stringify(body),
  //   };
  //   return this.#fetch(resource, deleteConfig);
  // }
}

export const httpClient = new HttpClient();
