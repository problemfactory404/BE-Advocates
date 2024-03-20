import { Test, TestingModule } from '@nestjs/testing';
import { CaseDatesService } from './case_dates.service';

describe('CaseDatesService', () => {
  let service: CaseDatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaseDatesService],
    }).compile();

    service = module.get<CaseDatesService>(CaseDatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
