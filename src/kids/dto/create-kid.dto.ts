import { IsDefined, IsInt, IsString } from "class-validator";

export class CreateKidDto {
    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsString()
    country: string;

    @IsDefined()
    @IsString()
    adress: string;

    @IsDefined()
    @IsInt()
    isgood: boolean;
}
