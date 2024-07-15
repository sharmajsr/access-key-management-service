import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {  ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { KeyCreateCommand, KeyUpdateCommand } from '../commands';
import { KeyCreationDto, KeyUpdateDto } from '../core/dtos';
import { QueryParamDto } from '../core/dtos/key-query-param.dto';
import { KeyResponseDto } from '../core/dtos/key.response.dto';
import { KeyGetAllQuery, KeyGetQuery, UserAccessGetQuery } from '../queries';

@Controller('key')
export class AccessKeyController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}
  
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create Key',
  })
  @Post()
  async create(@Body() keyCreationDto: KeyCreationDto) {
    return this.commandBus.execute(new KeyCreateCommand(keyCreationDto));
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'List Key',
  })
  @Get('all')
  async getAll() {
      return  this.queryBus.execute(new KeyGetAllQuery());

  }

  @ApiOperation({
    summary: 'Get Key',
  })
  @Get()
  async getById(@Query() query: QueryParamDto) {
      return this.queryBus.execute(new KeyGetQuery(query.id));
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Check user access',
  })
  @ApiOkResponse({
    type: KeyResponseDto,
  })
  @Get('user-access')
  async canUserBe(@Query() query: QueryParamDto) {
    console.log(`user-access ${query.id}`)
    return this.queryBus.execute(new UserAccessGetQuery(query.id));
  }

  @ApiOperation({
    summary: 'Update Key',
  })
  @Put()
  async updateKey(@Body() keyUpdateDto: KeyUpdateDto) {
    return this.commandBus.execute(new KeyUpdateCommand(keyUpdateDto));
  }


  @ApiOperation({
    summary: 'Delete Key',
  })
  @Delete()
  async deleteKey(@Query() query: QueryParamDto) {
    return this.queryBus.execute(new UserAccessGetQuery(query.id));
  }


}
