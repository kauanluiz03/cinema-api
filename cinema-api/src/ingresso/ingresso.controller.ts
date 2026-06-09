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
import { IngressoService } from './ingresso.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';

@ApiTags('ingressos')
@Controller('ingressos')
export class IngressoController {
  constructor(private readonly ingressoService: IngressoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo ingresso' })
  @ApiResponse({ status: 201, description: 'Ingresso criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createIngressoDto: CreateIngressoDto) {
    return this.ingressoService.create(createIngressoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os ingressos' })
  @ApiResponse({ status: 200, description: 'Lista de ingressos.' })
  findAll() {
    return this.ingressoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um ingresso pelo ID' })
  @ApiResponse({ status: 200, description: 'Ingresso encontrado.' })
  @ApiResponse({ status: 404, description: 'Ingresso não encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ingressoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um ingresso' })
  @ApiResponse({ status: 200, description: 'Ingresso atualizado.' })
  @ApiResponse({ status: 404, description: 'Ingresso não encontrado.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIngressoDto: UpdateIngressoDto,
  ) {
    return this.ingressoService.update(id, updateIngressoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um ingresso' })
  @ApiResponse({ status: 200, description: 'Ingresso removido.' })
  @ApiResponse({ status: 404, description: 'Ingresso não encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ingressoService.remove(id);
  }
}
