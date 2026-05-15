import { TextNotFound } from "./DataNotFound";

export const StatusOrder = ({ value = "", onChange = null }) => {

  const status = {
    "": { text:"ไม่พบข้อมูล", color:"button-soft button-content" },
    open: { text:"รอชำระเงิน", color:"button-soft button-content" },
    paid: { text:"ชำระเงินแล้ว", color:"button-outline button-success" },
    preparing: { text:"กำลังเตรียมสินค้า", color:"button-outline button-warning" },
    shipping: { text:"กำลังจัดส่ง", color:"button-outline button-accent" },
    delivered: { text:"จัดส่งสำเร็จ", color:"button-success" },
    cancelled: { text:"ยกเลิกคำสั่งซื้อ", color:"button-soft button-error" },
  };

  return (
    onChange
      ? <select className={`button ${status[value]?.color || ""}`} name="statusOrder" value={value} onChange={onChange}>
          <option value="" disabled hidden>เลือกสถานะ</option>
          {Object.entries(status).map(([key, item]) => key 
            ? <option key={key} value={key}>{item.text}</option>
            : null
          )}
        </select>
      : <span className={`cursor-default button ${status[value]?.color || ""}`}>{status[value]?.text || TextNotFound}</span>
  );

};

export const StatusService = ({ value = "", onChange = null }) => {

  const status = {
    "": { text:"ไม่พบข้อมูล", color:"button-soft button-content" },
    request_received: { text:"รับคำขอ", color:"button-soft button-content" },
    scheduled: { text:"นัดหมายแล้ว", color:"button-outline button-success" },
    in_progress: { text:"กำลังดำเนินการ", color:"button-outline button-accent" },
    completed: { text:"ปิดงานแล้ว", color:"button-success" },
    rescheduled: { text:"เลื่อนนัด", color:"button-outline button-warning" },
    cancelled: { text:"ยกเลิกงาน", color:"button-soft button-error" },
  };

  return (
    onChange
      ? <select className={`button ${status[value]?.color || ""}`} name="statusService" value={value} onChange={onChange}>
          <option value="" disabled hidden>เลือกสถานะ</option>
          {Object.entries(status).map(([key, item]) => key 
            ? <option key={key} value={key}>{item.text}</option>
            : null
          )}
        </select>
      : <span className={`cursor-default button ${status[value]?.color || ""}`}>{status[value]?.text || TextNotFound}</span>
  );

};