import { Material } from "@prisma/client";
import { IsDecimal, IsDefined, IsEnum, IsInt, IsNumber, IsString } from "class-validator";

export class CreateToyDto {
    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsEnum(Material)
    material: Material;

    @IsDefined()
    @IsNumber()
    weight: number;
}
