// backend/users/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Usa el puerto proporcionado por Cloud Run (que será 8080) o 3000 si es local.
  // En Cloud Run, el contenedor DEBE escuchar en el puerto proporcionado por la variable de entorno 'PORT'.
  await app.listen(process.env.PORT || 3000); 
}
bootstrap();