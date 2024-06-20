import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name); // Create a logger instance

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);
    this.logger.log('Creating a new post', { createPostDto }); // Log the creation action
    try {
      return await this.postRepository.save(post);
    } catch (error) {
      this.logger.error('Error creating post', { error });
      throw error;
    }
  }

  async findAll(): Promise<Post[]> {
    this.logger.log('Fetching all posts');
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    this.logger.log(`Fetching post with ID ${id}`);
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      this.logger.warn(`Post with ID ${id} not found`);
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async update(id: number, updatePostDto: CreatePostDto): Promise<Post> {
    this.logger.log(`Updating post with ID ${id}`, { updatePostDto });

    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      this.logger.warn(`Post with ID ${id} not found for update`);
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    const updatedPost = this.postRepository.merge(post, updatePostDto);
    return this.postRepository.save(updatedPost);
  }

  async remove(id: number): Promise<{ message: string }> {
    this.logger.log(`Deleting post with ID ${id}`);
    const result = await this.postRepository.delete(id);
    if (result.affected === 0) {
      this.logger.warn(`Post with ID ${id} not found for deletion`);
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    this.logger.log(`Post with ID ${id} deleted successfully`);
    return { message: 'Deleted successfully' };
  }
}
