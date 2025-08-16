/**
 * Dictionary 타입 정의 - 다국어 지원을 위한 타입 안전성 보장
 */

export interface Dictionary {
  products: {
    cart: string;
  };
  nav: {
    home: string;
    about: string;
  };
  auth: {
    login: {
      title: string;
      subtitle: string;
      phoneLogin: {
        title: string;
        button: string;
      };
      socialLogin: {
        title: string;
      };
      divider: string;
      links: {
        forgotPassword: string;
        noAccount: string;
        signUp: string;
        backHome: string;
      };
    };
  };
}
