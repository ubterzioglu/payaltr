export type WalletTransactionType = "deposit" | "investment" | "rental_income" | "withdrawal";

export type WalletTransaction = {
  id: string;
  user_id: string;
  type: WalletTransactionType;
  amount: number;
  description: string;
  created_at: string;
};

export type Wallet = {
  user_id: string;
  balance: number;
  updated_at: string;
};

export const TRANSACTION_LABELS: Record<WalletTransactionType, string> = {
  deposit: "Bakiye Yükleme",
  investment: "Yatırım",
  rental_income: "Kira Geliri",
  withdrawal: "Para Çekme",
};
