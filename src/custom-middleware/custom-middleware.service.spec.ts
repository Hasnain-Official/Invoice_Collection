import { Test, TestingModule } from '@nestjs/testing';
import { CustomMiddlewareService } from './custom-middleware.service';

describe('CustomMiddlewareService', () => {
  let service: CustomMiddlewareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomMiddlewareService],
    }).compile();

    service = module.get<CustomMiddlewareService>(CustomMiddlewareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
