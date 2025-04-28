
import { Product } from "../contexts/ShoppingContext";

export const products: Product[] = [
  {
    id: "p1",
    name: "Arroz Branco",
    categories: ["grãos", "básicos"],
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
  },
  {
    id: "p2",
    name: "Feijão Carioca",
    categories: ["grãos", "básicos"],
    image: "https://images.unsplash.com/photo-1663610685601-3cc24331f77c?w=300&h=300&fit=crop",
  },
  {
    id: "p3",
    name: "Óleo de Soja",
    categories: ["óleos", "básicos"],
    image: "https://images.unsplash.com/photo-1620705444122-af64b3e56f79?w=300&h=300&fit=crop",
  },
  {
    id: "p4",
    name: "Açúcar Refinado",
    categories: ["básicos", "doces"],
    image: "https://images.unsplash.com/photo-1621685692205-1c648035acb2?w=300&h=300&fit=crop",
  },
  {
    id: "p5",
    name: "Café em Pó",
    categories: ["bebidas", "básicos"],
    image: "https://images.unsplash.com/photo-1611854778863-0702d0ef6b3b?w=300&h=300&fit=crop",
  },
  {
    id: "p6",
    name: "Leite Integral",
    categories: ["laticínios", "bebidas"],
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=300&fit=crop",
  },
  {
    id: "p7",
    name: "Pão de Forma",
    categories: ["padaria", "básicos"],
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&h=300&fit=crop",
  },
  {
    id: "p8",
    name: "Sal Refinado",
    categories: ["temperos", "básicos"],
    image: "https://images.unsplash.com/photo-1589275776107-7e406c147766?w=300&h=300&fit=crop",
  },
  {
    id: "p9",
    name: "Macarrão Espaguete",
    categories: ["massas", "básicos"],
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=300&fit=crop",
  },
  {
    id: "p10",
    name: "Farinha de Trigo",
    categories: ["farináceos", "básicos"],
    image: "https://images.unsplash.com/photo-1562244950-8462ca9d8289?w=300&h=300&fit=crop",
  },
  {
    id: "p11",
    name: "Sabonete",
    categories: ["higiene", "limpeza"],
    image: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=300&h=300&fit=crop",
  },
  {
    id: "p12",
    name: "Papel Higiênico",
    categories: ["higiene", "limpeza"],
    image: "https://images.unsplash.com/photo-1583251633146-d0c6c036187d?w=300&h=300&fit=crop",
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
