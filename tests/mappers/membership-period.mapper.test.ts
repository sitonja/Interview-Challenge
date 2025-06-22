import { MembershipPeriod } from "../../src/modern/models/domain/membership-period";
import { MembershipPeriodEntity } from "../../src/modern/models/entities/membership-period.entity";
import { MembershipPeriodMapper } from "../../src/modern/models/mappers/membership-period.mapper";

jest.mock('uuid', () => ({
    v4: () => 'mocked-uuid',
}));

describe('MembershipPeriodMapper', () => {
  const start = new Date('2025-01-01');
  const end = new Date('2025-06-01');

  const entity: MembershipPeriodEntity = {
    id: 1,
    uuid: 'uuid-123',
    membershipId: 1,
    start: start.toISOString(),
    end: end.toISOString(),
    state: 'planned',
  };

  const domain: MembershipPeriod = {
    id: 1,
    uuid: 'uuid-123',
    membershipId: 1,
    start,
    end,
    state: 'planned',
  };

   it('should map entity to domain correctly', () => {
      const result = MembershipPeriodMapper.toDomain(entity);

      expect(result).toEqual(domain);
    });

        it('should map domain to DTO with formatted dates', () => {
      const result = MembershipPeriodMapper.toDto(domain);

      expect(result).toEqual({
        id: domain.id,
        uuid: domain.uuid,
        membershipId: domain.membershipId,
        start: '2025-01-01',
        end: '2025-06-01',
        state: domain.state,
      });
    });

     it('should map domain to entity with new uuid and formatted dates', () => {
      const result = MembershipPeriodMapper.toEntity(domain, 1, 1);

      expect(result).toEqual({
        id: 1,
        uuid: 'mocked-uuid',
        membershipId: domain.membershipId,
        start: '2025-01-01',
        end: '2025-06-01',
        state: domain.state,
      });
    });

})