import { Test, TestingModule } from '@nestjs/testing';
import { ReqRecvsService } from './req-recvs.service';

describe('ReqRecvsService', () => {
  let service: ReqRecvsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReqRecvsService],
    }).compile();

    service = module.get<ReqRecvsService>(ReqRecvsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
