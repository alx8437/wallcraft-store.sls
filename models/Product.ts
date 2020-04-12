export interface ProductBody {
  id: string;
  image: string;
  description: string;
  price: number;
  keywords: string[];
}

export class Product implements ProductBody {
  id: string;
  image: string;
  description: string;
  price: number;
  keywords: string[];
}
