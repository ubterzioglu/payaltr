export type Property = {
  id: string;
  title: string;
  location: string;
  image_url: string;
  price_per_share: number;
  total_shares: number;
  sold_shares: number;
  annual_yield_percent: number;
  status: "active" | "sold_out" | "archived";
};

export type Investment = {
  id: string;
  user_id: string;
  property_id: string;
  shares: number;
  amount: number;
  created_at: string;
};

export function availableShares(property: Property): number {
  return Math.max(0, property.total_shares - property.sold_shares);
}

export function fundingPercent(property: Property): number {
  if (property.total_shares === 0) return 0;
  return Math.round((property.sold_shares / property.total_shares) * 100);
}
