
# QRX – Generate QR Codes from Product Orders

<img width="1920" height="1516" alt="QRX" src="https://github.com/user-attachments/assets/a92e560c-c326-4913-ad80-7a1b83716f07" />


**QRX** is a lightweight Next.js app that lets you build a product‑order JSON payload on the fly and instantly turn it into a QR code.  
Perfect for small shops, pop‑up stalls, or anyone who needs a quick way to share order data via QR.

---

## QRX – Live Link

https://qrx-qr-code.vercel.app

---

## ✨ Features

- **Live product catalog** with category filters (Apple, Samsung, Xiaomi).
- **Dynamic cart** – add, edit quantity, edit price, and remove items.
- **Customer info** form (name, email, phone) that merges with the cart.
- **Instant QR preview** that updates as you type.
- **Copy JSON** to clipboard with a single click.
- **Download SVG** of the QR code for printing or embedding.
- **Responsive UI** built with Tailwind CSS and shadcn/ui‑style components.
- **Zero‑config** – just clone, install, and run.

---

## 🚀 Getting Started

### Prerequisites

- Node.js **≥ 18**
- npm / yarn / pnpm / bun (any package manager you prefer)

### Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/samio11/QRX-QR-Code.git
cd QRX-QR-Code

# 2️⃣ Install dependencies
npm install          # or `yarn`, `pnpm install`, `bun install`

# 3️⃣ Run the development server
npm run dev          # or `yarn dev`, `pnpm dev`, `bun dev`
```

Open <http://localhost:3000> in your browser – the app will be up and running.

---


## 🛠️ How It Works

1. **Select a category** (or “All”) and click **Add** on any product.
2. The **Cart** on the right updates, showing quantity, price, and subtotal.
3. Fill in the **Customer Info** fields at the left.
4. The app builds a JSON payload like:

```json
{
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "01712345678"
  },
  "items": [
    { "id": "A-001", "name": "iPhone 15", "price": 999, "quantity": 2 },
    { "id": "X-004", "name": "Mi Band 7", "price": 49, "quantity": 1 }
  ],
  "total": 2047,
  "generatedAt": "2025-09-21T14:32:00.000Z"
}
```

5. That JSON is fed into **react‑qr‑code**, generating a live SVG QR image.
6. Use **Copy JSON** or **Download SVG** to share the data.

---

## 📦 Project Structure

```
.
├─ .gitignore
├─ README.md               ← (this file)
├─ components.json
├─ eslint.config.mjs
├─ next.config.ts
├─ package.json
├─ postcss.config.mjs
├─ public/
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ src/
│  ├─ app/
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx          ← main UI logic
│  ├─ components/
│  │  └─ ui/
│  │     └─ button.tsx
│  └─ lib/
│     └─ utils.ts
└─ tsconfig.json
```

---

## 🧩 Customization

- **Tailwind theme** – edit `src/app/globals.css` to adjust colors, spacing, or dark‑mode variables.
- **Product list** – replace `SAMPLE_PRODUCTS` in `src/app/page.tsx` with your own catalog.
- **QR size** – change the `size` prop on the `<QRCode />` component (line 328).

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repo.
2. Create a feature branch (`git checkout -b feat/awesome-feature`).
3. Commit your changes (`git commit -am 'Add awesome feature'`).
4. Push the branch (`git push origin feat/awesome-feature`).
5. Open a Pull Request.

Please follow the existing code style (Prettier + ESLint) and include tests when appropriate.

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](https://github.com/samio11/QRX-QR-Code/blob/main/LICENSE) file for details.

---

## 🙋‍♂️ Contact

Created by **Samio** – [GitHub](https://github.com/samio11) | [Twitter](https://twitter.com/samio11)

Enjoy QRX and happy coding! 🎉
`````
