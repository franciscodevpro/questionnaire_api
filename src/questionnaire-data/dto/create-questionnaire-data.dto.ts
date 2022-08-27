export type CreateQuestionnaireDataDto = {
  idQuestionnaire?: string;
  idApplier: string;
  idDevice: string;
  audioPath: string;
  lat: string;
  lon: string;
  duration: number;
};
