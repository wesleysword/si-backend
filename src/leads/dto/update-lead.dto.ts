import { IsString, IsOptional } from 'class-validator';

export class UpdateLeadDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  contact?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional() // Adicionado para permitir edição da descrição
  description?: string;
}