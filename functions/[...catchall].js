// functions/[...catchall].js
export async function onRequest(context) {
  const { request, params } = context

  // Base URL backend
  const TARGET_BASE = 'https://yulafqmjwgmbqtdggtqt.supabase.co/functions/v1/'

  // Tangkap sisa path
  const path = params.catchall ? params.catchall : ''
  const url = new URL(request.url)
  const targetUrl = `${TARGET_BASE}${path}${url.search}`

  // Buat request baru dengan semua header, body, method
  const proxyRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers, // forward semua header asli
    body: request.body,
    redirect: 'manual',       // biar redirect diteruskan apa adanya
  })

  // Fetch ke backend
  let response = await fetch(proxyRequest)

  // Tangani redirect 3xx manual
  while (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('Location')
    if (!location) break

    const redirectedRequest = new Request(location, {
      method: request.method,
      headers: proxyRequest.headers,
      body: request.body,
      redirect: 'manual'
    })
    response = await fetch(redirectedRequest)
  }

  // Kembalikan response backend apa adanya
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  })
}
