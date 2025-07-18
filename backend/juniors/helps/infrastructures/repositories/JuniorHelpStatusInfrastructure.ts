import { supabase } from '@/backend/common/utils/supabaseClient';
import { IJuniorHelpStatusRepository } from '@/backend/juniors/helps/domains/repositories/IJuniorHelpStatusRepository';
import { StatusMapper } from '@/backend/juniors/helps/infrastructures/mappers/StatusMapper';

export class JuniorHelpStatusInfrastructure
  implements IJuniorHelpStatusRepository
{
  // 상태 관리 메서드
  async getVerificationCode(helpId: number) {
    const { data, error } = await supabase
      .from('help_verification_codes')
      .select('*')
      .eq('help_id', helpId)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116는 데이터 없음
      console.error('인증 코드 조회 오류:', error);
      throw new Error('인증 코드 조회에 실패했습니다.');
    }

    return StatusMapper.toJuniorHelp(data);
  }

  async deleteVerificationCode(helpId: number) {
    const { error } = await supabase
      .from('help_verification_codes')
      .delete()
      .eq('help_id', helpId);

    if (error) {
      console.error('인증 코드 삭제 오류:', error);
      throw new Error('인증 코드 삭제에 실패했습니다.');
    }

    return true;
  }
}
