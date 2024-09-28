import { Module } from '@nestjs/common';
import { ServiceAccount } from 'firebase-admin';

import * as serviceAccount from '@keys/adminsdk.json';
import { AuthModule } from '@modules/auth/auth.module';
import { FirebaseModule } from '@modules/firebase/firebase.module';
import { GithubModule } from '@modules/github/github.module';
import { GoogleModule } from '@modules/google/google.module';
import { MicrosoftModule } from '@modules/microsoft/microsoft.module';
import { TwitterModule } from '@modules/twitter/twitter.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    FirebaseModule.forRoot(serviceAccount as ServiceAccount),
    GoogleModule,
    MicrosoftModule,
    GithubModule,
    TwitterModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
