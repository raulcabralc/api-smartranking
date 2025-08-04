import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from "@nestjs/common";
import { FindOneById } from "../interfaces/find-by-id.interface";

export class PlayerParamValidationPipe implements PipeTransform {
  transform(value: FindOneById, metadata: ArgumentMetadata) {
    if (!metadata.type || !value) {
      throw new BadRequestException("Id should be informed in the params");
    }

    return value;
  }
}
