import { SetMetadata } from '@nestjs/common';

export const PUBLIC = 'public';
export const PublicGuard = () => SetMetadata(PUBLIC, true);