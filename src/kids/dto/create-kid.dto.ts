import { IsBoolean, IsDefined, IsInt, IsString } from "class-validator";

export class CreateKidDto {
    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsString()
    country: string;

    @IsDefined()
    @IsString()
    address: string;

    @IsDefined()
    @IsBoolean()
    isgood: boolean;
}
