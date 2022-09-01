import { YardSaleStore } from "../redux/store";

export interface ImageResponse {
  success: boolean;
  url?: string;
}

type ProductImageMap = {
  [productId: string]: string;
};
