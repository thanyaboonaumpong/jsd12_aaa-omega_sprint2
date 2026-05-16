import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MessageContext } from "../../contexts/messageContext/MessageContext";
import { PageNotFound, DataNotFound } from "../../components/common/NotFound";
import { StatusOrder } from "../../components/common/SelectStatus";
import { FormatDate } from "../../utils/FormatDate";
import { FormatPrice } from "../../utils/FormatPrice";

export default function AdminOrderItem() {

  const { orders, handleOrderStatusChange } = useContext(MessageContext);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const { orderId } = useParams();
  const order = orderId ? orders.find((item) => item.orderId === orderId) : null;

  const orderInitial = {
    internalNote: order?.internalNote || ""
  };
  const [orderForm, setOrderForm] = useState(orderInitial);
  const handleOrderChange = (event) => setOrderForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const handleOrderSubmit = (event) => {
    event.preventDefault();
    const payload = {...orderForm};
    console.log(payload);
  };
  //const handleOrderReset = () => setOrderForm(orderInitial);

  return (
    <>
      {!orderId || order
        ? <>
            <section id="orderEdit" className="flex flex-row flex-wrap justify-between items-center gap-10">
              <h1><span className="text-content-hover">รายละเอียดคำสั่งซื้อ:</span> {order.orderId?.toUpperCase() || <DataNotFound />}</h1>
              <StatusOrder value={order.status || ""} onChange={(event) => handleOrderStatusChange(order._id, event.target.value)} />
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
                    <th>หมายเหตุ:</th>
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
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.productId}>
                        <td>{item.name || <DataNotFound />}</td>
                        <td>{item.sku || <DataNotFound />}</td>
                        <td className="text-right">{item.quantity > 0 ? item.quantity : <DataNotFound />}</td>
                        <td className="text-right">{item.priceAtPurchase >= 0 ? FormatPrice(item.priceAtPurchase) : <DataNotFound />}</td>
                        <td className="text-right">{item.priceAtPurchase >= 0 && item.quantity > 0 ? FormatPrice(item.priceAtPurchase * item.quantity) : <DataNotFound />}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-neutral-disable">
                      <td></td>
                      <th colSpan="3">ยอดรวมสุทธิ</th>
                      <td className="text-right">{order.totalPrice > 0 ? FormatPrice(order.totalPrice) : <DataNotFound />}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <form className="lg:grow self-start lg:w-1/2" onSubmit={handleOrderSubmit}>
                <div className="input-group">
                  <label htmlFor="internalNote">โน้ตภายใน:</label>
                  <textarea id="internalNote" name="internalNote" rows="5" value={orderForm.internalNote} onChange={handleOrderChange} placeholder="กรอกข้อความตามต้องการ?"></textarea>
                </div>
                <div className="button-row">
                  <button type="button" className="button button-soft button-content" onClick={handleBack}>ยกเลิก</button>
                  <button type="submit" className="button">บันทึกข้อมูล</button>
                </div>
              </form>
            </section>
          </>
        : <PageNotFound text="ไม่พบหน้าคำสั่งซื้อ" />
      }
    </>
  );

};