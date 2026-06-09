import { Module } from '@nestjs/common';
import { FilmeService } from './filme.service';
import { FilmeController } from './filme.controller';

@Module({
  controllers: [FilmeController],
  providers: [FilmeService],
})
export class FilmeModule {}
