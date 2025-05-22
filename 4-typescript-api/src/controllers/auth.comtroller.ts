// src/controllers/auth.controller.ts
import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { LoginRequest, LoginResponse } from '../dtos/auth.dto';
import { generateToken } from '@utils/jwt';
import { UserModel } from '@models/user.model';
import bcrypt from 'bcrypt';

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
  @Post('login')
  public async login(@Body() body: LoginRequest): Promise<LoginResponse> {
    const user = await UserModel.findOne({ email: body.email });

    if (!user || !(await bcrypt.compare(body.password, user.passwordHash))) {
      this.setStatus(401);
      throw new Error('Invalid email or password');
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return { token };
  }
}
