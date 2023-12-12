import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignInAuthDto, UserSignUpAuthDto, AdminSignInAuthDto, AdminSignUpAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './constant';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('user/signin')
  userSignIn(@Body() userSignInAuthDto: UserSignInAuthDto) {
    return this.authService.userSignIn(userSignInAuthDto);
  }

  @Public()
  @Post('user/signup')
  userSignUp(@Body() userSignUpAuthDto: UserSignUpAuthDto) {
    return this.authService.userSignUp(userSignUpAuthDto);
  }

  @Public()
  @Post('admin/signin')
  adminSignIn(@Body() adminSignInAuthDto: AdminSignInAuthDto) {
    return this.authService.adminSignIn(adminSignInAuthDto);
  }

  @Public()
  @Post('admin/signup')
  adminSignUp(@Body() adminSignUpAuthDto: AdminSignUpAuthDto) {
    return this.authService.adminSignUp(adminSignUpAuthDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: string) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
