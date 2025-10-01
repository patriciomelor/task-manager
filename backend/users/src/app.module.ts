import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigService
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_ATLAS_URI: Joi.string().required(), // Variable CLAVE
        PORT: Joi.number().default(3000),
      }),
    }),
    
    // **USAR forRootAsync PARA OBTENER LA URI**
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Asegura que ConfigService esté disponible
      useFactory: (configService: ConfigService) => ({
        // Usamos la URI de Atlas de las variables de entorno
        uri: configService.get<string>('MONGODB_ATLAS_URI'),
        
        // Opcional pero recomendado para Atlas: usa la configuración del código de diagnóstico
        // Esto garantiza la compatibilidad con el servidor de MongoDB Atlas
        // Aunque Mongoose suele gestionarlo, es buena práctica si la conexión falla
        useNewUrlParser: true, // Configuración antigua, pero a veces necesaria
        useUnifiedTopology: true, // Configuración antigua, pero a veces necesaria
        
        // MongoDB Atlas usa ServerAPI v1. Mongoose debe saberlo.
        // Opcional, pero si el driver lo requiere:
        // serverApi: ServerApiVersion.v1, 
      }),
      inject: [ConfigService],
    }),
    
    // ... aquí van tus módulos de Features (UsersModule, TasksModule)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
