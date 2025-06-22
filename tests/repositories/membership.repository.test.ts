import { Database } from "../../src/modern/db/database";
import { Membership } from "../../src/modern/models/domain/membership";
import { MembershipPeriod } from "../../src/modern/models/domain/membership-period";
import { MembershipPeriodEntity } from "../../src/modern/models/entities/membership-period.entity";
import { MembershipEntity } from "../../src/modern/models/entities/membership.entity";
import { MembershipPeriodMapper } from "../../src/modern/models/mappers/membership-period.mapper";
import { MembershipMapper } from "../../src/modern/models/mappers/membership.mapper";
import { MembershipRepository } from "../../src/modern/repositories/membership.repository";

jest.mock('uuid', () => ({
    v4: () => 'mocked-uuid',
}));


describe('MembershipRepository', () => {
  let db: Database = new Database();
  let repository: MembershipRepository;

  beforeEach(() => {
    db.memberships = []
    db.periods = []

    repository = new MembershipRepository(db);
  });

    it('should return all memberships with their periods mapped to domain', () => {
      const membershipEntity: MembershipEntity = {
        id: 1,
        uuid: 'uuid1',
        name: 'Gold',
        user: 1,
        recurringPrice: 10,
        validFrom: '2025-01-01',
        validUntil: '2025-03-01',
        state: 'active',
        paymentMethod: 'credit card',
        billingInterval: 'monthly',
        billingPeriods: 2,
        assignedBy: 'Admin'
      };

      const periodEntity: MembershipPeriodEntity = {
        id: 1,
        uuid: 'p1',
        membershipId: 1,
        start: '2025-01-01',
        end: '2025-02-01',
        state: 'planned'
      };

      const membership: Membership = { ...membershipEntity, validFrom: new Date('2025-01-01'), validUntil: new Date('2025-03-01') };
      const period: MembershipPeriod = { ...periodEntity, start: new Date('2025-01-01'), end: new Date('2025-02-01') };

      db.memberships.push(membershipEntity);
      db.periods.push(periodEntity);

      const result = repository.findAll();

      expect(result).toEqual([{ membership, periods: [period] }]);
    });

     it('should persist membership and periods and return the container', () => {
      const membership: Membership = {
        id: 0,
        uuid: 'mocked-uuid',
        name: 'Silver',
        user: 2,
        recurringPrice: 20,
        validFrom: new Date('2025-01-01'),
        validUntil: new Date('2025-04-01'),
        state: 'active',
        paymentMethod: 'cash',
        billingInterval: 'monthly',
        billingPeriods: 3,
        assignedBy: 'Admin'
      };

      const period: MembershipPeriod = {
        id: 0,
        uuid: 'mocked-uuid',
        membershipId: 1,
        start: new Date('2025-01-01'),
        end: new Date('2025-02-01'),
        state: 'planned'
      };

      const memEntity: MembershipEntity = {
        ...membership,
        validFrom: '2025-01-01',
        validUntil: '2025-04-01'
      };

      const periodEntity: MembershipPeriodEntity = {
        ...period,
        start: '2025-01-01',
        end: '2025-02-01'
      };

      const result = repository.create({ membership, periods: [period] });

      expect(result).toEqual({ membership, periods: [period] });
      expect(db.memberships).toEqual([memEntity]);
      expect(db.periods).toEqual([periodEntity]);
    });
})