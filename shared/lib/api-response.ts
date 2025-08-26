import { NextResponse } from 'next/server';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export function formatSuccessResponse<T>(
  data: T,
  message: string,
  status = 200,
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function formatErrorResponse(message: string, status = 400): NextResponse<ApiResponse> {
  return NextResponse.json({ success: false, message }, { status });
}
