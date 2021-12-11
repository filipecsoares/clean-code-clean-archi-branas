import OrderCode from '../../src/domain/entity/OrderCode';

test("Should generate an order code", () => {
    const date = new Date("2021-12-31");
    const sequence = 1;
    const orderCode = new OrderCode(date, sequence);
    expect(orderCode.value).toBe("202100000001");
});

test("Should not generate an order code with invalid date", () => {
    const date = null;
    const sequence = 1;
    expect(() => { new OrderCode(date, sequence); }).toThrow("Invalid date");
});

test("Should not generate an order code with invalid sequence", () => {
    const date = new Date("2021-12-31");
    const sequence = 0;
    expect(() => { new OrderCode(date, sequence); }).toThrow("Invalid sequence");
});