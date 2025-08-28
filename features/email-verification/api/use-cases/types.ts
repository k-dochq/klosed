/**
 * Use Cases 타입 정의
 */

// 공통 Use Case 응답 타입
export interface UseCaseResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

// 공통 Use Case 요청 타입
export interface UseCaseRequest {
  requestUrl?: string;
}

// Use Case 팩토리 함수 타입
export interface IUseCase<TRequest extends UseCaseRequest, TResponse> {
  execute(request: TRequest): Promise<TResponse>;
}
