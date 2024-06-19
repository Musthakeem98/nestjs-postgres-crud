import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Post as BlogPost } from './post.entity';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<BlogPost> {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll(): Promise<BlogPost[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<BlogPost> {
    return this.postService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePostDto: CreatePostDto,
  ): Promise<BlogPost> {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.postService.remove(id);
  }
}
