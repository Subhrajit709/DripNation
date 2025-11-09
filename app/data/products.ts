export interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  rating: number
  reviews: number
  description: string
  inStock: boolean
  sizes?: string[]
  colors?: string[]
  sustainabilityScore: number
}

export const products: Product[] = [
  {
    id: 1,
    name: "Cyber Hoodie Pro",
    price: 89.99,
    category: "hoodies",
    image: "/public/futuristic-cyber-hoodie-neon.jpg",
    rating: 4.8,
    reviews: 342,
    description: "Ultimate futuristic hoodie with embedded tech details and neon accents",
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Neon Cyan", "Midnight Black", "Tech Purple"],
    sustainabilityScore: 8.5,
  },
  {
    id: 2,
    name: "Neon Graphic Tee",
    price: 34.99,
    category: "tees",
    image: "/public/neon-graphic-t-shirt-streetwear.jpg",
    rating: 4.6,
    reviews: 256,
    description: "Premium streetwear tee with vibrant neon graphics",
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Neon Pink"],
    sustainabilityScore: 7.2,
  },
  {
    id: 3,
    name: "Tech Pants Elite",
    price: 79.99,
    category: "pants",
    image: "/public/futuristic-tech-pants.jpg",
    rating: 4.7,
    reviews: 189,
    description: "Sleek tech pants with utility pockets and futuristic design",
    inStock: true,
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Black", "Dark Gray", "Tech Blue"],
    sustainabilityScore: 8.1,
  },
  {
    id: 4,
    name: "Glow Sneakers X",
    price: 129.99,
    category: "shoes",
    image: "/public/glowing-neon-sneakers.jpg",
    rating: 4.9,
    reviews: 428,
    description: "Limited edition sneakers with glowing soles and premium materials",
    inStock: true,
    sizes: ["5", "6", "7", "8", "9", "10", "11", "12", "13"],
    colors: ["Neon Cyan", "Magenta Dream", "Orange Fire"],
    sustainabilityScore: 7.8,
  },
  {
    id: 5,
    name: "Neon Beanie Premium",
    price: 24.99,
    category: "accessories",
    image: "/neon-beanie-streetwear.jpg",
    rating: 4.5,
    reviews: 167,
    description: "Reflective neon beanie perfect for the urban explorer",
    inStock: true,
    sustainabilityScore: 6.9,
  },
  {
    id: 6,
    name: "Cyber Jacket Limited",
    price: 149.99,
    category: "limited",
    image: "/cyber-futuristic-jacket.jpg",
    rating: 4.9,
    reviews: 512,
    description: "Limited edition cyber jacket with holographic details",
    inStock: true,
    sustainabilityScore: 8.7,
  },
  {
    id: 7,
    name: "Tech Cargo Vest",
    price: 64.99,
    category: "accessories",
    image: "/tech-cargo-vest.jpg",
    rating: 4.4,
    reviews: 98,
    description: "Multi-pocket tech vest for the urban adventurer",
    inStock: true,
    sustainabilityScore: 7.5,
  },
  {
    id: 8,
    name: "Hologram Shirt Ultra",
    price: 59.99,
    category: "tees",
    image: "/hologram-shirt.jpg",
    rating: 4.7,
    reviews: 234,
    description: "Premium holographic shirt with interactive design",
    inStock: true,
    sustainabilityScore: 8.0,
  },
]
