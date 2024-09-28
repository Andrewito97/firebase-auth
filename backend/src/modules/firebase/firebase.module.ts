import {
  DynamicModule,
  Global,
  Logger,
  Module,
  OnModuleDestroy,
  OnModuleInit,
  ValueProvider,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import firebaseAdmin from 'firebase-admin';
import { Credential } from 'firebase-admin/app';

import { FIREBASE_CREDENTIAL } from './firebase.constants';
import { FirebaseService } from './firebase.service';

@Global()
@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(FirebaseModule.name);
  private readonly credential: Credential;

  constructor(readonly moduleRef: ModuleRef) {
    this.credential = moduleRef.get(FIREBASE_CREDENTIAL);
  }

  onModuleInit() {
    try {
      this.logger.log('Connecting to firebase...');
      firebaseAdmin.initializeApp({ credential: this.credential });
      this.logger.log('Firebase successfully connected');
    } catch (error) {
      this.logger.error('Firebase connection error: ', error);
    }
  }

  onModuleDestroy() {
    this.logger.log('Destroying connection to firebase...');
  }

  static forRoot(serviceAccount: firebaseAdmin.ServiceAccount): DynamicModule {
    const valueProvider: ValueProvider = {
      provide: FIREBASE_CREDENTIAL,
      useValue: firebaseAdmin.credential.cert(serviceAccount),
    };

    return {
      module: FirebaseModule,
      providers: [valueProvider],
      exports: [valueProvider],
    };
  }
}
