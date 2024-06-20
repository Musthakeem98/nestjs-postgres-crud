import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name); // Logger instance with context

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    await user.setPassword(createUserDto.password);

    this.logger.log(`Creating a new user with email: ${createUserDto.email}`); // Log the action

    try {
      const savedUser = await this.userRepository.save(user);
      this.logger.log(`User created successfully with ID: ${savedUser.id}`);
      return savedUser;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as any).code === '23505'
      ) {
        this.logger.warn(
          `User creation failed due to duplicate email: ${createUserDto.email}`,
        );
        throw new ConflictException(
          `Email ${createUserDto.email} is already in use`,
        );
      }
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Fetching all users');
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    this.logger.log(`Fetching user with ID: ${id}`);
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.warn(`User with ID: ${id} not found`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    this.logger.log(`Fetching user with email: ${email}`);
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      this.logger.warn(`User with email: ${email} not found`);
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Updating user with ID: ${id}`, updateUserDto);

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.warn(`User with ID: ${id} not found for update`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    if (updateUserDto.password) {
      await user.setPassword(updateUserDto.password);
    }

    try {
      const updatedUser = await this.userRepository.save(user);
      this.logger.log(`User with ID: ${updatedUser.id} updated successfully`);
      return updatedUser;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as any).code === '23505'
      ) {
        this.logger.warn(
          `User update failed due to duplicate email: ${updateUserDto.email}`,
        );
        throw new ConflictException(
          `Email ${updateUserDto.email} is already in use`,
        );
      }
      this.logger.error(`Failed to update user with ID: ${id}`, error.stack);
      throw error;
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    this.logger.log(`Deleting user with ID: ${id}`);
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      this.logger.warn(`User with ID: ${id} not found for deletion`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.logger.log(`User with ID: ${id} deleted successfully`);
    return { message: 'Deleted successfully' };
  }
}
