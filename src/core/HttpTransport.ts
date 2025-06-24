enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  data?: string | Record<string, string | number> | FormData;
  headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export class HTTPTransport {
  private apiUrl: string = '';

  constructor(apiPath: string) {
    this.apiUrl = `https://ya-praktikum.tech/api/v2/${apiPath}`;
  }

  get<TResponse>(
    endpoint: string,
    options: OptionsWithoutMethod = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${endpoint}`, {
      ...options,
      method: METHOD.GET,
    });
  }

  post<TResponse>(
    endpoint: string,
    options: OptionsWithoutMethod = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${endpoint}`, {
      ...options,
      method: METHOD.POST,
    });
  }

  put<TResponse>(
    endpoint: string,
    options: OptionsWithoutMethod = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${endpoint}`, {
      ...options,
      method: METHOD.PUT,
    });
  }

  delete<TResponse>(
    endpoint: string,
    options: OptionsWithoutMethod = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${endpoint}`, {
      ...options,
      method: METHOD.DELETE,
    });
  }

  async request<TResponse>(
    url: string,
    options: Options = { method: METHOD.GET },
  ): Promise<TResponse> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;
      const query = isGet ? `${url}${queryStringify(data as Record<string, string | number>)}` : url;

      xhr.open(
        method,
        query,
      );

      xhr.withCredentials = true;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onerror = reject;
      xhr.onabort = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data as Document | XMLHttpRequestBodyInit);
      }
    });
  }
}

function queryStringify(data: Record<string, string | number> = {}) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  if (keys.length === 0) return '';
  return keys.reduce(
    (result, key, index) => `${result}${encodeURIComponent(key)}=${encodeURIComponent(String(data[key]))}${index < keys.length - 1 ? '&' : ''}`,
    '?',
  );
}
