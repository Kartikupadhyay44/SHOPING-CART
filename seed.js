const mongoose = require('mongoose');
const Item = require('./models/items')


const sampleItems = [
  {
    name: "Minimalist Leather Backpack",
    price: 89.99,
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=60",
    desc: "Sleek, durable, and water-resistant leather backpack perfect for daily commutes and tech gear.",
    reviews: ["65c1f2b4e4b0a1a2c3d4e5f6", "65c1f2b4e4b0a1a2c3d4e5f7"]
  },
  {
    name: "Wireless Noise-Canceling Headphones",
    price: 199.50,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60",
    desc: "Immersive sound quality with advanced active noise cancellation and a 30-hour battery life.",
    reviews: ["65c1f2b4e4b0a1a2c3d4e5f8"]
  },
  {
    name: "Ergonomic Mechanical Keyboard",
    price: 129.00,
    img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=60",
    desc: "Tactile mechanical switches with customizable RGB backlighting designed for comfortable typing.",
    reviews: []
  },
  {
    name: "Stainless Steel Smart Water Bottle",
    price: 45.00,
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=60",
    desc: "Vacuum-insulated bottle that tracks your hydration and sanitizes itself with built-in UV light.",
    reviews: ["65c1f2b4e4b0a1a2c3d4e5f9", "65c1f2b4e4b0a1a2c3d4e5fa"]
  },
  {
    name: "Minimalist Ceramic Coffee Mug",
    price: 24.99,
    img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=60",
    desc: "Handcrafted matte ceramic mug designed to retain heat and fit perfectly in your hands.",
    reviews: ["65c1f2b4e4b0a1a2c3d4e5fb"]
  },
  {
    name: "Portable Bluetooth Speaker",
    price: 59.95,
    img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=60",
    desc: "Compact, IPX7 waterproof speaker delivering punchy bass and 360-degree crystal clear sound.",
    reviews: ["65c1f2b4e4b0a1a2c3d4e5fc", "65c1f2b4e4b0a1a2c3d4e5fd"]
  },
  {
    name: "Automatic Espresso Machine",
    price: 549.99,
    img: "https://images.unsplash.com/photo-1517914302061-077ff0a5b28d?w=600&auto=format&fit=crop&q=60",
    desc: "Bring the café home with a built-in grinder, milk frother, and programmable brewing options.",
    reviews: []
  },
  {
    name: "Running Shoes - Aero Pace",
    price: 115.00,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60",
    desc: "Lightweight, breathable mesh running shoes with responsive cushioning for maximum energy return.",
    reviews: ["65c1f2b4e4b0a1a2c3d4e5fe"]
  },
  {
    name: "Smart Fitness Watch",
    price: 179.99,
    img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop&q=60",
    desc: "Tracks heart rate, sleep cycles, and daily steps with a vibrant AMOLED display and GPS tracking.",
    reviews: ["65c1f2b4e4b0a1a2c3d4e5ff", "65c1f2b4e4b0a1a2c3d4e600"]
  },
  {
    name: "Soy Wax Scented Candle",
    price: 18.50,
    img: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=60",
    desc: "Eco-friendly soy candle infused with natural lavender and eucalyptus essential oils.",
    reviews: ["65c1f2b4e4b0a1a2c3d4e601"]
  }
];


async function seed() {
    await Item.insertMany(sampleItems);
    console.log("data has been seeded or added")
}

module.exports=seed;