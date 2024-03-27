export interface EmailOptions {
  receiverEmail: string;
  subject: string;
  htmlContent: string;
  toBeReplacedTextArray?: string[];
  replacementTextArray?: string[];
}
