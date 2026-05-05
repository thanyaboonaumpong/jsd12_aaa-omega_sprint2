import { Link } from "react-router-dom";
import StatCard from "../../components/admin/StatCard";

export default function AdminHome() {

  return (
    <>
      <section id="stat">
        <StatCard title="ยอดขาย/เดือน" value="1,543,500" subtext="+18%" />
        <StatCard title="ยอดขายรายชิ้น" value="13,500" subtext="3 ออเดอร์" />
        <StatCard title="ยอดขายยกชุด" value="1,530,000" subtext="7 ออเดอร์" />
        <StatCard title="กำไรโดยประมาณ" value="463,050" subtext="30%" />
        <StatCard title="งานรอดำเนินการ" value="18" subtext="36%" />
        <StatCard title="สินค้าใกล้หมด" value="12" subtext="รายการ" />
      </section>
      <section id="orderList" className="flex flex-row flex-wrap justify-between items-center gap-5">
        <h2>คำสั่งซื้อล่าสุด</h2>
        <div className="table-container xs:order-3">
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
              <tr>
                <td>03/04/2026</td>
                <td><a href="./dashboard-order-item.html">AAA20260027</a></td>
                <td><a href="./dashboard-order-item.html">คุณสมชาย ใจดี</a></td>
                <td className="text-right">28,000</td>
                <td>
                  <select className="button button-soft button-content" name="statusOrder">
                    <option value="" disabled hidden>เลือกสถานะ</option>
                    <option value="pending_payment" selected="selected">รอชำระเงิน</option>
                    <option value="paid">ชำระเงินแล้ว</option>
                    <option value="preparing">กำลังเตรียมสินค้า</option>
                    <option value="shipping">กำลังจัดส่ง</option>
                    <option value="delivered">จัดส่งสำเร็จ</option>
                    <option value="cancelled">ยกเลิกคำสั่งซื้อ</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>01/04/2026</td>
                <td><a href="./dashboard-order-item.html">AAA20260026</a></td>
                <td><a href="./dashboard-order-item.html">บริษัท ไทยธนเกศ จำกัด</a></td>
                <td className="text-right">298,000</td>
                <td>
                  <select className="button button-soft button-content" name="statusOrder">
                    <option value="" disabled hidden>เลือกสถานะ</option>
                    <option value="pending_payment" selected="selected">รอชำระเงิน</option>
                    <option value="paid">ชำระเงินแล้ว</option>
                    <option value="preparing">กำลังเตรียมสินค้า</option>
                    <option value="shipping">กำลังจัดส่ง</option>
                    <option value="delivered">จัดส่งสำเร็จ</option>
                    <option value="cancelled">ยกเลิกคำสั่งซื้อ</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>30/03/2026</td>
                <td><a href="./dashboard-order-item.html">AAA20260025</a></td>
                <td><a href="./dashboard-order-item.html">คุณณัฐวุฒิ ตั้งเจริญ</a></td>
                <td className="text-right">8,300</td>
                <td>
                  <select className="button button-outline button-success" name="statusOrder">
                    <option value="" disabled hidden>เลือกสถานะ</option>
                    <option value="pending_payment">รอชำระเงิน</option>
                    <option value="paid" selected="selected">ชำระเงินแล้ว</option>
                    <option value="preparing">กำลังเตรียมสินค้า</option>
                    <option value="shipping">กำลังจัดส่ง</option>
                    <option value="delivered">จัดส่งสำเร็จ</option>
                    <option value="cancelled">ยกเลิกคำสั่งซื้อ</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>27/03/2026</td>
                <td><a href="./dashboard-order-item.html">AAA20260024</a></td>
                <td><a href="./dashboard-order-item.html">คุณกนกรวรรณ บุญมี</a></td>
                <td className="text-right">2,400</td>
                <td>
                  <select className="button button-outline button-warning" name="statusOrder">
                    <option value="" disabled hidden>เลือกสถานะ</option>
                    <option value="pending_payment">รอชำระเงิน</option>
                    <option value="paid">ชำระเงินแล้ว</option>
                    <option value="preparing" selected="selected">กำลังเตรียมสินค้า</option>
                    <option value="shipping">กำลังจัดส่ง</option>
                    <option value="delivered">จัดส่งสำเร็จ</option>
                    <option value="cancelled">ยกเลิกคำสั่งซื้อ</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>27/03/2026</td>
                <td><a href="./dashboard-order-item.html">AAA20260023</a></td>
                <td><a href="./dashboard-order-item.html">บริษัท พรีเมียร์ เอ็นเนอร์ยี่ จำกัด</a></td>
                <td className="text-right">170,000</td>
                <td>
                  <select className="button button-outline button-success" name="statusOrder">
                    <option value="" disabled hidden>เลือกสถานะ</option>
                    <option value="pending_payment">รอชำระเงิน</option>
                    <option value="paid" selected="selected">ชำระเงินแล้ว</option>
                    <option value="preparing">กำลังเตรียมสินค้า</option>
                    <option value="shipping">กำลังจัดส่ง</option>
                    <option value="delivered">จัดส่งสำเร็จ</option>
                    <option value="cancelled">ยกเลิกคำสั่งซื้อ</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link className="button button-soft button-primary" to="./orders">คำสั่งซื้อทั้งหมด</Link>
      </section>
      <section id="serviceList" className="flex flex-row flex-wrap justify-between items-center gap-5">
        <h2>ตารางนัดหมายวันนี้</h2>
        <div className="table-container xs:order-3">
          <table>
            <colgroup>
              <col className="w-px" />
              <col className="w-px" />
              <col className="w-auto" />
              <col className="w-px" />
              <col className="w-px" />
              <col className="w-px" />
              <col className="w-px" />
            </colgroup> 
            <thead>
              <tr>
                <th scope="col">วันที่นัดหมาย</th>
                <th scope="col">เลขที่คำสั่งซื้อ</th>
                <th scope="col">ชื่อลูกค้า</th>
                <th scope="col">เบอร์ติดต่อ</th>
                <th scope="col">ประเภทงาน</th>
                <th scope="col">ทีมช่าง</th>
                <th scope="col">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>04/04/2026 08:30 น.</td>
                <td><a href="./dashboard-service-item.html">MA20260030</a></td>
                <td><a href="./dashboard-service-item.html">บริษัท เอ็นเนอร์จีวัน จำกัด</a></td>
                <td>02-888-2233</td>
                <td>
                  <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content mr-1" title="ระบบแจ้งเตือนปัญหา รอการเข้าตรวจสอบ"><span className="icon-material">info_i</span></span>
                  ซ่อมบำรุง</td>
                <td>ทีม 2</td>
                <td>
                  <select className="button button-outline button-accent" name="statusService">
                    <option value="" disabled hidden>เลือกสถานะ</option>
                    <option value="request_received">รับคำขอ</option>
                    <option value="scheduled">นัดหมายแล้ว</option>
                    <option value="in_progress" selected="selected">กำลังดำเนินการ</option>
                    <option value="completed">ปิดงานแล้ว</option>
                    <option value="rescheduled">เลื่อนนัด</option>
                    <option value="cancelled">ยกเลิกงาน</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>04/04/2026 11:00 น.</td>
                <td><a href="./dashboard-service-item.html">CL20260031</a></td>
                <td><a href="./dashboard-service-item.html">คุณศุภกฤต วงศ์สวัสดิ์</a></td>
                <td>091-234-7788</td>
                <td>
                  <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content mr-1" title="ทำความสะอาดแผงโซล่าเซลล์ประจำปี"><span className="icon-material">info_i</span></span>
                  ล้างแผง</td>
                <td>ทีม 3</td>
                <td>
                  <select className="button button-outline button-warning" name="statusService">
                    <option value="" disabled hidden>เลือกสถานะ</option>
                    <option value="request_received">รับคำขอ</option>
                    <option value="scheduled">นัดหมายแล้ว</option>
                    <option value="in_progress">กำลังดำเนินการ</option>
                    <option value="completed">ปิดงานแล้ว</option>
                    <option value="rescheduled" selected="selected">เลื่อนนัด</option>
                    <option value="cancelled">ยกเลิกงาน</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>04/04/2026 08:00 น.</td>
                <td><a href="./dashboard-service-item.html">IN20260032</a></td>
                <td><a href="./dashboard-service-item.html">บริษัท กรีนไลฟ์ โซลูชั่น จำกัด</a></td>
                <td>02-456-7890</td>
                <td>
                  <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content mr-1" title="ติดตั้งใหม่ในโครงการบ้านจัดสรร"><span className="icon-material">info_i</span></span>
                  ติดตั้ง</td>
                <td>ทีม 1</td>
                <td>
                  <select className="button button-outline button-accent" name="statusService">
                    <option value="" disabled hidden>เลือกสถานะ</option>
                    <option value="request_received">รับคำขอ</option>
                    <option value="scheduled">นัดหมายแล้ว</option>
                    <option value="in_progress" selected="selected">กำลังดำเนินการ</option>
                    <option value="completed">ปิดงานแล้ว</option>
                    <option value="rescheduled">เลื่อนนัด</option>
                    <option value="cancelled">ยกเลิกงาน</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link className="is-disabled button button-soft button-primary" to="#soon">นัดหมายทั้งหมด</Link>
      </section>
    </>
  );

};