import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import * as mongooseDelete from 'mongoose-delete';
import { AddressType } from '../enums/resume.enum';

@Schema({ collection: 'app_positions', timestamps: true })
export class Position {

    @Prop()
    id: string;

    @Prop()
    name: any;

    @Prop()
    category: string;

    @Prop()
    industry: string;

    @Prop({ required: false })
    isDefault: boolean;

    @Prop({ default: 1, required: false })
    status: number;

    @Prop()
    createdBy: string;
}

type PositionDocument = HydratedDocument<Position>;
type PositionModel = SoftDeleteModel<PositionDocument>;
const PositionSchema = SchemaFactory.createForClass(Position).plugin(mongooseDelete, {
    overrideMethods: true
});
export { PositionDocument, PositionSchema, PositionModel };
