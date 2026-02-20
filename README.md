# cf-devtools

Cloudflare Workers backend project.

This project runs entirely on Cloudflare Workers and integrates with services such as:

- R2 (Object Storage)
- D1 (SQL Database)
- KV (Key-Value Store)
- Durable Objects
- Queues
- Workers AI
- Analytics & Logs

---

# 🚀 Getting Started

## 1️⃣ Clone Repository

```bash
git clone https://github.com/thanakritneung171/cf-devtools.git
cd cf-devtools
npm install

Install Wrangler (if not installed)
npm install -g wrangler
wrangler --version

npx wrangler dev

generate types:
wrangler types


npx wrangler deploy
https://cf-devtools.<your-subdomain>.workers.dev

