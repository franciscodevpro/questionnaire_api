import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  diskStorageConfiguration,
  generateFileName,
} from '../util/file-upload.utils';

@Controller('api/upload')
export class AudioUploadController {
  @Post('audio')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage(diskStorageConfiguration()),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const { mimetype, filename, size } = file;
    return { mimetype, filename, path: `/uploads/${filename}`, size };
  }
}
