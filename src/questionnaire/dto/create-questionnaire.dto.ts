export type CreateQuestionnaireDto = {
  name: string;
  image: string;
  quantity: number;
  endDate: string;
  link: string;
  exceedsQuantity: boolean;
  canBeOnline: boolean;
  deviceIds?: string[];
  applierIds?: string[];
};
