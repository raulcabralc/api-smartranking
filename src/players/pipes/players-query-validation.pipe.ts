import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from "@nestjs/common";
import { FindOne } from "../interfaces/find-one.interface";

export class PlayerQueryValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(values: FindOne, metadata: ArgumentMetadata) {
    if (
      !values ||
      typeof values !== "object" ||
      !values.email ||
      !values.phoneNumber
    ) {
      throw new BadRequestException(
        `Query values email and phoneNumber should be informed`,
      );
    }

    const hasValidEmail = values.email && values.email.trim() !== "";
    const hasValidPhoneNumber =
      values.phoneNumber && values.phoneNumber.trim() !== "";

    if (!hasValidEmail && !hasValidPhoneNumber) {
      throw new BadRequestException(
        "Query values email and phoneNumber should be informed",
      );
    }

    if (values.email) {
      values.email = values.email.trim();
    }
    if (values.phoneNumber) {
      values.phoneNumber = values.phoneNumber.trim();
    }

    return values;
  }
}
