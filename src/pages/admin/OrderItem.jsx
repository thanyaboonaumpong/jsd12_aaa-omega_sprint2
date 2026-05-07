import { useParams } from "react-router-dom";
import { FormatDate } from "../../utils/FormatDate";
import { FormatPrice } from "../../utils/FormatPrice";
import { DataNotFound } from "../../utils/DataNotFound";
import { orders } from "../../mockup-data/orders";

export default function AdminOrderItem() {

  const { orderId } = useParams();
  const order = orders.find((item) => item.orderId === orderId);

  if (!order) {
    return "Order not found.";
  }

  return (
    <>
      <section id="orderEdit" className="flex flex-row flex-wrap justify-between items-center gap-10">
        <h1><span className="text-content-hover">รายละเอียดคำสั่งซื้อ:</span> {order.orderId?.toUpperCase() || <DataNotFound />}</h1>
        <select className="button button-soft button-content" name="statusOrder" defaultValue={order.status || ""}>
          <option value="" disabled hidden>เลือกสถานะ</option>
          <option value="open">รอชำระเงิน</option>
          <option value="paid">ชำระเงินแล้ว</option>
          <option value="preparing">กำลังเตรียมสินค้า</option>
          <option value="shipping">กำลังจัดส่ง</option>
          <option value="delivered">จัดส่งสำเร็จ</option>
          <option value="cancelled">ยกเลิกคำสั่งซื้อ</option>
        </select>
        <table className="table-responsive">
          <colgroup>
            <col className="w-px" />
            <col className="w-auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>วันที่สั่งซื้อ</th>
              <td>{order.createdAt ? FormatDate(order.createdAt) : <DataNotFound />}</td>
            </tr>
            <tr>
              <th>ชื่อผู้สั่งชื่อ</th>
              <td>
                {order.customer.firstName || order.customer.lastName
                  ? `คุณ${order.customer.firstName} ${order.customer.lastName}`.trim()
                  : <DataNotFound />}
              </td>
            </tr>
            {order.customer.company &&
              <tr>
                <th>ชื่อบริษัท</th>
                <td>{order.customer.company}</td>
              </tr>
            }
            {order.customer.taxId &&
              <tr>
                <th>เลขประจำตัว<br className="max-2xs:hidden" />ผู้เสียภาษีอากร</th>
                <td>{order.customer.taxId}</td>
              </tr>
            }
            <tr>
              <th>เบอร์ติดต่อ</th>
              <td>{order.customer.phone || <DataNotFound />}</td>
            </tr>
            {order.customer.phone2 &&
              <tr>
                <th>เบอร์สำรอง</th>
                <td>{order.customer.phone2}</td>
              </tr>
            }
            <tr>
              <th>อีเมล</th>
              <td>{order.customer.email || <DataNotFound />}</td>
            </tr>
            <tr>
              <th>ที่อยู่จัดส่ง</th>
              <td>
                {order.customer.shippingAddress.addressLine || order.customer.shippingAddress.subdistrict || order.customer.shippingAddress.district
                  ? `${order.customer.shippingAddress.addressLine} ${order.customer.shippingAddress.subdistrict} ${order.customer.shippingAddress.district} ${order.customer.shippingAddress.province} ${order.customer.shippingAddress.postcode}`.trim()
                  : <DataNotFound />}</td>
            </tr>
            <tr>
              <th>หมายเหตุ</th>
              <td>{order.orderNote || <DataNotFound />}</td>
            </tr>
          </tbody>
        </table>
        <div className="table-container">
          <table>
            <colgroup>
              <col className="w-auto" />
              <col className="w-px" />
              <col className="w-px" />
              <col className="w-px" />
              <col className="w-px" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">รายการ</th>
                <th scope="col">รหัสสินค้า</th>
                <th scope="col" className="text-right">จำนวน</th>
                <th scope="col" className="text-right">ราคา/หน่วย</th>
                <th scope="col" className="text-right">ราคารวม</th>
              </tr>
            </thead>
            {<tbody>
              {order.items.map((item) => (
                <tr key={item.productId}>
                  <td>{item.name || <DataNotFound />}</td>
                  <td>{item.sku || <DataNotFound />}</td>
                  <td className="text-right">{item.quantity > 0 ? item.quantity : <DataNotFound />}</td>
                  <td className="text-right">{item.priceAtPurchase >= 0 ? FormatPrice(item.priceAtPurchase) : <DataNotFound />}</td>
                  <td className="text-right">{item.priceAtPurchase >= 0 && item.quantity > 0 ? FormatPrice(item.priceAtPurchase * item.quantity) : <DataNotFound />}</td>
                </tr>
              ))}
            </tbody>}
            <tfoot>
              <tr className="border-t-neutral-disable">
                <td></td>
                <th colSpan="3">ยอดรวมสุทธิ</th>
                <td className="text-right">{order.totalPrice > 0 ? FormatPrice(order.totalPrice) : <DataNotFound />}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <form className="lg:grow self-start lg:w-1/2">
          <div className="input-group">
            <label htmlFor="note">โน้ตภายใน:</label>
            <textarea id="note" className="min-h-15.5 sm:min-h-38" rows="4" defaultValue={order.internalNote || ""} placeholder="กรอกข้อความตามต้องการ?"></textarea>
          </div>
          <div className="button-row">
            <button type="reset" className="button button-soft button-content">ยกเลิก</button>
            <button type="submit" className="button">บันทึก</button>
          </div>
        </form>
      </section>
    </>
  );

};