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
import { SessaoService } from './sessao.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';
import { UpdateSessaoDto } from './dto/update-sessao.dto';

@ApiTags('sessoes')
@Controller('sessoes')
export class SessaoController {
  constructor(private readonly sessaoService: SessaoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova sessão' })
  @ApiResponse({ status: 201, description: 'Sessão criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createSessaoDto: CreateSessaoDto) {
    return this.sessaoService.create(createSessaoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as sessões' })
  @ApiResponse({ status: 200, description: 'Lista de sessões.' })
  findAll() {
    return this.sessaoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma sessão pelo ID' })
  @ApiResponse({ status: 200, description: 'Sessão encontrada.' })
  @ApiResponse({ status: 404, description: 'Sessão não encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sessaoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma sessão' })
  @ApiResponse({ status: 200, description: 'Sessão atualizada.' })
  @ApiResponse({ status: 404, description: 'Sessão não encontrada.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSessaoDto: UpdateSessaoDto,
  ) {
    return this.sessaoService.update(id, updateSessaoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma sessão' })
  @ApiResponse({ status: 200, description: 'Sessão removida.' })
  @ApiResponse({ status: 404, description: 'Sessão não encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sessaoService.remove(id);
  }
}
