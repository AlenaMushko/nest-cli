import { Column, Entity, ManyToMany } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { BaseEntity } from './models/base.entity';

@Entity('tags')
export class TagEntity extends BaseEntity {
  @Column('text')
  name: string;

  @ManyToMany(() => ArticleEntity, (entity) => entity.tags)
  articles?: ArticleEntity[];
}
