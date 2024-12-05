import { Material } from "@prisma/client";
import { IsDefined, IsEnum, IsInt, IsString } from "class-validator";

export class CreateToyDto {
    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsEnum(Material)
    material: Material;

    @IsDefined()
    @IsInt()
    weight: number;
}
