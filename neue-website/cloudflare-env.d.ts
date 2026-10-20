declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    ADMIN_OWNER_USER_ID?: string;
    ADMIN_OWNER_EMAIL?: string;
    ADMIN_CSRF_SECRET?: string;
    ADMIN_PASSWORD_PEPPER?: string;
    SITE_ORIGIN?: string;
    BUCKET?: R2Bucket;
  }
}
