import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LancheComboService } from './lanche-combo.service';
import { CreateLancheComboDto } from './dto/create-lanche-combo.dto';
import { UpdateLancheComboDto } from './dto/update-lanche-combo.dto';

@ApiTags('lanche-combos')
@Controller('lanche-combos')
export class LancheComboController {
  constructor(private readonly lancheComboService: LancheComboService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo combo de lanche' })
  @ApiResponse({ status: 201, description: 'Combo criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createLancheComboDto: CreateLancheComboDto) {
    return this.lancheComboService.create(createLancheComboDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os combos' })
  @ApiResponse({ status: 200, description: 'Lista de combos.' })
  findAll() {
    return this.lancheComboService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um combo pelo ID' })
  @ApiResponse({ status: 200, description: 'Combo encontrado.' })
  @ApiResponse({ status: 404, description: 'Combo não encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lancheComboService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um combo' })
  @ApiResponse({ status: 200, description: 'Combo atualizado.' })
  @ApiResponse({ status: 404, description: 'Combo não encontrado.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLancheComboDto: UpdateLancheComboDto,
  ) {
    return this.lancheComboService.update(id, updateLancheComboDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um combo' })
  @ApiResponse({ status: 200, description: 'Combo removido.' })
  @ApiResponse({ status: 404, description: 'Combo não encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lancheComboService.remove(id);
  }
}
