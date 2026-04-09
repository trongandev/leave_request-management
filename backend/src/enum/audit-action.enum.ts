export enum AuditAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  RETURN = 'RETURN',
  DELEGATE = 'DELEGATE',
  EXPORT = 'EXPORT',
}

export const AUDIT_ACTION_ARRAY = Object.values(AuditAction);
