import { IsNotEmpty, IsString } from 'class-validator';

export class SentenceDto {
  @IsNotEmpty()
  @IsString()
  sentence: string;

  @IsString()
  option: string;
}
