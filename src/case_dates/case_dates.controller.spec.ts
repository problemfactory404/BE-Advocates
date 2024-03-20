import { Test, TestingModule } from '@nestjs/testing';
import { CaseDatesController } from './case_dates.controller';

describe('CaseDatesController', () => {
  let controller: CaseDatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaseDatesController],
    }).compile();

    controller = module.get<CaseDatesController>(CaseDatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
