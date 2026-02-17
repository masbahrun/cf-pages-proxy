# Cloudflare Pages Root Proxy

Proxy ini menggunakan **Cloudflare Pages Function** untuk meneruskan semua request dari **root domain Pages** ke backend tertentu.  

Semua method, header, body, query, dan redirect diteruskan **apa adanya**, sehingga Pages bertindak sebagai **reverse proxy** penuh.

---

## 🔹 Fitur

- Catch-all route: semua path `/` atau `/foo/bar` otomatis diteruskan.  
- Semua method HTTP (GET, POST, PUT, DELETE, dll.) diteruskan.  
- Semua header dari client diteruskan.  
- Body request & query string diteruskan.  
- Redirect 3xx dari backend diteruskan ke client.  
- Prefix backend otomatis: `/function/v1/`.

---

## 🔹 Contoh Mapping

| Pages URL                         | Target Backend URL                           |
|----------------------------------|---------------------------------------------|
| `/getLink`                        | `https://target-domain.com/function/v1/getLink` |
| `/foo/bar`                        | `https://target-domain.com/function/v1/foo/bar` |
| `/`                               | `https://target-domain.com/function/v1/`    |

---

## 🔹 Struktur Project



---

## 🔹 Cara Deploy

1. Push repository ke GitHub.  
2. Di dashboard Cloudflare → **Pages → Create Project → Connect GitHub Repo**.  
3. Pilih branch utama → klik **Start Build & Deploy**.  
4. Setelah deploy selesai, root domain Pages (`https://<project>.pages.dev/*`) otomatis menjadi proxy ke backend `https://target-domain.com/function/v1/`.

---

## 🔹 Testing

```bash
# GET request
curl -i https://<project>.pages.dev/getLink

# POST request dengan header dan body
curl -i -X POST https://<project>.pages.dev/api/test \
  -H "Authorization: Bearer token123" \
  -H "Content-Type: application/json" \
  -d '{"name":"test"}'
