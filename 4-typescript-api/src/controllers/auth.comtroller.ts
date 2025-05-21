import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { generateToken } from '../utils/jwt';
import { LoginRequest, LoginResponse } from '../dtos/auth.dto';

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
  @Post('login')
  public async login(@Body() body: LoginRequest): Promise<LoginResponse> {
    const { email, password } = body;

    // Replace with real DB logic
    if (email !== 'admin@example.com' || password !== 'admin123') {
      this.setStatus(401);
      throw new Error('Invalid credentials');
    }

    const token = generateToken({ email });
    return { token };
  }
}
