import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { CreateGroupDto, UpdateGroupDto, Group } from '@justsplitapp/types';

@ApiTags('groups')
@ApiBearerAuth()
@Controller('api/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new group' })
  create(@Body() createGroupDto: CreateGroupDto): Group {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all groups for current user' })
  findAll(): Group[] {
    return this.groupsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a group by ID' })
  findOne(@Param('id') id: string): Group {
    return this.groupsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a group' })
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto): Group {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a group' })
  remove(@Param('id') id: string): { success: boolean } {
    return this.groupsService.remove(id);
  }
}
