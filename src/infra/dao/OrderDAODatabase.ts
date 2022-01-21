import OrderDAO from "../../application/dao/OrderDAO";
import Connection from "../database/Connection";

export default class OrderDAODatabase implements OrderDAO {

	constructor (readonly connection: Connection) {
	}

	async get(code: string): Promise<any> {
		const order = await this.connection.query("select code, total::float from ccca.order where code = $1", [code]);
		return order;
	}

	async findAll(): Promise<any> {
		const orders = await this.connection.query("select code, total::float from ccca.order", []);
		return orders;
	}
}