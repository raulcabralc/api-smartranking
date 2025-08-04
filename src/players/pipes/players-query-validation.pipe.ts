import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from "@nestjs/common";
import { FindOne } from "../interfaces/find-one.interface";

export class PlayerQueryValidationPipe implements PipeTransform {
  transform(values: FindOne, metadata: ArgumentMetadata) {
    if (!metadata.data || !values.email || !values.phoneNumber) {
      throw new BadRequestException(
        `Query values email and phoneNumber should be informed`,
      );
    }

    return values;
  }
}
