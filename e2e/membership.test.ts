import request from 'supertest';
import app from '../src/index';
import membershipMock from './data/memberships.test.json';

describe('Membership API', () => {
const baseUrl = "/legacy"

    it('GET memberships return status Ok', async () => {
        const res = await request(app).get(`${baseUrl}/memberships`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(membershipMock);
    })

    it('given valid body when calling POST memberships endpoint then return 201', async () => {
        const membership = {
            "name": "Platinum Plan",
            "recurringPrice": 150.0,
            "paymentMethod": "credit card",
            "billingInterval": "monthly",
            "billingPeriods": 1
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
        expect(res.body).toEqual({message: "missingMandatoryFields"})
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
        expect(res.body).toEqual({message: "missingMandatoryFields"})
    })

    it('given recurring price is bigger then 100 and payment is in cash when calling POST memberships endpoint then return 400', async () => {
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
        expect(res.body).toEqual({message: "cashPriceBelow100"})
    })

})