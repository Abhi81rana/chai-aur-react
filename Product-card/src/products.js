const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1499,
    description: "High-quality wireless headphones with clear sound and comfortable ear cushions.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2499,
    description: "A stylish smartwatch with fitness tracking and notifications.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
  },
  {
    id: 3,
    name: "Sports Shoes",
    price: 1999,
    description: "Lightweight sports shoes designed for everyday comfort and walking.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
  },
  {
  id: 4,
  name: "Bluetooth Speaker",
  price: 1299,
  description: "Portable Bluetooth speaker with powerful bass and long battery life.",
  image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"
},
{
  id: 5,
  name: "Laptop Backpack",
  price: 899,
  description: "Durable backpack with a dedicated laptop compartment and multiple pockets.",
  image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
},
{
  id: 6,
  name: "Digital Camera",
  price: 5999,
  description: "Compact digital camera for capturing travel memories and everyday moments.",
  image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400"
},
{
  id: 7,
  name: "Sunglasses",
  price: 699,
  description: "Stylish sunglasses with a lightweight frame for everyday outdoor use.",
  image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400"
},
{
  id: 8,
  name: "Wrist Watch",
  price: 1799,
  description: "Classic wristwatch with a minimalist dial and an elegant design.",
  image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400"
},
{
  id: 9,
  name: "Gaming Mouse",
  price: 799,
  description: "Ergonomic gaming mouse with adjustable DPI, RGB lighting, and responsive buttons.",
  image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400"
},
{
  id: 10,
  name: "Mechanical Keyboard",
  price: 1899,
  description: "RGB mechanical keyboard with tactile keys and a durable design.",
  image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400"
},
{
  id: 11,
  name: "Wireless Mouse",
  price: 599,
  description: "Compact wireless mouse with smooth tracking and ergonomic design.",
  image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400"
},
{
  id: 12,
  name: "Laptop",
  price: 45999,
  description: "Powerful laptop suitable for programming, studying, and multitasking.",
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
},
{
  id: 13,
  name: "Tablet",
  price: 15944,
  description: "Lightweight tablet with a vibrant display for entertainment and productivity.",
  image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400"
},
{
  id: 14,
  name: "Smartphone",
  price: 18907,
  description: "Modern smartphone with a high-resolution camera and fast performance.",
  image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
},
{
  id: 15,
  name: "Coffee Maker",
  price: 2400,
  description: "Easy-to-use coffee maker for preparing fresh coffee at home.",
  image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"
},
{
  id: 16,
  name: "Travel Backpack",
  price: 120,
  description: "Spacious travel backpack with multiple compartments and durable fabric.",
  image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=400"
},
{
  id: 17,
  name: "Running Shoes",
  price: 219,
  description: "Comfortable running shoes with lightweight cushioning and flexible soles.",
  image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400"
},
{
  id: 18,
  name: "Leather Wallet",
  price: 49,
  description: "Classic wallet with multiple card slots and a compact design.",
  image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400"
},
{
  id: 19,
  name: "Water Bottle",
  price: 39,
  description: "Reusable stainless steel water bottle for everyday hydration.",
  image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400"
},
{
  id: 20,
  name: "Desk Lamp",
  price: 84,
  description: "Modern LED desk lamp providing comfortable lighting for studying.",
  image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400"
},
{
  id: 21,
  name: "Sofa Chair",
  price: 844,
  description: "Comfortable modern chair suitable for living rooms and reading spaces.",
  image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400"
},
{
  id: 22,
  name: "Digital Watch",
  price: 1297,
  description: "Digital wristwatch with a clear display and everyday timekeeping features.",
  image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400"
},
{
  id: 23,
  name: "Bluetooth Earbuds",
  price: 159,
  description: "Wireless earbuds with clear audio and a compact charging case.",
  image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400"
},
{
  id: 24,
  name: "DSLR Camera",
  price: 329,
  description: "Digital camera designed for photography enthusiasts and content creators.",
  image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400"
},
{
  id: 25,
  name: "Football",
  price: 79,
  description: "Durable football suitable for casual games and outdoor practice.",
  image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=400"
},
{
  id: 26,
  name: "Sunglasses",
  price: 99,
  description: "Modern sunglasses with a lightweight frame and stylish appearance.",
  image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400"
},
{
  id: 27,
  name: "Gaming Controller",
  price: 19,
  description: "Comfortable gaming controller with responsive buttons and ergonomic grips.",
  image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400"
},
{
  id: 28,
  name: "Wireless Headset",
  price: 99,
  description: "Over-ear wireless headset with comfortable padding and clear sound.",
  image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400"
},
{
  id: 29,
  name: "Home Plant",
  price: 29,
  description: "Decorative indoor plant that adds a natural touch to your workspace.",
  image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400"
},
{
  id: 30,
  name: "Portable Power Bank",
  price: 1199,
  description: "High-capacity portable power bank with fast charging support and a compact design.",
  image: "https://images.unsplash.com/photo-1609592806596-b43bada4e7c7?w=400"
}
];

export default products; 
  