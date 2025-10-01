import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Cloud Run/Docker usará process.env.PORT (que es 8080).
  // Si la variable no existe (ej. al compilar o ejecutar localmente sin .env),
  // usamos '3000' como puerto de reserva.
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port);  
  // Corregido: Si process.env.PORT existe, lo convertimos a número. 
  // Si no, usamos el fallback.
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();