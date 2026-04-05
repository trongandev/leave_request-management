import { beforeEach, describe, expect, it } from '@jest/globals';
import { ApprovalOrchestratorService } from './approval-orchestrator.service';
import { ApproverResolutionPolicy } from './approver-resolution.policy';
import { UserProfile, ApprovalStepResolution } from './types';

describe('ApprovalOrchestratorService', () => {
  let orchestrator: ApprovalOrchestratorService;
  let policy: ApproverResolutionPolicy;

  beforeEach(() => {
    policy = new ApproverResolutionPolicy();
    orchestrator = new ApprovalOrchestratorService(policy);
  });

  describe('planApprovalSteps', () => {
    it('should return auto-approve resolution for level 8 requester', () => {
      const executive: UserProfile = {
        _id: 'exec-1',
        empId: 'EXE001',
        fullName: 'CTO Officer',
        positionId: {
          _id: 'pos-8',
          level: 8,
          name: 'CTO',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'MANAGER' },
      };

      const result = orchestrator.planApprovalSteps(executive, [executive]);

      expect(result.autoApprove).toBe(true);
      expect(result.steps).toEqual([]);
    });

    it('should return manager assignment for staff with manager', () => {
      const manager: UserProfile = {
        _id: 'mgr-1',
        empId: 'MGR001',
        fullName: 'Manager Name',
        positionId: {
          _id: 'pos-4',
          level: 4,
          name: 'TL',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'MANAGER' },
      };

      const staff: UserProfile = {
        _id: 'staff-1',
        empId: 'STF001',
        fullName: 'Staff Name',
        positionId: {
          _id: 'pos-2',
          level: 2,
          name: 'SWE',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        managerId: manager._id,
        roleId: { name: 'EMPLOYEE' },
      };

      const result = orchestrator.planApprovalSteps(staff, [staff, manager]);

      expect(result.autoApprove).toBe(false);
      expect(result.steps).toHaveLength(1);
      expect(result.steps[0].originalApproverId).toBe(manager._id);
    });
  });

  describe('transformToPersistableSteps', () => {
    it('should return empty array for auto-approve resolution', () => {
      const autoApproveResolution: ApprovalStepResolution = {
        steps: [],
        autoApprove: true,
        reason: 'Auto-approve',
      };

      const result = orchestrator.transformToPersistableSteps(
        autoApproveResolution,
        'request-1',
      );

      expect(result).toEqual([]);
    });

    it('should add requestId to steps for persistence', () => {
      const resolution: ApprovalStepResolution = {
        steps: [
          {
            requestId: '',
            originalApproverId: 'mgr-1',
            stepLabel: 'MANAGER',
            stepOrder: 1,
            groupId: [],
            isFinalStep: false,
            requiredAll: true,
            deadlineAt: new Date(),
          },
        ],
        autoApprove: false,
        reason: 'Assigned to manager',
      };

      const result = orchestrator.transformToPersistableSteps(
        resolution,
        'request-1',
      );

      expect(result).toHaveLength(1);
      expect(result[0].requestId).toBe('request-1');
      expect(result[0].originalApproverId).toBe('mgr-1');
    });
  });

  describe('validateDelegationCandidate', () => {
    it('should validate delegation to same-level manager', () => {
      const originalApprover: UserProfile = {
        _id: 'mgr-1',
        empId: 'MGR001',
        fullName: 'Manager 1',
        positionId: {
          _id: 'pos-4',
          level: 4,
          name: 'TL',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'MANAGER' },
      };

      const delegateToApprover: UserProfile = {
        _id: 'mgr-2',
        empId: 'MGR002',
        fullName: 'Manager 2',
        positionId: {
          _id: 'pos-4',
          level: 4,
          name: 'TL',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'MANAGER' },
      };

      const result = orchestrator.validateDelegationCandidate(
        originalApprover,
        delegateToApprover,
        [originalApprover, delegateToApprover],
      );

      expect(result.isValid).toBe(true);
    });

    it('should reject delegation to non-manager', () => {
      const originalApprover: UserProfile = {
        _id: 'mgr-1',
        empId: 'MGR001',
        fullName: 'Manager 1',
        positionId: {
          _id: 'pos-4',
          level: 4,
          name: 'TL',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'MANAGER' },
      };

      const invalidDelegate: UserProfile = {
        _id: 'staff-1',
        empId: 'STF001',
        fullName: 'Staff Name',
        positionId: {
          _id: 'pos-2',
          level: 2,
          name: 'SWE',
          departmentId: 'dept-tech',
        },
        departmentId: 'dept-tech',
        roleId: { name: 'EMPLOYEE' },
      };

      const result = orchestrator.validateDelegationCandidate(
        originalApprover,
        invalidDelegate,
        [originalApprover, invalidDelegate],
      );

      expect(result.isValid).toBe(false);
    });
  });
});
