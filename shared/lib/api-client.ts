interface ApiRequestOptions extends RequestInit {
  logOnError?: boolean;
}

function generateHttpRequest(url: string, options: RequestInit): string {
  const method = options.method || 'GET';
  const headers = options.headers
    ? Object.entries(options.headers as Record<string, string>)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')
    : '';
  const body = options.body ? `\n\n${options.body}` : '';

  return `${method} ${url}\n${headers}${body}`;
}

export async function apiRequest(url: string, options: ApiRequestOptions = {}): Promise<Response> {
  const { logOnError = true, ...fetchOptions } = options;

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok && logOnError) {
      const httpRequest = generateHttpRequest(url, fetchOptions);
      console.error('=== API Request Failed - HTTP Request ===');
      console.error(httpRequest);
      console.error(`Status: ${response.status} ${response.statusText}`);
    }

    return response;
  } catch (error) {
    if (logOnError) {
      const httpRequest = generateHttpRequest(url, fetchOptions);
      console.error('=== API Request Error - HTTP Request ===');
      console.error(httpRequest);
      console.error('Error:', error);
    }
    throw error;
  }
}
