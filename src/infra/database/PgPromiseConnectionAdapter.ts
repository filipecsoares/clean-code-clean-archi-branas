import Connection from './Connection';
import pgp from 'pg-promise';

export default class PgPromiseConnectionAdapter implements Connection {
    private pgp: any;
    
    constructor() {
        this.pgp = pgp()("postgres://postgres:postgres@localhost:5432/appccca");
    }
    
    public async query(statement: string, params: any[]): Promise<any> {
        return this.pgp.query(statement, params);
    }
}