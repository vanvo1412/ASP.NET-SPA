export interface Product {
  productId: number;
  name: string;
  productNumber: string;
  color: string;
  standardCost: number;
  listPrice: number;
  size: string;
  weight: number;
  productCategoryId: number;
  productModelId: number;
  sellStartDate: Date;
  sellEndDate: Date;
  discontinuedDate: Date;
  thumbNailPhoto: string;
}
