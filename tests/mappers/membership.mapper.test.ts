import { Membership } from "../../src/modern/models/domain/membership";
import { MembershipEntity } from "../../src/modern/models/entities/membership.entity";
import { MembershipMapper } from "../../src/modern/models/mappers/membership.mapper";

jest.mock('uuid', () => ({
    v4: () => 'mocked-uuid',
}));

describe('MembershipMapper', () => {
    const baseDate = new Date('2025-01-01');

    const entity: MembershipEntity = {
        id: 1,
        uuid: 'uuid-123',
        name: 'Gold',
        user: 100,
        recurringPrice: 29.99,
        validFrom: baseDate.toISOString(),
        validUntil: baseDate.toISOString(),
        state: 'active',
        paymentMethod: 'credit card',
        billingInterval: 'monthly',
        billingPeriods: 12,
        assignedBy: 'admin',
    };

    const domain: Membership = {
        id: 1,
        uuid: 'uuid-123',
        name: 'Gold',
        user: 100,
        recurringPrice: 29.99,
        validFrom: baseDate,
        validUntil: baseDate,
        state: 'active',
        paymentMethod: 'credit card',
        billingInterval: 'monthly',
        billingPeriods: 12,
        assignedBy: 'admin',
    };


    it('should convert MembershipEntity to Membership domain model', () => {
        const result = MembershipMapper.toDomain(entity);

        expect(result).toEqual(domain);
    });

    it('should convert Membership domain model to MembershipDto', () => {
        const result = MembershipMapper.toDto(domain);

        expect(result).toEqual({
            ...domain,
            validFrom: '2025-01-01',
            validUntil: '2025-01-01',
        });

    });

    it('should convert Membership domain to MembershipEntity', () => {

        const result = MembershipMapper.toEntity(domain, 0);

        expect(result).toEqual({
            id: 0,
            uuid: 'mocked-uuid',
            name: domain.name,
            validFrom: '2025-01-01',
            validUntil: '2025-01-01',
            user: domain.user,
            recurringPrice: domain.recurringPrice,
            state: domain.state,
            paymentMethod: domain.paymentMethod,
            billingInterval: domain.billingInterval,
            billingPeriods: domain.billingPeriods,
            assignedBy: 'Admin',
        });
    });

})