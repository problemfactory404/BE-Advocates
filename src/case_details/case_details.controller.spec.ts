import { Test, TestingModule } from '@nestjs/testing';
import { CaseDetailsController } from './case_details.controller';

describe('CaseDetailsController', () => {
  let controller: CaseDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaseDetailsController],
    }).compile();

    controller = module.get<CaseDetailsController>(CaseDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
