export interface MarketItem {
  tokenId: number;
  seller: string;
  owner: string;
  price: number;
  sold: boolean;
  image?: string;
  title?: string;
  description?: string;
}
