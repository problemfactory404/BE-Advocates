import { Test, TestingModule } from '@nestjs/testing';
import { CaseDetailsService } from './case_details.service';

describe('CaseDetailsService', () => {
  let service: CaseDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaseDetailsService],
    }).compile();

    service = module.get<CaseDetailsService>(CaseDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
