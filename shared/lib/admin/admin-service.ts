import 'server-only';
import { createSupabaseAdminClient } from '../supabase/admin-client';
import type { User } from '@supabase/supabase-js';

/**
 * 관리자 서비스 인터페이스
 */
export interface IAdminService {
  /**
   * 사용자 이메일 수동 인증
   */
  confirmUserEmail(userId: string): Promise<{ success: boolean; error?: string; user?: User }>;

  /**
   * 사용자 정보 조회
   */
  getUserById(userId: string): Promise<{ success: boolean; error?: string; user?: User }>;

  /**
   * 사용자 정보 업데이트
   */
  updateUserById(
    userId: string,
    updates: Record<string, unknown>,
  ): Promise<{ success: boolean; error?: string; user?: User }>;

  /**
   * 사용자 삭제
   */
  deleteUser(userId: string): Promise<{ success: boolean; error?: string }>;
}

/**
 * Supabase Admin SDK를 사용한 관리자 서비스 구현체
 */
export class AdminService implements IAdminService {
  private supabaseAdmin;

  constructor() {
    this.supabaseAdmin = createSupabaseAdminClient();
  }

  /**
   * 사용자 이메일 수동 인증
   */
  async confirmUserEmail(
    userId: string,
  ): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const { data, error } = await this.supabaseAdmin.auth.admin.updateUserById(userId, {
        email_confirm: true,
      });

      if (error) {
        console.error('Admin email confirmation error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Admin email confirmation service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * 사용자 정보 조회
   */
  async getUserById(userId: string): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const { data, error } = await this.supabaseAdmin.auth.admin.getUserById(userId);

      if (error) {
        console.error('Admin get user error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Admin get user service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * 사용자 정보 업데이트
   */
  async updateUserById(
    userId: string,
    updates: Record<string, unknown>,
  ): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const { data, error } = await this.supabaseAdmin.auth.admin.updateUserById(userId, updates);

      if (error) {
        console.error('Admin update user error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Admin update user service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * 사용자 삭제
   */
  async deleteUser(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await this.supabaseAdmin.auth.admin.deleteUser(userId);

      if (error) {
        console.error('Admin delete user error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Admin delete user service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// 싱글톤 인스턴스 export
export const adminService = new AdminService();
