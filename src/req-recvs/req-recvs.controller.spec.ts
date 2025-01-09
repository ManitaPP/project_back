import { Test, TestingModule } from '@nestjs/testing';
import { ReqRecvsController } from './req-recvs.controller';
import { ReqRecvsService } from './req-recvs.service';

describe('ReqRecvsController', () => {
  let controller: ReqRecvsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReqRecvsController],
      providers: [ReqRecvsService],
    }).compile();

    controller = module.get<ReqRecvsController>(ReqRecvsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
