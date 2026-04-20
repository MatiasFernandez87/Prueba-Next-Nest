import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  private idCounter = 1;

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: string): Item {
    const item = this.items.find(i => i.id === id);
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  create(createItemDto: CreateItemDto): Item {
    const item: Item = {
      id: String(this.idCounter++),
      name: createItemDto.name,
      description: createItemDto.description,
      createdAt: new Date(),
    };
    this.items.push(item);
    return item;
  }

  update(id: string, updateItemDto: UpdateItemDto): Item {
    const item = this.findOne(id);
    if (updateItemDto.name) item.name = updateItemDto.name;
    if (updateItemDto.description) item.description = updateItemDto.description;
    return item;
  }

  delete(id: string): void {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    this.items.splice(index, 1);
  }
}