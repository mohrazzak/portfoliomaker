import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated';
import { IDynamicObject } from 'src/shared';

interface ImageObject {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

@Injectable()
export class FilesValidation
  implements PipeTransform<IDynamicObject, IDynamicObject | undefined>
{
  constructor(private readonly config: { name: string; required: boolean }[]) {}

  transform(files: IDynamicObject, _: ArgumentMetadata) {
    const filesArray = Object.values(files)[0];
    const i18n = I18nContext.current<I18nTranslations>()!;

    this.config.forEach((fileConfig) => {
      if (fileConfig.required) {
        const foundFile =
          filesArray?.find(
            (passedFile: ImageObject) =>
              passedFile.fieldname === fileConfig.name,
          ) ?? null;

        const errorMessage = i18n.t('validation.errors.fileIsRequired', {
          args: { fileName: fileConfig.name },
        });
        if (!foundFile) throw new BadRequestException(errorMessage);
      }
    });

    return files;
  }
}
