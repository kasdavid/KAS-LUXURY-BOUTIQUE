// ================================================
// KAS LUXURY BOUTIQUE
// PRODUCT DATA AND SHOPPING FUNCTIONALITY
// ================================================

// 1. PRODUCT COLLECTION
// These are demonstration products and prices.
// Replace them with your actual products and prices.

const boutiqueProducts = [


{
    id: 1,
    name: "Premium Men's T-Shirt",
    category: "Men",
    price: 350,
    oldPrice: 450,
    badge: "BEST SELLER",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&auto=format&fit=crop"
},

{
    id: 2,
    name: "Elegant Women's Dress",
    category: "Women",
    price: 650,
    oldPrice: 800,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&auto=format&fit=crop"
},

{
    id: 3,
    name: "Luxury Men's Sneakers",
    category: "Shoes",
    price: 850,
    oldPrice: 1000,
    badge: "POPULAR",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop"
},

{
    id: 4,
    name: "Designer Women's Handbag",
    category: "Accessories",
    price: 550,
    oldPrice: 700,
    badge: "TRENDING",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&auto=format&fit=crop"
},

{
    id: 5,
    name: "Classic Men's ",
    category: "Men",
    price: 480,
    oldPrice: 600,
    badge: "NEW",
    image: "images/card9.jpg.jpeg"
},

{
    id: 6,
    name: "Women's Luxury Outfit",
    category: "Women",
    price: 750,
    oldPrice: 900,
    badge: "EXCLUSIVE",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&auto=format&fit=crop"
},

{
    id: 7,
    name: "Premium Men's Watch",
    category: "Accessories",
    price: 950,
    oldPrice: 1200,
    badge: "LIMITED",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop"
},

{
    id: 8,
    name: "Luxury Women's Heels",
    category: "Shoes",
    price: 680,
    oldPrice: 850,
    badge: "POPULAR",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700&auto=format&fit=crop"
}


];

// 2. MAKE PRODUCTS AVAILABLE TO OTHER SCRIPTS

window.boutiqueProducts = boutiqueProducts;

// 3. GET SAVED CART AND WISHLIST

function getCart() {
return JSON.parse(localStorage.getItem("kasBoutiqueCart")) || [];
}

function getWishlist() {
return JSON.parse(localStorage.getItem("kasBoutiqueWishlist")) || [];
}

// 4. SAVE CART AND WISHLIST

function saveCart(cart) {
localStorage.setItem("kasBoutiqueCart", JSON.stringify(cart));
}

function saveWishlist(wishlist) {
localStorage.setItem("kasBoutiqueWishlist", JSON.stringify(wishlist));
}

// 5. FORMAT PRICE IN ZAMBIAN KWACHA

function formatPrice(price) {
return "K" + Number(price).toLocaleString("en-ZM");
}

// 6. DISPLAY PRODUCTS

function displayProducts() {


const productContainer = document.getElementById("featuredProducts");

if (!productContainer) {
    console.warn("Featured products container was not found.");
    return;
}

productContainer.innerHTML = boutiqueProducts.map(product => {

    const wishlist = getWishlist();

    const isFavourite = wishlist.includes(product.id);

    return `

        <article class="product-card">

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <span class="product-badge">
                    ${product.badge}
                </span>

                <button
                    class="wishlist-btn ${isFavourite ? "active" : ""}"
                    onclick="toggleWishlist(${product.id})"
                    aria-label="Add ${product.name} to wishlist"
                >
                    <i class="${isFavourite ? "fas" : "far"} fa-heart"></i>
                </button>

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <div class="product-price">

                    <span class="current-price">
                        ${formatPrice(product.price)}
                    </span>

                    <span class="old-price">
                        ${formatPrice(product.oldPrice)}
                    </span>

                </div>

                <button
                    class="add-to-cart-btn"
                    onclick="addToCart(${product.id})"
                >
                    <i class="fas fa-shopping-bag"></i>
                    Add to Cart
                </button>

            </div>

        </article>

    `;

}).join("");


}

// 7. ADD PRODUCT TO CART

function addToCart(productId, quantity = 1, size = "") {

    const product = boutiqueProducts.find(item =>
        String(item.id) === String(productId)
    );

    if (!product) {
        alert("Product not found.");
        return;
    }

    let cart = getCart();

    const existingItem = cart.find(item =>
        String(item.id) === String(productId) &&
        String(item.size || "") === String(size || "")
    );

    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            size: size,
            quantity: quantity
        });

    }

    saveCart(cart);

    updateShoppingCounters();

    if (typeof window.showNotification === "function") {
        window.showNotification("Product added to your shopping bag!");
    } else {
        alert("Product added to your shopping bag!");
    }

}



// 8. ADD OR REMOVE FROM WISHLIST

function toggleWishlist(productId) {


let wishlist = getWishlist();

if (wishlist.includes(productId)) {

    wishlist = wishlist.filter(id => id !== productId);

} else {

    wishlist.push(productId);

}

saveWishlist(wishlist);

displayProducts();

updateShoppingCounters();


}

// 9. UPDATE CART AND WISHLIST COUNTERS

function updateShoppingCounters() {


const cartCount = document.getElementById("cartCount");

const wishlistCount = document.getElementById("wishlistCount");

const cart = getCart();

const wishlist = getWishlist();

const totalCartItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
);

if (cartCount) {
    cartCount.textContent = totalCartItems;
}

if (wishlistCount) {
    wishlistCount.textContent = wishlist.length;
}


}

// 10. START PRODUCT SYSTEM

document.addEventListener("DOMContentLoaded", () => {


displayProducts();

updateShoppingCounters();

console.log("KAS LUXURY BOUTIQUE products loaded successfully!");


});
