import { Applier } from 'src/applier/entities/applier.entity';
import { Device } from 'src/device/entities/device.entity';

export type Questionnaire = {
  id: string;
  name: string;
  image: string;
  quantity: number;
  andDate: string;
  link: string;
  exceedsQuantity: boolean;
  canBeOnline: boolean;
  isActive: boolean;
  device: Device[];
  appliers: Applier[];
};
