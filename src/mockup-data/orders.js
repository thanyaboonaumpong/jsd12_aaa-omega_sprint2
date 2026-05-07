export const orders = [
  {
    _id: "mock1",
    orderId: "AAA20260027",
    userId: "user1",
    customerName: "คุณสมชาย ใจดี",
    customerPhone: "0812345678",
    customerEmail: "somchai@example.com",
    paymentMethod: "bank_transfer",
    shippingAddress: "กรุงเทพมหานคร บางนา",
    items: [
      { productId: "product20260001", name: "Solar Panel 550W Mono", sku: "SP-550W-MONO", priceAtPurchase: 6950, quantity: 3 },
      { productId: "product20260002", name: "Hybrid Inverter 5kW", sku: "INV-5KW-HY", priceAtPurchase: 14200, quantity: 1 }
    ],
    totalPrice: 35050,
    status: "open",
    createdAt: "2026-04-03T09:15:23.120Z",
    updatedAt: "2026-04-03T10:02:11.512Z"
  }, {
    _id: "mock2",
    orderId: "AAA20260026",
    userId: "user2",
    customerName: "บริษัท ไทยธนเกศ จำกัด",
    customerPhone: "021234567",
    customerEmail: "contact@thaithanaket.co.th",
    paymentMethod: "credit_card",
    shippingAddress: "สมุทรปราการ เมือง",
    items: [
      { productId: "product20260003", name: "Solar Panel 600W Bifacial", sku: "SP-600W-BI", priceAtPurchase: 8850, quantity: 18 },
      { productId: "product20260004", name: "On-Grid Inverter 10kW", sku: "INV-10KW-ON", priceAtPurchase: 37500, quantity: 2 }
    ],
    totalPrice: 299300,
    status: "open",
    createdAt: "2026-04-01T14:42:11.000Z",
    updatedAt: "2026-04-01T15:10:45.222Z"
  }, {
    _id: "mock3",
    orderId: "AAA20260025",
    userId: "user3",
    customerName: "คุณณัฐวุฒิ ตั้งเจริญ",
    customerPhone: "0891112233",
    customerEmail: "nattawut@gmail.com",
    paymentMethod: "promptpay",
    shippingAddress: "ชลบุรี ศรีราชา",
    items: [
      { productId: "product20260005", name: "DC Cable 6mm", sku: "DC-6MM", priceAtPurchase: 820, quantity: 10 }
    ],
    totalPrice: 8200,
    status: "paid",
    createdAt: "2026-03-30T11:20:00.000Z",
    updatedAt: "2026-03-30T12:00:00.000Z"
  },  {
    _id: "mock4",
    orderId: "AAA20260024",
    userId: "user4",
    customerName: "คุณกนกรวรรณ บุญมี",
    customerPhone: "0822223344",
    customerEmail: "kanokwan@mail.com",
    paymentMethod: "bank_transfer",
    shippingAddress: "นนทบุรี ปากเกร็ด",
    items: [
      { productId: "product20260006", name: "MC4 Connector", sku: "MC4-CON", priceAtPurchase: 210, quantity: 6 },
      { productId: "product20260007", name: "Mounting Rail", sku: "MNT-RAIL", priceAtPurchase: 580, quantity: 2 }
    ],
    totalPrice: 2420,
    status: "preparing",
    createdAt: "2026-03-27T08:10:00.000Z",
    updatedAt: "2026-03-27T09:00:00.000Z"
  }, {
    _id: "mock5",
    orderId: "AAA20260023",
    userId: "user5",
    customerName: "บริษัท พรีเมียร์ เอ็นเนอร์ยี่ จำกัด",
    customerPhone: "029999888",
    customerEmail: "sales@premierenergy.co.th",
    paymentMethod: "credit_card",
    shippingAddress: "ระยอง เมือง",
    items: [
      { productId: "product20260008", name: "Solar Panel 550W Mono", sku: "SP-550W-MONO", priceAtPurchase: 8400, quantity: 20 }
    ],
    totalPrice: 168000,
    status: "paid",
    createdAt: "2026-03-27T07:00:00.000Z",
    updatedAt: "2026-03-27T07:30:00.000Z"
  }, {
    _id: "mock6",
    orderId: "AAA20260022",
    userId: "user6",
    customerName: "คุณอภิสิทธิ์ วัฒนกุล",
    customerPhone: "0867776666",
    customerEmail: "apisit@mail.com",
    paymentMethod: "bank_transfer",
    shippingAddress: "กรุงเทพมหานคร ลาดพร้าว",
    items: [
      { productId: "product20260009", name: "Hybrid Inverter 8kW", sku: "INV-8KW-HY", priceAtPurchase: 27800, quantity: 3 },
      { productId: "product20260010", name: "Battery Lithium 5kWh", sku: "BAT-5KWH", priceAtPurchase: 54500, quantity: 1 }
    ],
    totalPrice: 138900,
    status: "shipping",
    createdAt: "2026-03-26T13:45:00.000Z",
    updatedAt: "2026-03-26T14:10:00.000Z"
  }, {
    _id: "mock7",
    orderId: "AAA20260021",
    userId: "user7",
    customerName: "บริษัท ซันโซน เอ็นจิเนียริ่ง จำกัด",
    customerPhone: "023456789",
    customerEmail: "info@sunzone.co.th",
    paymentMethod: "bank_transfer",
    shippingAddress: "นครปฐม",
    items: [
      { productId: "product20260011", name: "Solar Panel 600W Bifacial", sku: "SP-600W-BI", priceAtPurchase: 8600, quantity: 22 }
    ],
    totalPrice: 189200,
    status: "cancelled",
    createdAt: "2026-03-20T10:00:00.000Z",
    updatedAt: "2026-03-20T10:30:00.000Z"
  }, {
    _id: "mock8",
    orderId: "AAA20260020",
    userId: "user8",
    customerName: "คุณพิมพ์ชนก วัฒนกุล",
    customerPhone: "0819990000",
    customerEmail: "pimchanok@gmail.com",
    paymentMethod: "promptpay",
    shippingAddress: "เชียงใหม่",
    items: [
      { productId: "product20260012", name: "Inverter 5kW Hybrid", sku: "INV-5KW-HY", priceAtPurchase: 93000, quantity: 1 }
    ],
    totalPrice: 93000,
    status: "delivered",
    createdAt: "2026-03-19T09:00:00.000Z",
    updatedAt: "2026-03-19T09:40:00.000Z"
  }, {
    _id: "mock9",
    orderId: "AAA20260019",
    userId: "user9",
    customerName: "บริษัท อัลฟ่า โซลาร์ กรุ๊ป จำกัด",
    customerPhone: "025555666",
    customerEmail: "contact@alpha-solar.co.th",
    paymentMethod: "credit_card",
    shippingAddress: "ปทุมธานี",
    items: [
      { productId: "product20260013", name: "Solar Panel 600W Bifacial", sku: "SP-600W-BI", priceAtPurchase: 8000, quantity: 40 }
    ],
    totalPrice: 320000,
    status: "delivered",
    createdAt: "2026-03-16T15:00:00.000Z",
    updatedAt: "2026-03-16T16:00:00.000Z"
  }, {
    _id: "mock10",
    orderId: "AAA20260018",
    userId: "user10",
    customerName: "บริษัท เน็กซ์เจน เพาเวอร์ จำกัด",
    customerPhone: "027777888",
    customerEmail: "sales@nextgenpower.co.th",
    paymentMethod: "credit_card",
    shippingAddress: "ชลบุรี",
    items: [
      { productId: "product20260014", name: "Battery Lithium 10kWh", sku: "BAT-10KWH", priceAtPurchase: 152000, quantity: 3 }
    ],
    totalPrice: 456000,
    status: "delivered",
    createdAt: "2026-03-11T11:00:00.000Z",
    updatedAt: "2026-03-11T12:00:00.000Z"
  }, {
    _id: "mock11",
    orderId: "AAA20260017",
    userId: "user11",
    customerName: "คุณธีรภัทร์",
    customerPhone: "0811111111",
    customerEmail: "teerapat@mail.com",
    paymentMethod: "promptpay",
    shippingAddress: "อยุธยา",
    items: [
      { productId: "product20260015", name: "MC4 Connector", sku: "MC4-CON", priceAtPurchase: 200, quantity: 10 }
    ],
    totalPrice: 2000,
    status: "paid",
    createdAt: "2026-03-10T10:00:00.000Z",
    updatedAt: "2026-03-10T10:20:00.000Z"
  }, {
    _id: "mock12",
    orderId: "AAA20260016",
    userId: "user12",
    customerName: "บริษัท โซลาร์ไทย จำกัด",
    customerPhone: "021111111",
    customerEmail: "info@solarthai.co.th",
    paymentMethod: "bank_transfer",
    shippingAddress: "นครราชสีมา",
    items: [
      { productId: "product20260016", name: "Solar Panel 550W Mono", sku: "SP-550W-MONO", priceAtPurchase: 7000, quantity: 10 }
    ],
    totalPrice: 70000,
    status: "shipping",
    createdAt: "2026-03-08T08:00:00.000Z",
    updatedAt: "2026-03-08T09:00:00.000Z"
  }, {
    _id: "mock13",
    orderId: "AAA20260015",
    userId: "user13",
    customerName: "คุณกิตติ",
    customerPhone: "0898888888",
    customerEmail: "kitti@mail.com",
    paymentMethod: "credit_card",
    shippingAddress: "ภูเก็ต",
    items: [
      { productId: "product20260017", name: "Battery Lithium 5kWh", sku: "BAT-5KWH", priceAtPurchase: 54000, quantity: 1 }
    ],
    totalPrice: 54000,
    status: "completed",
    createdAt: "2026-03-06T14:00:00.000Z",
    updatedAt: "2026-03-06T15:00:00.000Z"
  }, {
    _id: "mock14",
    orderId: "AAA20260014",
    userId: "user14",
    customerName: "บริษัท กรีนพาวเวอร์ จำกัด",
    customerPhone: "026666666",
    customerEmail: "green@power.co.th",
    paymentMethod: "bank_transfer",
    shippingAddress: "ลำปาง",
    items: [
      { productId: "product20260018", name: "Solar Panel 600W", sku: "SP-600W", priceAtPurchase: 8800, quantity: 15 }
    ],
    totalPrice: 132000,
    status: "completed",
    createdAt: "2026-03-05T10:00:00.000Z",
    updatedAt: "2026-03-05T11:00:00.000Z"
  }, {
    _id: "mock15",
    orderId: "AAA20260013",
    userId: "user15",
    customerName: "คุณอรทัย",
    customerPhone: "0812222222",
    customerEmail: "ornthai@mail.com",
    paymentMethod: "promptpay",
    shippingAddress: "ขอนแก่น",
    items: [
      { productId: "product20260019", name: "Inverter 3kW", sku: "INV-3KW", priceAtPurchase: 12000, quantity: 1 }
    ],
    totalPrice: 12000,
    status: "paid",
    createdAt: "2026-03-04T09:00:00.000Z",
    updatedAt: "2026-03-04T09:20:00.000Z"
  }, {
    _id: "mock16",
    orderId: "AAA20260012",
    userId: "user16",
    customerName: "บริษัท โซลาร์อีสาน",
    customerPhone: "043333333",
    customerEmail: "esan@solar.co.th",
    paymentMethod: "bank_transfer",
    shippingAddress: "อุดรธานี",
    items: [
      { productId: "product20260020", name: "Solar Panel 550W", sku: "SP-550W", priceAtPurchase: 6900, quantity: 12 }
    ],
    totalPrice: 82800,
    status: "shipping",
    createdAt: "2026-03-03T10:00:00.000Z",
    updatedAt: "2026-03-03T10:40:00.000Z"
  }, {
    _id: "mock17",
    orderId: "AAA20260011",
    userId: "user17",
    customerName: "คุณธนา",
    customerPhone: "0855555555",
    customerEmail: "thana@mail.com",
    paymentMethod: "promptpay",
    shippingAddress: "สุราษฎร์ธานี",
    items: [
      { productId: "product20260021", name: "MC4 Connector", sku: "MC4-CON", priceAtPurchase: 210, quantity: 20 }
    ],
    totalPrice: 4200,
    status: "completed",
    createdAt: "2026-03-02T12:00:00.000Z",
    updatedAt: "2026-03-02T12:30:00.000Z"
  }, {
    _id: "mock18",
    orderId: "AAA20260010",
    userId: "user18",
    customerName: "บริษัท พลังงานสะอาด",
    customerPhone: "022222222",
    customerEmail: "cleanenergy@co.th",
    paymentMethod: "credit_card",
    shippingAddress: "เชียงราย",
    items: [
      { productId: "product20260022", name: "Battery 10kWh", sku: "BAT-10KWH", priceAtPurchase: 150000, quantity: 2 }
    ],
    totalPrice: 300000,
    status: "completed",
    createdAt: "2026-03-01T09:00:00.000Z",
    updatedAt: "2026-03-01T09:45:00.000Z"
  }
];