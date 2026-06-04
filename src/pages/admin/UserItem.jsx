import { useParams } from "react-router-dom";
import { DataNotFound } from "../../utils/DataNotFound";
import { users } from "../../mockup-data/users";

export default function AdminUserItem() {

  const { userId } = useParams();
  const user = users.find((item) => item.userId === Number(userId));

  if (!user) {
    return "User not found.";
  }

  return (
    <>
      <section id="userProfile" className="flex flex-row flex-wrap justify-between items-center gap-10">
        <h1>รายละเอียดบัญชี</h1>
        <a className="button button-soft button-primary w-full xs:w-fit" href="./dashboard-account-edit.html">แก้ไขข้อมูลผู้ใช้</a>
        <table className="table-responsive">
          <colgroup>
            <col className="w-px" />
            <col className="w-auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>ชื่อผู้สั่งชื่อ</th>
              <td>
                {user.firstName || user.lastName
                  ? `คุณ${user.firstName} ${user.lastName}`.trim()
                  : <DataNotFound />}</td>
            </tr>
            {user.company &&
              <tr>
                <th>ชื่อบริษัท</th>
                <td>{user.company}</td>
              </tr>
            }
            {user.taxId &&
              <tr>
                <th>เลขประจำตัว<br className="max-2xs:hidden" />ผู้เสียภาษีอากร</th>
                <td>{user.taxId}</td>
              </tr>
            }
            <tr>
              <th>เบอร์ติดต่อ</th>
              <td>{user.phone || <DataNotFound />}</td>
            </tr>
            {user.phone2 &&
              <tr>
                <th>เบอร์สำรอง</th>
                <td>{user.phone2}</td>
              </tr>
            }
            <tr>
              <th>อีเมล</th>
              <td>{user.email || <DataNotFound />}</td>
            </tr>
            <tr>
              <th>ที่อยู่จัดส่ง</th>
              <td>
                {user.addresses?.length > 0
                  ? user.addresses.map((address, index) => (
                      <div key={index}>
                        {address.label && <span className="badge badge-soft badge-primary mr-2">{address.label}</span>}
                        <span>
                          {address.addressLine || address.subdistrict || address.district
                            ? `${address.addressLine} ${address.subdistrict} ${address.district} ${address.province} ${address.postcode}`.trim()
                            : <DataNotFound />}
                        </span>
                      </div>
                  ))
                  : <DataNotFound />}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      {/*
      <section id="orderList" className="flex flex-row flex-wrap justify-between items-center gap-5">
        <h2>รายการคำสั่งซื้อ</h2>
        <div className="table-container">
          <table>
            <colgroup>
              <col className="w-px" />
              <col className="w-auto" />
              <col className="w-px" />
              <col className="w-px" />
            </colgroup> 
            <thead>
              <tr>
                <th scope="col">วันที่สั่งซื้อ</th>
                <th scope="col">เลขที่คำสั่งซื้อ</th>
                <th scope="col" className="text-right">ยอดรวมสุทธิ</th>
                <th scope="col">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>09/03/2026</td>
                <td><a href="./dashboard-account-order-item.html">AAA20260015</a></td>
                <td className="text-right">850</td>
                <td><span className="button button-success cursor-default">จัดส่งสำเร็จ</span></td>
              </tr>
              <tr>
                <td>28/02/2026</td>
                <td><a href="./dashboard-account-order-item.html">AAA20260011</a></td>
                <td className="text-right">5,500</td>
                <td><span className="button button-success cursor-default">จัดส่งสำเร็จ</span></td>
              </tr>
              <tr>
                <td>25/02/2026</td>
                <td><a href="./dashboard-account-order-item.html">AAA20260008</a></td>
                <td className="text-right">89,000</td>
                <td><span className="button button-success cursor-default">จัดส่งสำเร็จ</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <button className="button button-soft button-content w-full xs:w-fit" onclick="history.back();"><span className="icon-material">keyboard_arrow_left</span> ย้อนกลับ</button>
      */}
    </>
  );

};