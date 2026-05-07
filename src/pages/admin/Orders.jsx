import { Link, useNavigate } from "react-router-dom";
import StatCard from "../../components/admin/StatCard";
import { FormatDate } from "../../utils/FormatDate";
import { FormatPrice } from "../../utils/FormatPrice";
import { DataNotFound } from "../../utils/DataNotFound";
import { orders } from "../../mockup-data/orders";

export default function AdminOrders() {

  const navigate = useNavigate();
  const handleOrderItem = (orderId) => navigate(`./${orderId}`);

  return (
    <>
      <section id="stat">
        <StatCard title="ยอดขาย/เดือน" value="1,543,500" subtext="+18%" />
        <StatCard title="จำนวนออเดอร์" value="10" subtext="+6" />
        <StatCard title="มูลค่าเฉลี่ยต่อออเดอร์" value="154,350" subtext="-5%" />
        <StatCard title="ยอดขายรายชิ้น" value="13,500" subtext="3 ออเดอร์" />
        <StatCard title="ยอดขายยกชุด" value="1,530,000" subtext="7 ออเดอร์" />
        <StatCard title="กำไรโดยประมาณ" value="463,050" subtext="30%" />
      </section>
      <section id="orderList" className="flex flex-row flex-wrap justify-between items-center gap-5">
        <h1>รายการคำสั่งซื้อ</h1>
        <div className="table-container">
          <table>
            <colgroup>
              <col className="w-px" />
              <col className="w-px" />
              <col className="w-auto" />
              <col className="w-px" />
              <col className="w-px" />
            </colgroup> 
            <thead>
              <tr>
                <th scope="col">วันที่สั่งซื้อ</th>
                <th scope="col">เลขที่คำสั่งซื้อ</th>
                <th scope="col">ชื่อผู้สั่งซื้อ</th>
                <th scope="col" className="text-right">ยอดรวมสุทธิ</th>
                <th scope="col">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {[...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10).map((order) => (
                <tr key={order._id}>
                  <td>{order.createdAt ? FormatDate(order.createdAt) : <DataNotFound />}</td>
                  <td><button onClick={() => handleOrderItem(order.orderId)}>{order.orderId?.toUpperCase() || <DataNotFound />}</button></td>
                  <td><button onClick={() => handleOrderItem(order.orderId)}>
                    {order.customer.company ||
                      (order.customer.firstName || order.customer.lastName
                        ? `คุณ${order.customer.firstName} ${order.customer.lastName}`.trim()
                        : <DataNotFound />)
                    }</button>
                  </td>
                  <td className="text-right">{order.totalPrice > 0 ? FormatPrice(order.totalPrice) : <DataNotFound />}</td>
                  <td>
                    <select className="button button-soft button-content" name="statusOrder" defaultValue={order.status || ""}>
                      <option value="" disabled hidden>เลือกสถานะ</option>
                      <option value="open">รอชำระเงิน</option>
                      <option value="paid">ชำระเงินแล้ว</option>
                      <option value="preparing">กำลังเตรียมสินค้า</option>
                      <option value="shipping">กำลังจัดส่ง</option>
                      <option value="delivered">จัดส่งสำเร็จ</option>
                      <option value="cancelled">ยกเลิกคำสั่งซื้อ</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav className="pagination">
          <Link className="button button-icon button-soft button-content is-disabled" to="#pagination"><span className="icon-material">keyboard_arrow_left</span></Link>
          <Link className="button button-icon button-primary" to="#pagination">1</Link>
          <Link className="button button-icon button-soft button-content" to="#pagination">2</Link>
          <Link className="button button-icon button-soft button-content" to="#pagination">3</Link>
          <Link className="button button-icon button-soft button-content" to="#pagination"><span className="icon-material">keyboard_arrow_right</span></Link>
        </nav>
      </section>
    </>
  );

};