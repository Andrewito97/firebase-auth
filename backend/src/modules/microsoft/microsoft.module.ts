import { Global, Module } from '@nestjs/common';

import { MicrosoftService } from './microsoft.service';

@Global()
@Module({
  providers: [MicrosoftService],
  exports: [MicrosoftService],
})
export class MicrosoftModule {}
