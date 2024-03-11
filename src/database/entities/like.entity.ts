import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { BaseEntity } from './models/base.entity';
import { UserEntity } from './user.entity';

@Entity('likes')
export class LikeEntity extends BaseEntity {
  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column()
  article_id: string;
  @ManyToOne(() => ArticleEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'article_id' })
  article?: ArticleEntity;
}
