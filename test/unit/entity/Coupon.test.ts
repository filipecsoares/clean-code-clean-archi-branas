import Coupon from '../../../src/domain/entity/Coupon';

test("Should create a valid discount coupon", () => {
    const coupon = new Coupon("VALE10", 10, new Date("2021-12-31"));
    const today = new Date("2021-12-10");
    expect(coupon.isValid(today)).toBeTruthy();
});

test("Should create a discount coupon expired", () => {
    const coupon = new Coupon("VALE10", 10, new Date("2021-10-01"));
    const today = new Date("2021-12-10");
    expect(coupon.isExpired(today)).toBeTruthy();
});