import { membershipSchema } from "../../src/modern/schema/membership.schema";

describe('membershipSchema', () => {
  const baseData = {
    name: 'Premium',
    recurringPrice: 150,
    paymentMethod: 'credit card',
    billingInterval: 'monthly',
    billingPeriods: 6,
    validFrom: "2025-01-01"
  };

    it('should pass with valid data', () => {
    const result = membershipSchema.safeParse(baseData);
    expect(result.success).toBe(true);
  });

    it('should fail if paymentMethod is cash and price < 100', () => {
    const result = membershipSchema.safeParse({
      ...baseData,
      paymentMethod: 'cash',
      recurringPrice: 50
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('cashPriceBelow100');
  });

  it('should fail if billingInterval is monthly and billingPeriods < 6', () => {
    const result = membershipSchema.safeParse({
      ...baseData,
      billingInterval: 'monthly',
      billingPeriods: 3
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('billingPeriodsLessThan6Months');
  });

  it('should fail if billingInterval is yearly and billingPeriods > 10', () => {
    const result = membershipSchema.safeParse({
      ...baseData,

      billingInterval: 'yearly',
      billingPeriods: 11
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('billingPeriodsMoreThan10Years');
  });

  it('should fail if billingInterval is yearly and billingPeriods < 3', () => {
    const result = membershipSchema.safeParse({
      ...baseData,
      billingInterval: 'yearly',
      billingPeriods: 2
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('billingPeriodsLessThan3Years');
  });

  it('should fail if name is missing', () => {
    const { name, ...dataWithoutName } = baseData;
    const result = membershipSchema.safeParse(dataWithoutName);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe('name');
  });

  it('should fail if recurringPrice is negative', () => {
    const result = membershipSchema.safeParse({
      ...baseData,
      recurringPrice: -100
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe('recurringPrice');
  });

  it('should allow optional validFrom date', () => {
    const { validFrom, ...dataWithoutValidFrom } = baseData;
    const result = membershipSchema.safeParse(dataWithoutValidFrom);
    expect(result.success).toBe(true);
  });

  it('should fail with invalid paymentMethod', () => {
    const result = membershipSchema.safeParse({
      ...baseData,
      paymentMethod: 'bitcoin'
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe('paymentMethod');
  });

  it('should fail with invalid billingInterval', () => {
    const result = membershipSchema.safeParse({
      ...baseData,
      billingInterval: 'daily'
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('invalidBillingInterval');
  });
})