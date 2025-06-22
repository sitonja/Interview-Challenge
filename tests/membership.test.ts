import request from 'supertest';
import app from '../src/index';
import membershipMock from './data/memberships.test.json';

describe('Membership API', () => {
    const baseUrl = ""

    it('GET memberships return status Ok', async () => {
        const res = await request(app).get(`${baseUrl}/memberships`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(membershipMock);
    })

    it('given valid body when calling POST endpoint and with 12 month payment endpoint then return 201 and create 12 periods', async () => {
        const membership = {
            "name": "Platinum Plan",
            "recurringPrice": 150.0,
            "paymentMethod": "credit card",
            "billingInterval": "monthly",
            "billingPeriods": 12
        }

        const res = (await request(app).post(`/memberships`)
            .set('Content-Type', 'application/json')
            .send(membership))

        expect(res.status).toBe(201);

        const fetchRes = await request(app).get(`${baseUrl}/memberships`);
        expect(fetchRes.status).toBe(200);
        expect(fetchRes.body.length).toEqual(4);
        expect(fetchRes.body[fetchRes.body.length - 1].periods).toBeTruthy();

        expect(fetchRes.body[fetchRes.body.length - 1].periods.length).toBe(12);
    })

    it('given valid body when calling POST memberships endpoint then return 201', async () => {
        const membership = {
            "name": "Platinum Plan",
            "recurringPrice": 150.0,
            "paymentMethod": "credit card",
            "billingInterval": "monthly",
            "billingPeriods": 12
        }

        const res = (await request(app).post(`${baseUrl}/memberships`)
            .set('Content-Type', 'application/json')
            .send(membership))

        expect(res.status).toBe(201);
    })

    it('given name is falsy when calling POST memberships endpoint then return 400', async () => {
        const membership = {
            "recurringPrice": 150.0,
            "paymentMethod": "credit card",
            "billingInterval": "monthly",
            "billingPeriods": 1
        }

        const res = (await request(app).post('/legacy/memberships')
            .set('Content-Type', 'application/json')
            .send(membership))

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: "missingMandatoryFields" })
    })


    it('given recurring price is falsy when calling POST memberships endpoint then return 400', async () => {
        const membership = {
            "name": "Platinum Plan",
            "paymentMethod": "credit card",
            "billingInterval": "monthly",
            "billingPeriods": 1
        }

        const res = (await request(app).post('/legacy/memberships')
            .set('Content-Type', 'application/json')
            .send(membership))

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: "missingMandatoryFields" })
    })

    it('given recurring price is less then 100 and payment is in cash when calling POST memberships endpoint then return 400', async () => {
        const membership = {
            "name": "Platinum Plan",
            "recurringPrice": 99.0,
            "paymentMethod": "cash",
            "billingInterval": "monthly",
            "billingPeriods": 1
        }

        const res = (await request(app).post('/legacy/memberships')
            .set('Content-Type', 'application/json')
            .send(membership))

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: "cashPriceBelow100" })
    })

    it('given months value is more then 12 when calling POST memberships endpoint then return 400', async () => {
        const membership = {
            "name": "Platinum Plan",
            "recurringPrice": 101,
            "paymentMethod": "cash",
            "billingInterval": "monthly",
            "billingPeriods": 13
        }

        const res = (await request(app).post('/legacy/memberships')
            .set('Content-Type', 'application/json')
            .send(membership))

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: "billingPeriodsMoreThan12Months" })
    })

    it('given months value is less then 6 when calling POST memberships endpoint then return 400', async () => {
        const membership = {
            "name": "Platinum Plan",
            "recurringPrice": 99.0,
            "paymentMethod": "credit card",
            "billingInterval": "monthly",
            "billingPeriods": 2
        }

        const res = (await request(app).post('/legacy/memberships')
            .set('Content-Type', 'application/json')
            .send(membership))

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: "billingPeriodsLessThan6Months" })
    })


    it('given yearly interval and if billing persion is more then 10 when calling POST memberships endpoint then return 400', async () => {
        const membership = {
            "name": "Platinum Plan",
            "recurringPrice": 99.0,
            "paymentMethod": "creadit card",
            "billingInterval": "yearly",
            "billingPeriods": 11
        }

        const res = (await request(app).post('/legacy/memberships')
            .set('Content-Type', 'application/json')
            .send(membership))

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: "billingPeriodsMoreThan10Years" })
    })

    it('given yearly interval and if billing persion is les then 3 years when calling POST memberships endpoint then return 400', async () => {
        const membership = {
            "name": "Platinum Plan",
            "recurringPrice": 103.0,
            "paymentMethod": "cash",
            "billingInterval": "yearly",
            "billingPeriods": 2
        }

        const res = (await request(app).post('/legacy/memberships')
            .set('Content-Type', 'application/json')
            .send(membership))

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: "billingPeriodsLessThan3Years" })
    })


    it('given invalid billing interval when calling POST memberships endpoint then return 400', async () => {
        const membership = {
            "name": "Platinum Plan",
            "recurringPrice": 150.0,
            "paymentMethod": "credit card",
            "billingInterval": "daily",
            "billingPeriods": 1
        }

        const res = (await request(app).post(`${baseUrl}/memberships`)
            .set('Content-Type', 'application/json')
            .send(membership))

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: "invalidBillingInterval" })
    })
})