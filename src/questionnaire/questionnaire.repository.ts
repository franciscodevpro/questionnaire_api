import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';

@Injectable()
export class QuestionnaireRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateQuestionnaireDto) {
    const {
      name,
      image,
      quantity,
      endDate,
      link,
      exceedsQuantity,
      canBeOnline,
      deviceIds,
      applierIds,
    } = data;
    let devices: { connect: { id: string }[] },
      appliers: { connect: { id: string }[] };
    if (!!deviceIds)
      devices = {
        connect: deviceIds.map((elm) => ({
          id: elm,
        })),
      };
    if (!!applierIds)
      appliers = {
        connect: applierIds.map((elm) => ({
          id: elm,
        })),
      };

    await this.prisma.questionnaire.create({
      data: {
        name,
        image,
        quantity,
        endDate,
        link,
        exceedsQuantity,
        canBeOnline,
        isActive: true,
        devices,
        appliers,
      },
    });
  }

  async findAll(applierId?: string) {
    return this.prisma.questionnaire.findMany({
      where: { isActive: true, ...(!!applierId) && { appliers: { some: {id: applierId} } }  },
      include: { appliers: true, devices: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.questionnaire.findFirstOrThrow({
      where: { id },
      include: { appliers: true, devices: true },
    });
  }

  async update(id: string, data: UpdateQuestionnaireDto) {
    await this.prisma.questionnaire.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.prisma.questionnaire.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
