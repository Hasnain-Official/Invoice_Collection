import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignInAuthDto, UserSignUpAuthDto, AdminSignInAuthDto, AdminSignUpAuthDto } from './dto/create-auth.dto';
import { Public } from './constant';
import { RolesGuard } from 'src/base/roles.guard';
import { Roles } from 'src/base/roles.decorator';
import { Role } from 'src/base/base.entity';

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

  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @Post('admin/signup')
  adminSignUp(@Body() adminSignUpAuthDto: AdminSignUpAuthDto) {
    return this.authService.adminSignUp(adminSignUpAuthDto);
  }

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
