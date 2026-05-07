export const orders = [
  {
    _id: "660d5f3a8c9b1e2f4a7c0101",
    orderId: "ord20260001",
    totalPrice: 13900,
    paymentMethod: "qr",
    status: "paid",
    customer: {
      userId: 1001,
      firstName: "สมชาย",
      lastName: "ใจดี",
      company: null,
      taxId: null,
      phone: "0812345678",
      phone2: "0898765432",
      email: "somchai@example.com",
      shippingAddress: {
        label: "บ้าน",
        addressLine: "123/45",
        subdistrict: "บางนา",
        district: "บางนา",
        province: "กรุงเทพมหานคร",
        postcode: "10260"
      }
    },
    items: [
      {
        productId: "P20260002",
        name: "Hybrid Inverter 5kW",
        sku: "INV-5KW-HY",
        priceAtPurchase: 13900,
        quantity: 1
      }
    ],
    deliveryNote: "",
    internalNote: "",
    createdAt: "2026-03-01T08:00:00.000Z",
    updatedAt: "2026-03-01T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0102",
    orderId: "ord20260002",
    totalPrice: 20850,
    paymentMethod: "bank_transfer",
    status: "shipping",
    customer: {
      userId: 1002,
      firstName: "วิชัย",
      lastName: "รุ่งเรือง",
      company: "W Solar Co.",
      taxId: "1234567890123",
      phone: "0891112223",
      phone2: null,
      email: "wichai@example.com",
      shippingAddress: {
        label: "ออฟฟิศ",
        addressLine: "88/9 อาคาร A",
        subdistrict: "บางพลี",
        district: "บางพลี",
        province: "สมุทรปราการ",
        postcode: "10540"
      }
    },
    items: [
      {
        productId: "P20260001",
        name: "Solar Panel Mono 550W High Efficiency",
        sku: "SP-550W-MONO-01",
        priceAtPurchase: 6950,
        quantity: 2
      },
      {
        productId: "P20260008",
        name: "Solar Cable 6mm",
        sku: "ACC-CABLE-01",
        priceAtPurchase: 6950,
        quantity: 1
      }
    ],
    deliveryNote: "ด่วน",
    internalNote: "B2B",
    createdAt: "2026-03-02T08:00:00.000Z",
    updatedAt: "2026-03-02T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0103",
    orderId: "ord20260003",
    totalPrice: 6900,
    paymentMethod: "cash",
    status: "delivered",
    customer: {
      userId: 1003,
      firstName: "สุพจน์",
      lastName: "กิจเจริญ",
      company: null,
      taxId: null,
      phone: "0812223344",
      phone2: "0823334444",
      email: "supot@example.com",
      shippingAddress: {
        label: "บ้าน",
        addressLine: "12/1",
        subdistrict: "บางนา",
        district: "บางนา",
        province: "กรุงเทพมหานคร",
        postcode: "10260"
      }
    },
    items: [
      {
        productId: "P20260015",
        name: "Solar Panel 500W Mono",
        sku: "SP-500W-01",
        priceAtPurchase: 6900,
        quantity: 1
      }
    ],
    deliveryNote: "",
    internalNote: "",
    createdAt: "2026-03-03T08:00:00.000Z",
    updatedAt: "2026-03-03T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0104",
    orderId: "ord20260004",
    totalPrice: 39800,
    paymentMethod: "bank_transfer",
    status: "open",
    customer: {
      userId: 1005,
      firstName: "พงษ์ศักดิ์",
      lastName: "บุญมา",
      company: "SP Energy",
      taxId: "9998887776665",
      phone: "0861234567",
      phone2: "0819998888",
      email: "pong@example.com",
      shippingAddress: {
        label: "โรงงาน",
        addressLine: "77/8 นิคมอุตสาหกรรม",
        subdistrict: "ปลวกแดง",
        district: "ปลวกแดง",
        province: "ระยอง",
        postcode: "21140"
      }
    },
    items: [
      {
        productId: "P20260028",
        name: "Hybrid Inverter 12kW Heavy Duty",
        sku: "INV-12KW-01",
        priceAtPurchase: 39800,
        quantity: 1
      }
    ],
    deliveryNote: "โหลดสินค้า",
    internalNote: "industrial",
    createdAt: "2026-03-04T08:00:00.000Z",
    updatedAt: "2026-03-04T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0105",
    orderId: "ord20260005",
    totalPrice: 17400,
    paymentMethod: "qr",
    status: "paid",
    customer: {
      userId: 1001,
      firstName: "สมชาย",
      lastName: "ใจดี",
      company: null,
      taxId: null,
      phone: "0812345678",
      phone2: "0898765432",
      email: "somchai@example.com",
      shippingAddress: {
        label: "บ้าน",
        addressLine: "123/45",
        subdistrict: "บางนา",
        district: "บางนา",
        province: "กรุงเทพมหานคร",
        postcode: "10260"
      }
    },
    items: [
      {
        productId: "P20260002",
        name: "Hybrid Inverter 5kW",
        sku: "INV-5KW-HY",
        priceAtPurchase: 13900,
        quantity: 1
      },
      {
        productId: "P20260008",
        name: "Solar Cable 6mm",
        sku: "ACC-CABLE-01",
        priceAtPurchase: 3500,
        quantity: 1
      }
    ],
    deliveryNote: "",
    internalNote: "",
    createdAt: "2026-03-05T08:00:00.000Z",
    updatedAt: "2026-03-05T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0106",
    orderId: "ord20260006",
    totalPrice: 11200,
    paymentMethod: "cash",
    status: "cancelled",
    customer: {
      userId: 1006,
      firstName: "อนันต์",
      lastName: "วิริยะ",
      company: null,
      taxId: null,
      phone: "0812347788",
      phone2: null,
      email: "anon@example.com",
      shippingAddress: {
        label: "บ้าน",
        addressLine: "19/2",
        subdistrict: "คลองสาม",
        district: "คลองหลวง",
        province: "ปทุมธานี",
        postcode: "12120"
      }
    },
    items: [
      {
        productId: "P20260001",
        name: "Solar Panel Mono 550W High Efficiency",
        sku: "SP-550W-MONO-01",
        priceAtPurchase: 11200,
        quantity: 1
      }
    ],
    deliveryNote: "",
    internalNote: "cancelled",
    createdAt: "2026-03-06T08:00:00.000Z",
    updatedAt: "2026-03-06T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0107",
    orderId: "ord20260007",
    totalPrice: 17800,
    paymentMethod: "bank_transfer",
    status: "shipping",
    customer: {
      userId: 1007,
      firstName: "สุชาติ",
      lastName: "ทองดี",
      company: null,
      taxId: null,
      phone: "0891110000",
      phone2: null,
      email: "suchat@example.com",
      shippingAddress: {
        label: "บ้าน",
        addressLine: "55/9",
        subdistrict: "บางบัวทอง",
        district: "บางบัวทอง",
        province: "นนทบุรี",
        postcode: "11110"
      }
    },
    items: [
      {
        productId: "P20260006",
        name: "Lithium Battery 100Ah",
        sku: "BAT-100AH-01",
        priceAtPurchase: 17800,
        quantity: 1
      }
    ],
    deliveryNote: "",
    internalNote: "",
    createdAt: "2026-03-07T08:00:00.000Z",
    updatedAt: "2026-03-07T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0108",
    orderId: "ord20260008",
    totalPrice: 24500,
    paymentMethod: "bank_transfer",
    status: "open",
    customer: {
      userId: 1010,
      firstName: "ชยพล",
      lastName: "รุ่งเรือง",
      company: "GreenTech",
      taxId: "4445556667778",
      phone: "0816667777",
      phone2: null,
      email: "chayapol@greentech.com",
      shippingAddress: {
        label: "สำนักงานใหญ่",
        addressLine: "100/1 อาคาร A",
        subdistrict: "บางนา",
        district: "บางนา",
        province: "กรุงเทพมหานคร",
        postcode: "10260"
      }
    },
    items: [
      {
        productId: "P20260018",
        name: "Hybrid Inverter 10kW Industrial",
        sku: "INV-10KW-01",
        priceAtPurchase: 24500,
        quantity: 1
      }
    ],
    deliveryNote: "",
    internalNote: "",
    createdAt: "2026-03-08T08:00:00.000Z",
    updatedAt: "2026-03-08T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0109",
    orderId: "ord20260009",
    totalPrice: 9400,
    paymentMethod: "qr",
    status: "paid",
    customer: {
      userId: 1009,
      firstName: "กิตติ",
      lastName: "ใจดี",
      company: null,
      taxId: null,
      phone: "0829998888",
      phone2: null,
      email: "kitti@example.com",
      shippingAddress: {
        label: "บ้าน",
        addressLine: "33/1",
        subdistrict: "ดอนเมือง",
        district: "ดอนเมือง",
        province: "กรุงเทพมหานคร",
        postcode: "10210"
      }
    },
    items: [
      {
        productId: "P20260015",
        name: "Solar Panel 500W Mono",
        sku: "SP-500W-01",
        priceAtPurchase: 9400,
        quantity: 1
      }
    ],
    deliveryNote: "",
    internalNote: "",
    createdAt: "2026-03-09T08:00:00.000Z",
    updatedAt: "2026-03-09T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0110",
    orderId: "ord20260010",
    totalPrice: 31200,
    paymentMethod: "bank_transfer",
    status: "shipping",
    customer: {
      userId: 1002,
      firstName: "วิชัย",
      lastName: "รุ่งเรือง",
      company: "W Solar Co.",
      taxId: "1234567890123",
      phone: "0891112223",
      phone2: null,
      email: "wichai@example.com",
      shippingAddress: {
        label: "ออฟฟิศ",
        addressLine: "88/9 อาคาร A",
        subdistrict: "บางพลี",
        district: "บางพลี",
        province: "สมุทรปราการ",
        postcode: "10540"
      }
    },
    items: [
      {
        productId: "P20260001",
        name: "Solar Panel Mono 550W High Efficiency",
        sku: "SP-550W-MONO-01",
        priceAtPurchase: 15600,
        quantity: 2
      }
    ],
    deliveryNote: "",
    internalNote: "repeat B2B",
    createdAt: "2026-03-10T08:00:00.000Z",
    updatedAt: "2026-03-10T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0111",
    orderId: "ord20260011",
    totalPrice: 6950,
    paymentMethod: "cash",
    status: "delivered",
    customer: {
      userId: 1003,
      firstName: "สุพจน์",
      lastName: "กิจเจริญ",
      company: null,
      taxId: null,
      phone: "0812223344",
      phone2: "0823334444",
      email: "supot@example.com",
      shippingAddress: {
        label: "บ้าน",
        addressLine: "12/1",
        subdistrict: "บางนา",
        district: "บางนา",
        province: "กรุงเทพมหานคร",
        postcode: "10260"
      }
    },
    items: [
      {
        productId: "P20260001",
        name: "Solar Panel Mono 550W High Efficiency",
        sku: "SP-550W-MONO-01",
        priceAtPurchase: 6950,
        quantity: 1
      }
    ],
    deliveryNote: "",
    internalNote: "",
    createdAt: "2026-03-11T08:00:00.000Z",
    updatedAt: "2026-03-11T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0112",
    orderId: "ord20260012",
    totalPrice: 27800,
    paymentMethod: "bank_transfer",
    status: "shipping",
    customer: {
      userId: 1001,
      firstName: "สมชาย",
      lastName: "ใจดี",
      company: null,
      taxId: null,
      phone: "0812345678",
      phone2: "0898765432",
      email: "somchai@example.com",
      shippingAddress: {
        label: "บ้าน",
        addressLine: "123/45",
        subdistrict: "บางนา",
        district: "บางนา",
        province: "กรุงเทพมหานคร",
        postcode: "10260"
      }
    },
    items: [
      {
        productId: "P20260002",
        name: "Hybrid Inverter 5kW",
        sku: "INV-5KW-HY",
        priceAtPurchase: 13900,
        quantity: 2
      }
    ],
    deliveryNote: "",
    internalNote: "repeat order",
    createdAt: "2026-03-12T08:00:00.000Z",
    updatedAt: "2026-03-12T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0113",
    orderId: "ord20260013",
    totalPrice: 16800,
    paymentMethod: "qr",
    status: "paid",
    customer: {
      userId: 1008,
      firstName: "วิศรุต",
      lastName: "เจริญพร",
      company: "PowerTech",
      taxId: "8887776665554",
      phone: "0865554444",
      phone2: "0876665555",
      email: "visarut@powertech.com",
      shippingAddress: {
        label: "โรงงาน",
        addressLine: "1/1 นิคม",
        subdistrict: "ปลวกแดง",
        district: "ปลวกแดง",
        province: "ระยอง",
        postcode: "21140"
      }
    },
    items: [
      {
        productId: "P20260006",
        name: "Lithium Battery 100Ah",
        sku: "BAT-100AH-01",
        priceAtPurchase: 16800,
        quantity: 1
      }
    ],
    deliveryNote: "",
    internalNote: "",
    createdAt: "2026-03-13T08:00:00.000Z",
    updatedAt: "2026-03-13T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0114",
    orderId: "ord20260014",
    totalPrice: 20400,
    paymentMethod: "bank_transfer",
    status: "open",
    customer: {
      userId: 1005,
      firstName: "พงษ์ศักดิ์",
      lastName: "บุญมา",
      company: "SP Energy",
      taxId: "9998887776665",
      phone: "0861234567",
      phone2: "0819998888",
      email: "pong@example.com",
      shippingAddress: {
        label: "โรงงาน",
        addressLine: "77/8 นิคม",
        subdistrict: "ปลวกแดง",
        district: "ปลวกแดง",
        province: "ระยอง",
        postcode: "21140"
      }
    },
    items: [
      {
        productId: "P20260001",
        name: "Solar Panel Mono 550W High Efficiency",
        sku: "SP-550W-MONO-01",
        priceAtPurchase: 6800,
        quantity: 3
      }
    ],
    deliveryNote: "",
    internalNote: "",
    createdAt: "2026-03-14T08:00:00.000Z",
    updatedAt: "2026-03-14T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0115",
    orderId: "ord20260015",
    totalPrice: 9500,
    paymentMethod: "cash",
    status: "delivered",
    customer: {
      userId: 1006,
      firstName: "อนันต์",
      lastName: "วิริยะ",
      company: null,
      taxId: null,
      phone: "0812347788",
      phone2: null,
      email: "anon@example.com",
      shippingAddress: {
        label: "บ้าน",
        addressLine: "19/2",
        subdistrict: "คลองสาม",
        district: "คลองหลวง",
        province: "ปทุมธานี",
        postcode: "12120"
      }
    },
    items: [
      {
        productId: "P20260015",
        name: "Solar Panel 500W Mono",
        sku: "SP-500W-01",
        priceAtPurchase: 9500,
        quantity: 1
      }
    ],
    deliveryNote: "",
    internalNote: "",
    createdAt: "2026-03-15T08:00:00.000Z",
    updatedAt: "2026-03-15T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0116",
    orderId: "ord20260016",
    totalPrice: 31800,
    paymentMethod: "bank_transfer",
    status: "shipping",
    customer: {
      userId: 1002,
      firstName: "วิชัย",
      lastName: "รุ่งเรือง",
      company: "W Solar Co.",
      taxId: "1234567890123",
      phone: "0891112223",
      phone2: null,
      email: "wichai@example.com",
      shippingAddress: {
        label: "ออฟฟิศ",
        addressLine: "88/9 อาคาร A",
        subdistrict: "บางพลี",
        district: "บางพลี",
        province: "สมุทรปราการ",
        postcode: "10540"
      }
    },
    items: [
      {
        productId: "P20260001",
        name: "Solar Panel Mono 550W High Efficiency",
        sku: "SP-550W-MONO-01",
        priceAtPurchase: 15900,
        quantity: 2
      }
    ],
    deliveryNote: "",
    internalNote: "",
    createdAt: "2026-03-16T08:00:00.000Z",
    updatedAt: "2026-03-16T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0117",
    orderId: "ord20260017",
    totalPrice: 14200,
    paymentMethod: "qr",
    status: "paid",
    customer: {
      userId: 1009,
      firstName: "กิตติ",
      lastName: "ใจดี",
      company: null,
      taxId: null,
      phone: "0829998888",
      phone2: null,
      email: "kitti@example.com",
      shippingAddress: {
        label: "บ้าน",
        addressLine: "33/1",
        subdistrict: "ดอนเมือง",
        district: "ดอนเมือง",
        province: "กรุงเทพมหานคร",
        postcode: "10210"
      }
    },
    items: [
      {
        productId: "P20260002",
        name: "Hybrid Inverter 5kW",
        sku: "INV-5KW-HY",
        priceAtPurchase: 14200,
        quantity: 1
      }
    ],
    deliveryNote: "",
    internalNote: "",
    createdAt: "2026-03-17T08:00:00.000Z",
    updatedAt: "2026-03-17T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0118",
    orderId: "ord20260018",
    totalPrice: 22700,
    paymentMethod: "bank_transfer",
    status: "open",
    customer: {
      userId: 1010,
      firstName: "ชยพล",
      lastName: "รุ่งเรือง",
      company: "GreenTech",
      taxId: "4445556667778",
      phone: "0816667777",
      phone2: null,
      email: "chayapol@greentech.com",
      shippingAddress: {
        label: "สำนักงานใหญ่",
        addressLine: "100/1 อาคาร A",
        subdistrict: "บางนา",
        district: "บางนา",
        province: "กรุงเทพมหานคร",
        postcode: "10260"
      }
    },
    items: [
      {
        productId: "P20260018",
        name: "Hybrid Inverter 10kW Industrial",
        sku: "INV-10KW-01",
        priceAtPurchase: 22700,
        quantity: 1
      }
    ],
    deliveryNote: "",
    internalNote: "",
    createdAt: "2026-03-18T08:00:00.000Z",
    updatedAt: "2026-03-18T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0119",
    orderId: "ord20260019",
    totalPrice: 18800,
    paymentMethod: "cash",
    status: "cancelled",
    customer: {
      userId: 1004,
      firstName: "ณัฐวุฒิ",
      lastName: "ศรีสุข",
      company: null,
      taxId: null,
      phone: "0877778888",
      phone2: null,
      email: "nut@example.com",
      shippingAddress: {
        label: "บ้าน",
        addressLine: "45/6",
        subdistrict: "บางพลี",
        district: "บางพลี",
        province: "สมุทรปราการ",
        postcode: "10540"
      }
    },
    items: [
      {
        productId: "P20260006",
        name: "Lithium Battery 100Ah",
        sku: "BAT-100AH-01",
        priceAtPurchase: 18800,
        quantity: 1
      }
    ],
    deliveryNote: "",
    internalNote: "cancelled before shipping",
    createdAt: "2026-03-19T08:00:00.000Z",
    updatedAt: "2026-03-19T08:10:00.000Z"
  },
  {
    _id: "660d5f3a8c9b1e2f4a7c0120",
    orderId: "ord20260020",
    totalPrice: 27700,
    paymentMethod: "bank_transfer",
    status: "shipping",
    customer: {
      userId: 1001,
      firstName: "สมชาย",
      lastName: "ใจดี",
      company: null,
      taxId: null,
      phone: "0812345678",
      phone2: "0898765432",
      email: "somchai@example.com",
      shippingAddress: {
        label: "บ้าน",
        addressLine: "123/45",
        subdistrict: "บางนา",
        district: "บางนา",
        province: "กรุงเทพมหานคร",
        postcode: "10260"
      }
    },
    items: [
      {
        productId: "P20260002",
        name: "Hybrid Inverter 5kW",
        sku: "INV-5KW-HY",
        priceAtPurchase: 13900,
        quantity: 1
      },
      {
        productId: "P20260001",
        name: "Solar Panel Mono 550W High Efficiency",
        sku: "SP-550W-MONO-01",
        priceAtPurchase: 6900,
        quantity: 2
      }
    ],
    deliveryNote: "ฉันไม่มีหมายเหตุครับ",
    internalNote: "bundle order",
    createdAt: "2026-03-20T08:00:00.000Z",
    updatedAt: "2026-03-20T08:10:00.000Z"
  }

];