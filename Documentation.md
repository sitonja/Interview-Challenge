# Eversport Task Assignment

The task is to modernize a legacy backend codebase

1. install the neccessary dependencies
2. initialize Git repo

The goal is to rewrite this code to a clean and readable modern codebase by implementing the Typescript support.

I will describe here improvements in an iterative style from the simplest and fastest to develop to more complex ones.

Upon taking a quick overview we can find 2 rest enpoints:

* GET endpoint for fetching all the memberships
* POST endpoint for creating a membership

Currently there are 3 big areas to improve and implement:

* Validation when creating
* Tests
* Types with typescript
* SOC - separation of concerns

## Incosistent naming

Meanwhile it seems there is another problem. Namely, in the GET endpoint codebase there is this line of code:

```javascript
const periods = membershipPeriods.filter(p => p.membershipId === membership.id)
```

But the problem is that the `MembershipPeriod` object does not have a `membershipId` field. Upon inspection I will asume that the `membership` variable is the id and rename it so that the code works.

## Api Tests

A wrote tests because everything in legacy code has to work also in modern codebase. By writing tests first I can improve certainty that the new codebase will have the same output. 

In order to test the Rest endpoint I added supertest package. Usually the e2e tests are done with a library like `Cypress` so even if this is here not the case I still added a separate e2e folder and config so I can separate the unit and e2e tests. By writing tests it gives me a way to reverse engineer the codebase and not to forget, example some validations.

## Types
Let's implement the domain types. I added a membershipPeriods var in Membership because I don't want to have direct access to periods withouth the need to iterate through all of them. From a logical, domain perspective the relationship should be that the Membership has Periods and I want to reflect it in my models.