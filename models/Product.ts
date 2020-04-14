export interface ProductBody {
  id: number;
  image: string;
  description: string;
  price: number;
  keywords: string[];
}

export class Product implements ProductBody {
  id: number;
  image: string;
  description: string;
  price: number;
  keywords: string[];
}
