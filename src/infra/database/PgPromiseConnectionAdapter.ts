import Connection from './Connection';
import pgp from 'pg-promise';

export default class PgPromiseConnectionAdapter implements Connection {
    private pgp: any;
    static instance: PgPromiseConnectionAdapter;
    
    private constructor() {
        this.pgp = pgp()("postgres://postgres:postgres@localhost:5432/appccca");
    }

    static getInstance(): PgPromiseConnectionAdapter {
        if (!PgPromiseConnectionAdapter.instance) {
            PgPromiseConnectionAdapter.instance = new PgPromiseConnectionAdapter();
        }
        return PgPromiseConnectionAdapter.instance;
    }
    
    public async query(statement: string, params: any[]): Promise<any> {
        return this.pgp.query(statement, params);
    }
}