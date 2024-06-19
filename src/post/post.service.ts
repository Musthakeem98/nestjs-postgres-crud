import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePostDto: CreatePostDto): Promise<Post> {
    await this.postRepository.update(id, updatePostDto);
    return this.postRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<any> {
    await this.postRepository.delete(id);
    return { message: 'Deleted successfully' };
  }
}
