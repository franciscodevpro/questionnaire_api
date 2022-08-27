export type Question = {
  id: string;
  idQuestionnaire: string;
  title: string;
  variable: string;
  type: string;
  minAnswers: number;
  maxAnswers: number;
  defaultValue: string;
  shuffle: boolean;
  prioritizeBySelection: boolean;
};
