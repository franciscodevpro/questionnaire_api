export type CreateAnswerDto = {
  idQuestionnaireData?: string;
  idQuestion: string;
  idAnswerOption: string;
  value: string;
  duration: number;
  createdAt: string;
};
