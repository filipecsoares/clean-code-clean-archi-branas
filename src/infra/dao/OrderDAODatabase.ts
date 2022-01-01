import OrderDAO from "../../application/query/OrderDAO";
import OrderDTO from "../../application/query/OrderDTO";
import OrderItemDTO from "../../application/query/OrderItemDTO";
import Connection from '../database/Connection';

export default class OrderDAODatabase implements OrderDAO {

	constructor (readonly connection: Connection) {
	}

	async getOrders(): Promise<OrderDTO[]> {
		const orderData = await this.connection.query("select id_order as id, code, cpf, freight::float, total::float from ccca.order", []);
		return orderData;
	}

	async getOrder(code: string): Promise<OrderDTO> {
		const [orderData] = await this.connection.query("select id_order as id, code, cpf, freight::float, total::float from ccca.order where code = $1", [code]);
		return orderData;
	}

	async getOrderItems(idOrder: number): Promise<OrderItemDTO[]> {
		const orderItemsData = await this.connection.query("select i.description, oi.quantity, oi.price::float from ccca.order_item oi join ccca.item i on (oi.id_item = i.id_item) where id_order = $1", [idOrder]);
		return orderItemsData;
	}

}