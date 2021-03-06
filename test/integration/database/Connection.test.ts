import PgPromiseConnectionAdapter from '../../../src/infra/database/PgPromiseConnectionAdapter';

test("Should create a connection with the database", async () => {
    const connection = PgPromiseConnectionAdapter.getInstance();
    const items = await connection.query("select * from ccca.item", []);
    expect(items.length).toBe(6);
});