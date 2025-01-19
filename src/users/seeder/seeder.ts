import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);

  console.log('Seeding users...');
  for (let i = 0; i < 1000; i++) {
    const hashedPassword = await bcrypt.hash('password123', 10);

    const user = userRepository.create({
      email: faker.internet.email(),
      password: hashedPassword,
      fullName: faker.name.fullName(),
      role: ['admin', 'editor', 'viewer'][Math.floor(Math.random() * 3)],
      isActive: true,
    });

    await userRepository.save(user);

    if (i % 100 === 0) {
      console.log(`Seeded ${i} users`);
    }
  }

  console.log('Seeding completed.');
};

const runSeeder = async () => {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'myuser',
    password: 'mypassword',
    database: 'mydatabase',
    entities: [User],
    synchronize: true, // Only for development
  });

  try {
    await dataSource.initialize();
    console.log('Database connected. Running seeds...');
    await seedUsers(dataSource);
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await dataSource.destroy();
  }
};

runSeeder();
