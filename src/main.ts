import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { useContainer } from 'class-validator';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/http/exception/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HttpResponseInterceptor } from 'src/common/interceptors/httpResponse';
import { MQChannel } from 'src/common/enums/mqChannel';
import { AuthModule } from './modules/auth/auth.module';
import { ClientApiAuthModules } from './modules/client-auth/client.module';
import { UserModule } from './modules/users/user.module';

//import * as cors from 'cors';
//import { WsAdapter } from '@nestjs/platform-ws';

const port = process.env.PORT || 3000;

// let corsOptions = {
//     origin: '*',
//     credentials: true
// }

async function bootstrap() {
    const app = await NestFactory.create(MainModule);

    // WebsocketAdapter not support namespace
    //app.useWebSocketAdapter(new WsAdapter(app));
    //app.useWebSocketAdapter(new WsAdapter(8001));
    //app.use(cors(corsOptions));

    // Inject Global Filter Exception
    app.useGlobalFilters(new HttpExceptionFilter());

    const configService = app.get<ConfigService>(ConfigService);

    // init RabbitMQ Connection
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: MQChannel.NEST_TO_NEXT_QUEUE
        }
    });

    app.enableCors();
    app.useGlobalInterceptors(new HttpResponseInterceptor());
    app.useGlobalPipes(new ValidationPipe());

    configSwagger(app);
    configClientSwagger(app);

    await app.startAllMicroservices();
    await app.listen(port, process.env.HOST);

    //Injected
    useContainer(app.select(MainModule), { fallbackOnErrors: true });
}

const configSwagger = (app: INestApplication) => {
    const apiDocs = new DocumentBuilder()
        .setTitle('NestJS API Documents')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    app.setGlobalPrefix('api');

    const document = SwaggerModule.createDocument(app, apiDocs, {
        include: [
            AuthModule,
            UserModule
        ]
    });

    SwaggerModule.setup('/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true
        }
    });

    if (process.env.NODE_ENV === 'production') {
        app.setGlobalPrefix('/');
    }
};

const configClientSwagger = (app: INestApplication) => {
    app.setGlobalPrefix('api');
    const apiClientDocs = new DocumentBuilder()
        .setTitle('NestJS Client API Documents')
        .setVersion('1.0')
        .addApiKey(
            {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            },
            'apiKey'
        )
        .build();
    const swaggerClientDocs = SwaggerModule.createDocument(app, apiClientDocs, {
        include: [ClientApiAuthModules],
        deepScanRoutes: true
    });

    SwaggerModule.setup('/client-api-docs', app, swaggerClientDocs, {
        swaggerOptions: {
            persistAuthorization: true
        }
    });

    if (process.env.NODE_ENV === 'production') {
        app.setGlobalPrefix('/');
    }
};

bootstrap().then(() => Logger.log(`Server is listening on port: ${port}✅`));


