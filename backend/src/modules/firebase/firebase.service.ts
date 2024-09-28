import { Injectable } from '@nestjs/common';
import firebaseAdmin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Injectable()
export class FirebaseService {
  decodeToken(firebaseToken: string): Promise<DecodedIdToken> {
    return firebaseAdmin.auth().verifyIdToken(firebaseToken);
  }
}
