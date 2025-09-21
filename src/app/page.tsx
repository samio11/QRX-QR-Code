"use client";

import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";

type Product = { id: string; name: string; category: string; price: number };
type CartItem = { id: string; name: string; price: number; quantity: number };

const SAMPLE_PRODUCTS: Product[] = [
  { id: "A-001", name: "iPhone 15", category: "Apple", price: 999 },
  { id: "A-002", name: "iPhone 15 Pro", category: "Apple", price: 1199 },
  { id: "A-003", name: "iPhone SE", category: "Apple", price: 399 },
  { id: "S-001", name: "Galaxy S23", category: "Samsung", price: 899 },
  { id: "S-002", name: "Galaxy A54", category: "Samsung", price: 349 },
  { id: "S-003", name: "Galaxy Tab S8", category: "Samsung", price: 699 },
  { id: "X-001", name: "Xiaomi 13", category: "Xiaomi", price: 749 },
  { id: "X-002", name: "Redmi Note 12", category: "Xiaomi", price: 199 },
  { id: "X-003", name: "Poco X6", category: "Xiaomi", price: 279 },
  { id: "X-004", name: "Mi Band 7", category: "Xiaomi", price: 49 },
];

export default function Page() {
  const [filter, setFilter] = useState<"All" | "Apple" | "Samsung" | "Xiaomi">(
    "All"
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [cart, setCart] = useState<CartItem[]>([]);

  const qrContainerRef = useRef<HTMLDivElement | null>(null);

  function filteredProducts() {
    if (filter === "All") return SAMPLE_PRODUCTS;
    return SAMPLE_PRODUCTS.filter((p) => p.category === filter);
  }

  function addToCart(p: Product) {
    setCart((prev) => {
      const existing = prev.find((x) => x.id === p.id);
      if (existing) {
        return prev.map((x) =>
          x.id === p.id ? { ...x, quantity: x.quantity + 1 } : x
        );
      }
      return [...prev, { id: p.id, name: p.name, price: p.price, quantity: 1 }];
    });
  }

  function updateQty(id: string, qty: number) {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  }

  function updatePrice(id: string, price: number) {
    if (price < 0) return;
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, price } : i)));
  }

  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  const total = cart.reduce((s, it) => s + it.price * it.quantity, 0);

  const payload = {
    user: { name: name || null, email: email || null, phone: phone || null },
    items: cart,
    total,
    generatedAt: new Date().toISOString(),
  };

  const jsonString = JSON.stringify(payload, null, 2);

  async function copyJSON() {
    try {
      await navigator.clipboard.writeText(jsonString);
      alert("JSON copied to clipboard");
    } catch (e) {
      alert("Copy failed: " + String(e));
    }
  }

  function downloadSVG() {
    const container = qrContainerRef.current;
    if (!container) return alert("No QR found");
    const svg = container.querySelector("svg");
    if (!svg) return alert("No SVG element found inside QR container");
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.svg";
    a.click();
    URL.revokeObjectURL(url);
  }

  function clearAll() {
    setName("");
    setEmail("");
    setPhone("");
    setCart([]);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
              Samio Shop
            </span>
            <span className="text-slate-700"> — Create QR from products</span>
          </h1>
          <div className="text-sm text-slate-600">QRX</div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: User Info */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Customer Info</h2>
            <div className="space-y-3">
              <label className="block">
                <div className="text-sm text-slate-600 mb-1">Name</div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </label>

              <label className="block">
                <div className="text-sm text-slate-600 mb-1">Email</div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </label>

              <label className="block">
                <div className="text-sm text-slate-600 mb-1">Phone</div>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </label>

              <div className="flex gap-2 pt-2">
                {/* If you use shadcn, swap <button> with <Button> from shadcn */}
                <button
                  onClick={() =>
                    alert(
                      "Tip: Add some products from the middle column then see QR update automatically"
                    )
                  }
                  className="px-4 py-2 rounded-md border bg-white text-sm"
                >
                  Help
                </button>
                <button
                  onClick={clearAll}
                  className="ml-auto px-4 py-2 rounded-md bg-red-50 text-red-600 border border-red-100 text-sm"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="mt-6 text-xs text-slate-500">
              Customer info + cart items are combined into JSON and used to
              generate the QR code.
            </div>
          </section>

          {/* MIDDLE: Products + Cart */}
          <section className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Products</h3>
                <div className="flex items-center gap-2">
                  {(["All", "Apple", "Samsung", "Xiaomi"] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setFilter(c)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        filter === c
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredProducts().map((p) => (
                  <div
                    key={p.id}
                    className="border rounded-lg p-3 hover:shadow-lg transition-shadow"
                  >
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-slate-500">
                      {p.category} • ID: {p.id}
                    </div>
                    <div className="mt-2 flex items-baseline justify-between">
                      <div className="text-lg font-semibold">${p.price}</div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => addToCart(p)}
                          className="px-3 py-1 rounded-md bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-sm shadow"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="font-semibold mb-3">Cart</h3>
              {cart.length === 0 ? (
                <div className="text-sm text-slate-500">
                  Cart is empty — add products to see them here.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left text-slate-600">
                      <tr>
                        <th className="pb-2">Product</th>
                        <th className="pb-2">ID</th>
                        <th className="pb-2">Qty</th>
                        <th className="pb-2">Price</th>
                        <th className="pb-2">Sub</th>
                        <th className="pb-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((it) => (
                        <tr key={it.id} className="border-t">
                          <td className="py-2">{it.name}</td>
                          <td className="py-2 text-xs text-slate-500">
                            {it.id}
                          </td>
                          <td className="py-2">
                            <input
                              type="number"
                              min={1}
                              value={it.quantity}
                              onChange={(e) =>
                                updateQty(
                                  it.id,
                                  parseInt(e.target.value || "1", 10)
                                )
                              }
                              className="w-20 rounded-md border px-2 py-1"
                            />
                          </td>
                          <td className="py-2">
                            <input
                              type="number"
                              min={0}
                              value={it.price}
                              onChange={(e) =>
                                updatePrice(
                                  it.id,
                                  parseFloat(e.target.value || "0")
                                )
                              }
                              className="w-28 rounded-md border px-2 py-1"
                            />
                          </td>
                          <td className="py-2 font-medium">
                            ${(it.price * it.quantity).toFixed(2)}
                          </td>
                          <td className="py-2">
                            <button
                              onClick={() => removeFromCart(it.id)}
                              className="text-sm text-red-600"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t">
                        <td
                          colSpan={4}
                          className="py-3 text-right font-semibold"
                        >
                          Total
                        </td>
                        <td className="py-3 font-bold">${total.toFixed(2)}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          {/* RIGHT: QR Preview */}
          <aside className="lg:col-span-1 rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">QR Preview</h3>
              <div className="text-xs text-slate-500">Live</div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div ref={qrContainerRef} className="bg-white p-3 rounded-md">
                {/* QRCode renders an SVG. We wrap it so we can query and download the SVG. */}
                <QRCode value={jsonString} size={180} />
              </div>

              <div className="w-full">
                <label className="text-xs text-slate-500">JSON data</label>
                <textarea
                  readOnly
                  rows={8}
                  value={jsonString}
                  className="w-full mt-1 rounded-md border p-2 text-xs font-mono"
                />
              </div>

              <div className="w-full flex gap-2">
                <button
                  onClick={copyJSON}
                  className="flex-1 px-3 py-2 rounded-md bg-slate-800 text-white text-sm"
                >
                  Copy JSON
                </button>
                <button
                  onClick={downloadSVG}
                  className="px-3 py-2 rounded-md bg-indigo-50 text-indigo-700 text-sm"
                >
                  Download SVG
                </button>
              </div>

              <div className="text-xs text-slate-500">
                QR encodes the JSON of customer + cart. Scan with any QR scanner
                to see the JSON.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
