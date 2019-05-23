import { Injectable } from "@angular/core";
import { AES256 } from "@ionic-native/aes-256/ngx";

@Injectable({
  providedIn: "root"
})
export class CryptService {
  private secureKey: string;
  private secureIV: string;

  constructor(private aes256: AES256) {}

  async generateSecureKey(_random: string) {
    return await this.aes256.generateSecureKey(_random); // Returns a 32 bytes string
  }

  async generateSecureIV(_salt: string) {
    return await this.aes256.generateSecureIV(_salt); // Returns a 16 bytes string
  }

  async encryptMessage(_key: string, _msg: string) {
    const { _salt, _secret } = this.splitSecret(_key);
    return await this.aes256.encrypt(_secret, _salt, _msg);
  }

  async decryptMessage(_key: string, _msg: string) {
    const { _salt, _secret } = this.splitSecret(_key);
    return await this.aes256.decrypt(_secret, _salt, _msg);
  }

  splitSecret(_key: string) {
    const _spl_key = _key.split("-");
    return {
      _salt: _spl_key[0],
      _secret: _spl_key[1]
    };
  }

  // this.aes256.encrypt(this.secureKey, this.secureIV, 'testdata')
  //   .then(res => console.log('Encrypted Data: ',res))
  //   .catch((error: any) => console.error(error));

  // this.aes256.decrypt(this.secureKey, this.secureIV, 'encryptedData')
  //   .then(res => console.log('Decrypted Data : ',res))
  //   .catch((error: any) => console.error(error));

  // * this.aes256.generateSecureKey('random password 12345')
  //   .then(res => console.log('Secure Key : ',res))
  //   .catch((error: any) => console.error(error));

  // * this.aes256.generateSecureIV('random password 12345')
  //   .then(res => console.log('Secure IV : ',res))
  //   .catch((error: any) => console.error(error));
}
