import { getRepositoryToken } from '@nestjs/typeorm';
import { SignupService } from './signup.service';
import { Test } from '@nestjs/testing';
import { Member } from 'src/member.entity';

const TEST_EMAIL = 'test@example.com';
const TEST_NICKNAME = '데품타';
describe('Signup Service', () => {
  let signupService: SignupService;
  let memberRepository: { find: jest.Mock };
  beforeEach(async () => {
    memberRepository = { find: jest.fn() };
    const moduleRef = await Test.createTestingModule({
      providers: [
        SignupService,
        {
          provide: getRepositoryToken(Member), // MemberRepository 토큰
          useValue: memberRepository, // 가짜 구현
        },
      ],
    }).compile();

    signupService = moduleRef.get(SignupService);
  });

  describe('이메일 중복 확인', () => {
    it('이미 가입된 이메일이면 중복이다.', async () => {
      memberRepository.find.mockResolvedValue([{ email: TEST_EMAIL }]);

      const result = await signupService.checkEmail(TEST_EMAIL);
      expect(result).toBe(true);
    });

    it('가입되지 않은 이메일이면 사용 가능하다.', async () => {
      memberRepository.find.mockResolvedValue([]);

      const result = await signupService.checkEmail(TEST_EMAIL);
      expect(result).toBe(false);
    });
  });

  describe('닉네임 중복 확인', () => {
    it('이미 가입된 닉네임이면 중복이다.', async () => {
      memberRepository.find.mockResolvedValue([{ nickname: TEST_NICKNAME }]);

      const result = await signupService.checkNickname(TEST_NICKNAME);
      expect(result).toBe(true);
    });

    it('가입되지 않은 닉네임이면 사용 가능하다.', async () => {
      memberRepository.find.mockResolvedValue([]);

      const result = await signupService.checkNickname(TEST_NICKNAME);
      expect(result).toBe(false);
    });
  });
});
