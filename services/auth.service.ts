export class AuthService {

  getToken() {
    const user = '8c9a2-ad787-0615e-57271-3ec59-5fcb5';
    const secret = 'f5a56-881b3-5ad95-ac681-eaeb6-f2faf';
    const token = 'Basic ' + Buffer.from(`${user}:${secret}`, 'utf8').toString('base64');

    return token;
  }
}
