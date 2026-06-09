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
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@ApiTags('pedidos')
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo pedido (valorTotal calculado automaticamente)',
  })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidoService.create(createPedidoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pedidos' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos.' })
  findAll() {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um pedido pelo ID' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado.' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um pedido (valorTotal recalculado automaticamente)',
  })
  @ApiResponse({ status: 200, description: 'Pedido atualizado.' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePedidoDto: UpdatePedidoDto,
  ) {
    return this.pedidoService.update(id, updatePedidoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um pedido' })
  @ApiResponse({ status: 200, description: 'Pedido removido.' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoService.remove(id);
  }
}
