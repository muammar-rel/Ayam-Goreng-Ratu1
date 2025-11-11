// Data Produk
const products = [
  {
    id: 1,
    name: "Ayam Kampung Segar",
    price: 85000,
    unit: "kg",
    icon: "🐓",
    desc: "Ayam kampung pilihan, segar setiap hari",
  },
  {
    id: 2,
    name: "Ayam Broiler Premium",
    price: 45000,
    unit: "kg",
    icon: "🍗",
    desc: "Ayam broiler kualitas premium",
  },
  {
    id: 3,
    name: "Ayam Fillet Dada",
    price: 65000,
    unit: "kg",
    icon: "🥩",
    desc: "Daging dada ayam tanpa tulang",
  },
  {
    id: 4,
    name: "Ayam Potong Utuh",
    price: 40000,
    unit: "ekor",
    icon: "🐔",
    desc: "Ayam utuh sudah dipotong bersih",
  },
  {
    id: 5,
    name: "Ayam Organik",
    price: 95000,
    unit: "kg",
    icon: "🌿",
    desc: "Ayam organik bebas antibiotik",
  },
  {
    id: 6,
    name: "Paha Ayam",
    price: 55000,
    unit: "kg",
    icon: "🍖",
    desc: "Paha ayam pilihan berkualitas",
  },
  {
    id: 7,
    name: "Sayap Ayam",
    price: 50000,
    unit: "kg",
    icon: "🍗",
    desc: "Sayap ayam segar untuk berbagai menu",
  },
  {
    id: 8,
    name: "Ceker Ayam",
    price: 35000,
    unit: "kg",
    icon: "🦶",
    desc: "Ceker ayam bersih siap masak",
  },
];

// State
let cart = [];

// Format Rupiah
function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}

// Render Products
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <div class="product-image">
                <span class="product-icon">${product.icon}</span>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="product-price-section">
                    <div>
                        <span class="product-price">${formatRupiah(
                          product.price
                        )}</span>
                        <span class="product-unit">/${product.unit}</span>
                    </div>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${
                  product.id
                })">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Tambah</span>
                </button>
            </div>
        </div>
    `
    )
    .join("");
}

// Add to Cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartCount();
  showNotification("Produk ditambahkan ke keranjang");
}

// Update Cart Count
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countElement = document.getElementById("cartCount");

  if (count > 0) {
    countElement.textContent = count;
    countElement.classList.remove("hidden");
  } else {
    countElement.classList.add("hidden");
  }
}

// Render Cart
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartFooter = document.getElementById("cartFooter");

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
                <span class="empty-icon">🛒</span>
                <p>Keranjang masih kosong</p>
            </div>
        `;
    cartFooter.classList.add("hidden");
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <span class="cart-item-icon">${item.icon}</span>
                    <div>
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${formatRupiah(
                          item.price
                        )}/${item.unit}</div>
                    </div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${
                      item.id
                    }, -1)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${
                      item.id
                    }, 1)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                    <button class="remove-btn" onclick="removeFromCart(${
                      item.id
                    })">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `
      )
      .join("");

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    document.getElementById("totalPrice").textContent = formatRupiah(total);
    cartFooter.classList.remove("hidden");
  }
}

// Update Quantity
function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter((item) => item.id !== productId);
    }
  }
  updateCartCount();
  renderCart();
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartCount();
  renderCart();
}

// Show Cart Modal
document.getElementById("cartBtn").addEventListener("click", () => {
  renderCart();
  document.getElementById("cartModal").classList.remove("hidden");
});

// Close Cart Modal
document.getElementById("closeCart").addEventListener("click", () => {
  document.getElementById("cartModal").classList.add("hidden");
});

// Show Checkout Modal
document.getElementById("checkoutBtn").addEventListener("click", () => {
  document.getElementById("cartModal").classList.add("hidden");
  renderOrderSummary();
  document.getElementById("checkoutModal").classList.remove("hidden");
});

// Close Checkout Modal
document.getElementById("closeCheckout").addEventListener("click", () => {
  document.getElementById("checkoutModal").classList.add("hidden");
});

// Render Order Summary
function renderOrderSummary() {
  const summary = document.getElementById("orderSummary");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  summary.innerHTML = cart
    .map(
      (item) => `
        <div class="summary-item">
            <span>${item.name} x${item.quantity}</span>
            <span>${formatRupiah(item.price * item.quantity)}</span>
        </div>
    `
    )
    .join("");

  document.getElementById("summaryTotal").textContent = formatRupiah(total);
}

// Handle WhatsApp Order
document.getElementById("whatsappBtn").addEventListener("click", async () => {
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const notes = document.getElementById("customerNotes").value.trim();

  if (!name || !phone || !address) {
    alert("Mohon lengkapi data Anda");
    return;
  }

  const btn = document.getElementById("whatsappBtn");
  btn.disabled = true;
  btn.innerHTML = "<span>Memproses...</span>";

  // Data untuk Google Sheets
  const orderData = {
    timestamp: new Date().toLocaleString("id-ID"),
    name: name,
    phone: phone,
    address: address,
    notes: notes,
    items: cart
      .map((item) => `${item.name} (${item.quantity} ${item.unit})`)
      .join(", "),
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };

  // Kirim ke Google Sheets (Ganti URL dengan Apps Script Anda)
  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbyvu3qsWPi4U_e-QA2rnB-QoTG-42KOm8n5oQ3yop3p_ql32QaRj4zQF4bZeyC-8bR-Yw/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      }
    );
  } catch (error) {
    console.log("Data akan dikirim ke spreadsheet");
  }

  // Buat pesan WhatsApp
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemsList = cart
    .map(
      (item) =>
        `- ${item.name}: ${item.quantity} ${item.unit} (${formatRupiah(
          item.price * item.quantity
        )})`
    )
    .join("%0A");

  const message = `*PESANAN BARU*%0A%0A*Nama:* ${name}%0A*Telepon:* ${phone}%0A*Alamat:* ${address}%0A${
    notes ? `*Catatan:* ${notes}%0A` : ""
  }%0A*Pesanan:*%0A${itemsList}%0A%0A*Total: ${formatRupiah(total)}*`;

  // Ganti dengan nomor WhatsApp Anda (format: 62xxx tanpa tanda +)
  const waNumber = "6285190664412";
  window.open(`https://wa.me/${waNumber}?text=${message}`, "_blank");

  // Show success modal
  document.getElementById("checkoutModal").classList.add("hidden");
  document.getElementById("successModal").classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("successModal").classList.add("hidden");
    cart = [];
    updateCartCount();
    document.getElementById("checkoutForm").reset();
    btn.disabled = false;
    btn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>Pesan via WhatsApp</span>
        `;
  }, 2000);
});

// Show Notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(90deg, #16a34a 0%, #15803d 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Close modals when clicking outside
document.getElementById("cartModal").addEventListener("click", (e) => {
  if (e.target.id === "cartModal") {
    document.getElementById("cartModal").classList.add("hidden");
  }
});

document.getElementById("checkoutModal").addEventListener("click", (e) => {
  if (e.target.id === "checkoutModal") {
    document.getElementById("checkoutModal").classList.add("hidden");
  }
});

// Initialize
renderProducts();
