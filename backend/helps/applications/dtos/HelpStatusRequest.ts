// Help 상태 관리 요청 DTO (공통)
export interface SelectJuniorRequestDto {
  helpId: number;
  juniorId: string; // UUID로 변경
}

export interface RequestCompletionRequestDto {
  helpId: number;
}

export interface CompleteHelpRequestDto {
  helpId: number;
  verificationCode: string;
}
