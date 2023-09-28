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
import { UserMemberModule } from './modules/users/user.module';
import { LiveChatModule } from './modules/chat/chat.module';
import { MerchantSDKModules } from './modules/sdk/merchants/merchantSdk.module';
import { AnonymousSDKModules } from './modules/sdk/anonymous/AnonymousSdk.module';
import { ResumeModule } from './modules/resumes/resume.module';
import { CoverLetterModule } from './modules/coverletters/coverletter.module';
import { UploadFileModule } from './modules/uploads/upload.module';
import { SpokenLanguageModule } from './modules/spokenlangs/spokenlang.module';

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

    await configSwagger(app);
    configAppUserSwagger(app);
    //configClientSwagger(app);
    //configAnonymousSwagger(app)

    await app.startAllMicroservices();

    // All listen to the same port
    await app.listen(port, process.env.HOST);

    //Injected
    useContainer(app.select(MainModule), { fallbackOnErrors: true });
}

const configSwagger = async (app: INestApplication) => {
    app.setGlobalPrefix('api');
    app.enableVersioning({
        defaultVersion: "1.0",
        type: VersioningType.URI,
    });
    
    const apiDocs = new DocumentBuilder()
        .setTitle('Nest API Documents')
        .setDescription('The cats API description')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, apiDocs, {
        include: [
            AuthModule, 
            UserMemberModule, 
            LiveChatModule,
            ResumeModule,
            CoverLetterModule,
            //
            UploadFileModule,
            //
            SpokenLanguageModule
        ]
    });

    // Enable SWAGGER
    if ( process.env.NODE_ENV !== 'production' ) {

        SwaggerModule.setup('/docs', app, document, {
            swaggerOptions: {
                persistAuthorization: true
            }
        });
    }
};

const configAppUserSwagger = (app: INestApplication) => {
    app.setGlobalPrefix('api'); 
    app.enableVersioning({
        defaultVersion: "1.0",
        type: VersioningType.URI,
    });
    const apiAppDocs = new DocumentBuilder()
        .setTitle('Nest Api Documents')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const swaggerAppDocs = SwaggerModule.createDocument(app, apiAppDocs, {
        include: [
           AuthModule, 
           UserMemberModule, 
           LiveChatModule, 
           ResumeModule
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
