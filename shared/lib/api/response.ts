import { NextResponse } from 'next/server';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  errorCode?: string;
  data?: T;
}

export function formatSuccessResponse<T>(
  data: T,
  message?: string,
  status = 200,
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function formatErrorResponse(
  errorCode: string,
  message?: string,
  status = 400,
): NextResponse<ApiResponse> {
  return NextResponse.json({ success: false, errorCode, message }, { status });
}
