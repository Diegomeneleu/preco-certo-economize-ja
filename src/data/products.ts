
import { Product } from "../contexts/ShoppingContext";

export const products: Product[] = [
  {
    id: "p1",
    name: "Arroz Branco",
    categories: ["grãos", "básicos"],
    image: "/placeholder.svg",
  },
  {
    id: "p2",
    name: "Feijão Carioca",
    categories: ["grãos", "básicos"],
    image: "/placeholder.svg",
  },
  {
    id: "p3",
    name: "Óleo de Soja",
    categories: ["óleos", "básicos"],
    image: "/placeholder.svg",
  },
  {
    id: "p4",
    name: "Açúcar Refinado",
    categories: ["básicos", "doces"],
    image: "/placeholder.svg",
  },
  {
    id: "p5",
    name: "Café em Pó",
    categories: ["bebidas", "básicos"],
    image: "/placeholder.svg",
  },
  {
    id: "p6",
    name: "Leite Integral",
    categories: ["laticínios", "bebidas"],
    image: "/placeholder.svg",
  },
  {
    id: "p7",
    name: "Pão de Forma",
    categories: ["padaria", "básicos"],
    image: "/placeholder.svg",
  },
  {
    id: "p8",
    name: "Sal Refinado",
    categories: ["temperos", "básicos"],
    image: "/placeholder.svg",
  },
  {
    id: "p9",
    name: "Macarrão Espaguete",
    categories: ["massas", "básicos"],
    image: "/placeholder.svg",
  },
  {
    id: "p10",
    name: "Farinha de Trigo",
    categories: ["farináceos", "básicos"],
    image: "/placeholder.svg",
  },
  {
    id: "p11",
    name: "Sabonete",
    categories: ["higiene", "limpeza"],
    image: "/placeholder.svg",
  },
  {
    id: "p12",
    name: "Papel Higiênico",
    categories: ["higiene", "limpeza"],
    image: "/placeholder.svg",
  },
];

export function searchProducts(query: string): Product[] {
  if (!query) return products;
  
  const lowercaseQuery = query.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.categories.some(category => category.toLowerCase().includes(lowercaseQuery))
  );
}
