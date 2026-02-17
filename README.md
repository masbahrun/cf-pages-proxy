Cloudflare Pages Root Proxy

Proxy ini menggunakan Cloudflare Pages Function untuk meneruskan semua request dari root domain Pages ke backend tertentu.
Semua method, header, body, query, dan redirect diteruskan apa adanya, sehingga Pages bertindak sebagai reverse proxy penuh.

Fitur

Catch-all route: semua path / atau /foo/bar otomatis diteruskan.

Semua method HTTP (GET, POST, PUT, DELETE, dll.) diteruskan.

Semua header dari client diteruskan.

Body request & query string diteruskan.

Redirect 3xx dari backend diteruskan ke client.

Prefix backend otomatis: /function/v1/.

Contoh Mapping

Pages URL -> Target Backend URL
/getLink -> https://target-domain.com/function/v1/getLink

/foo/bar -> https://target-domain.com/function/v1/foo/bar

/ -> https://target-domain.com/function/v1/

Struktur Project

cloudflare-pages-proxy/
├─ functions/
│ └─ [...catchall].js <-- Catch-all proxy function
├─ package.json <-- Opsional
└─ README.md <-- Dokumen ini

Cara Deploy

Push repository ke GitHub.

Di dashboard Cloudflare → Pages → Create Project → Connect GitHub Repo.

Pilih branch utama → klik Start Build & Deploy.

Setelah deploy selesai, root domain Pages (https://<project>.pages.dev/*) otomatis menjadi proxy ke backend https://target-domain.com/function/v1/
.

Testing

Contoh GET request:
curl -i https://<project>.pages.dev/getLink

Contoh POST request dengan header dan body:
curl -i -X POST https://<project>.pages.dev/api/test -H "Authorization: Bearer token123" -H "Content-Type: application/json" -d '{"name":"test"}'

Semua header, method, body, query diteruskan ke backend.

Response backend dikembalikan apa adanya, termasuk redirect.

Kustomisasi

TARGET_BASE: ubah di functions/[...catchall].js sesuai domain backend:
const TARGET_BASE = 'https://target-domain.com/function/v1/
'

Bisa digunakan untuk API internal atau publik, tergantung kebutuhan.

Catatan

Pastikan backend siap menerima header, method, dan path apa saja.

Redirect 3xx diteruskan agar client menerima lokasi baru.

Jika ingin menambahkan header khusus (misal X-Api-Key), bisa set di file [...catchall].js.

Repository ini siap deploy root domain Cloudflare Pages sebagai proxy murni.