export interface IContract {
  showContract: boolean;
  contractType: number;
  totalPrice: number;
  issueDate: string;
  expirationDate: string;
  downAmount: number;
  assigned: boolean;
  contractAttachment: File | null;
}
