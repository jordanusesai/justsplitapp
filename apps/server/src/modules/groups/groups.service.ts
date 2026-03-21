import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto, UpdateGroupDto, Group } from '@justsplitapp/types';

@Injectable()
export class GroupsService {
  private groups: Group[] = [
    {
      id: '1',
      name: 'Roommates',
      description: 'Shared expenses for the apartment',
      members: ['user-1', 'user-2', 'user-3'],
      createdBy: 'user-1',
      totalExpenses: 1250.50,
      currency: 'USD',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Trip to Paris',
      description: 'Vacation expenses',
      members: ['user-1', 'user-4', 'user-5'],
      createdBy: 'user-1',
      totalExpenses: 3400.00,
      currency: 'EUR',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  create(createGroupDto: CreateGroupDto): Group {
    const newGroup: Group = {
      id: Math.random().toString(36).substr(2, 9),
      ...createGroupDto,
      members: createGroupDto.members || [],
      createdBy: 'user-1', // Mocked user
      totalExpenses: 0,
      currency: createGroupDto.currency || 'USD',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.groups.push(newGroup);
    return newGroup;
  }

  findAll(): Group[] {
    return this.groups;
  }

  findOne(id: string): Group {
    const group = this.groups.find(g => g.id === id);
    if (!group) throw new NotFoundException(`Group with ID ${id} not found`);
    return group;
  }

  update(id: string, updateGroupDto: UpdateGroupDto): Group {
    const index = this.groups.findIndex(g => g.id === id);
    if (index === -1) throw new NotFoundException(`Group with ID ${id} not found`);
    
    this.groups[index] = {
      ...this.groups[index],
      ...updateGroupDto,
      updatedAt: new Date(),
    };
    return this.groups[index];
  }

  remove(id: string): { success: boolean } {
    const initialLength = this.groups.length;
    this.groups = this.groups.filter(g => g.id !== id);
    return { success: this.groups.length < initialLength };
  }
}
