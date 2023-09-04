import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Notifications,
    NotificationsSchema
} from './schemas/notification.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Notifications.name, schema: NotificationsSchema }
        ])
    ],
    controllers: [],
    providers: [NotificationGateway]
})
export class NotificationModule {}
