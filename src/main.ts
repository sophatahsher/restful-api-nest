import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { useContainer } from 'class-validator';
import { INestApplication, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './common/http/exception/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HttpResponseInterceptor } from 'src/common/interceptors/httpResponse';
import { MQChannel } from 'src/common/enums/mqChannel';
import { AuthModule } from './modules/auth/auth.module';
import { ClientApiAuthModules } from './modules/client-auth/client.module';
import { UserModule } from './modules/users/user.module';
import { LiveChatModule } from './modules/chat/chat.module';
import { MerchantSDKModules } from './modules/sdk/merchants/merchantSdk.module';
import { AnonymousSDKModules } from './modules/sdk/anonymous/AnonymousSdk.module';
import { ResumeModule } from './modules/resumes/resume.module';

//import * as cors from 'cors';
//import { WsAdapter } from '@nestjs/platform-ws';

const port = process.env.PORT || 3000;

// let corsOptions = {
//     origin: '*',
//     credentials: true
// }

async function bootstrap() {
    const app = await NestFactory.create(MainModule);

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
    configAppUserSwagger(app);
    configClientSwagger(app);
    configAnonymousSwagger(app)

    await app.startAllMicroservices();
    await app.listen(port, process.env.HOST);

    //Injected
    useContainer(app.select(MainModule), { fallbackOnErrors: true });
}

const configSwagger = (app: INestApplication) => {
    app.setGlobalPrefix('api');
    app.enableVersioning({
        defaultVersion: "1.0",
        type: VersioningType.URI,
    });
    
    const apiDocs = new DocumentBuilder()
        .setTitle('NestJS API Documents')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, apiDocs, {
        include: [AuthModule, UserModule, LiveChatModule, ResumeModule]
    });

    // Enable SWAGGER
    if ( process.env.NODE_ENV !== 'production' ) {

        SwaggerModule.setup('/docs', app, document, {
            swaggerOptions: {
                persistAuthorization: true,
                urls: [

                ]
            }
        });
    }
};

const configAppUserSwagger = (app: INestApplication) => {
    app.setGlobalPrefix('api'); //v1.0
    app.enableVersioning({
        defaultVersion: "1.0",
        type: VersioningType.URI,
    });
    const apiAppDocs = new DocumentBuilder()
        .setTitle('NestJS App User Api Documents')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const swaggerAppDocs = SwaggerModule.createDocument(app, apiAppDocs, {
        include: [
            //MerchantSDKModules
        ],
        deepScanRoutes: true
    });

    SwaggerModule.setup('/app-api', app, swaggerAppDocs, {
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
        include: [
            //ClientApiAuthModules,
            MerchantSDKModules
        ],
        deepScanRoutes: true
    });

    // SwaggerModule.setup('/client-api-docs', app, swaggerClientDocs, {
    //     swaggerOptions: {
    //         persistAuthorization: true
    //     }
    // });
    SwaggerModule.setup('/merchant-api-docs', app, swaggerClientDocs, {
        swaggerOptions: {
            persistAuthorization: true
        }
    });

    if (process.env.NODE_ENV === 'production') {
        app.setGlobalPrefix('/');
    }
};

// Anonymous
const configAnonymousSwagger = (app: INestApplication) => {
    app.setGlobalPrefix('api');
    const apiAnonymousDocs = new DocumentBuilder()
        .setTitle('NestJS Anonymous API Documents')
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
    const swaggerAnonymousDocs = SwaggerModule.createDocument(app, apiAnonymousDocs, {
        include: [
            AnonymousSDKModules
        ],
        deepScanRoutes: true
    });

    SwaggerModule.setup('/api/docs/anonymous', app, swaggerAnonymousDocs, {
        swaggerOptions: {
            persistAuthorization: true
        }
    });

    if (process.env.NODE_ENV === 'production') {
        app.setGlobalPrefix('/');
    }
};

bootstrap().then(() => Logger.log(`Server is listening on port: ${port}✅`));
