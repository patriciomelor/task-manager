// backend/users/src/app.module.ts (y tasks)
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(), // Variable que usaremos
        PORT: Joi.number().default(3000),
      }),
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_ATLAS_URI,
      }),
    }),
    // ... aquí van tus módulos de Features (UsersModule, TasksModule)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}