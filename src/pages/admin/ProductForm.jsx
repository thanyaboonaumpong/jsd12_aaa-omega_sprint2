import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MessageContext } from "../../contexts/messageContext/MessageContext";
import { ImageNotFound } from "../../components/common/DataNotFound";

export default function AdminProductForm() {

  const { products } = useContext(MessageContext);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const { productId } = useParams();
  const product = productId ? products.find((item) => item.productId === productId) : null;

  const productInitial = {
    name: product?.name || "",
    sku: product?.sku || "",
    category: product?.category || "",
    tags: product?.tags?.join(", ") || "",
    price: product?.price || "",
    salePrice: product?.salePrice || "",
    stock: product?.stock || "",
    stockMin: product?.stockMin || "",
    image: product?.image || null,
    description: product?.description || "",
  };
  const [productForm, setProductForm] = useState(productInitial);
  const handleProductChange = (event) => {
    const { name, value, files } = event.target;
    setProductForm((prev) => ({ ...prev, [name]: files ? files[0] : value, }));
  };
  const handleProductSubmit = (event) => {
    event.preventDefault();
    const payload = {
      ...productForm,
      tags: productForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      price: Number(productForm.price),
      salePrice: Number(productForm.salePrice),
      stock: Number(productForm.stock),
      stockMin: Number(productForm.stockMin),
    };
    console.log(payload);
  };
  //const handleProductReset = () => setProductForm(productInitial);

  return (
    <>
      {!productId || product
        ? <>
            <section id="productForm" className="flex flex-row flex-wrap justify-between items-center gap-5">
              <h1>{product ? <span className="text-content-hover">รายละเอียดสินค้า:</span> : "เพิ่มสินค้าใหม่"} {product && product.productId.toUpperCase()}</h1>
              <form onSubmit={handleProductSubmit}>
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="name">ชื่อสินค้า</label>
                    <input type="text" id="name" name="name" value={productForm.name} onChange={handleProductChange} placeholder="ระบุชื่อสินค้าให้ชัดเจน" maxLength="120" required />
                  </div>
                  <div className="input-group">
                    <label htmlFor="sku">รหัสสินค้า
                      <span className="text-xs text-content-soft">(SKU)</span>
                      <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content" title="ระบุบด้วย A-Z, 0-9 และขีด(-) เท่านั้น"><span className="icon-material">info_i</span></span></label>
                    <input type="text" id="sku" name="sku" value={productForm.sku} onChange={handleProductChange} placeholder="ระบุรหัสสินค้า" pattern="[A-Za-z0-9\-]+" maxLength="50" />
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="category">หมวดหมู่</label>
                    <select id="category" name="category" value={productForm.category} onChange={handleProductChange} required>
                      <option value="" disabled>เลือกหมวดหมู่</option>
                      <option value="solar">แผงโซล่าเซลล์</option>
                      <option value="inverter">อินเวอร์เตอร์</option>
                      <option value="battery">แบตเตอรี่</option>
                      <option value="accessory">อุปกรณ์เสริม</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label htmlFor="tags">แท็ก / ป้ายกำกับ
                      <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content" title="ระบุคำ เช่น จุดเด่น หรือประเภท และคั่นด้วย ,"><span className="icon-material">info_i</span></span></label>
                    <input type="text" id="tags" name="tags" value={productForm.tags} onChange={handleProductChange} placeholder="เช่น สินค้าขายดี, ประสิทธิภาพสูง" maxLength="150" />
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="price">ราคาสินค้า</label>
                    <input type="number" id="price" name="price" value={productForm.price} onChange={handleProductChange} placeholder="ระบุราคาสินค้า" min="0" required />
                  </div>
                  <div className="input-group">
                    <label htmlFor="salePrice">ราคาลดแล้ว</label>
                    <input type="number" id="salePrice" name="salePrice" value={productForm.salePrice} onChange={handleProductChange} placeholder="ระบุราคาลดแล้ว" min="0" max={productForm.price - 1} />
                  </div>
                  <div className="input-group">
                    <label htmlFor="stock">จำนวนสต็อก</label>
                    <input type="number" id="stock" name="stock" value={productForm.stock} onChange={handleProductChange} placeholder="ระบุจำนวนคงเหลือ" min="0" required />
                  </div>
                  <div className="input-group">
                    <label htmlFor="stockMin">สต็อกขั้นต่ำ</label>
                    <input type="number" id="stockMin" name="stockMin" value={productForm.stockMin} onChange={handleProductChange} placeholder="ระบุจำนวนขั้นต่ำเพื่อแจ้งเตือน" min="0" />
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-row xs:flex-row">
                    <img className="size-17 min-w-17 min-h-17" src={
                      productForm.image instanceof File
                        ? URL.createObjectURL(productForm.image)
                        : productForm.image?.trim() || ImageNotFound
                    } />
                    <div className="input-group">
                      <label htmlFor="image">รูปภาพสินค้า
                        <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content" title="รองรับไฟล์ JPG, PNG, WEBP (ไม่เกิน 5MB)"><span className="icon-material">info_i</span></span></label>
                      <input type="file" id="image" className="max-w-57.5" name="image" onChange={handleProductChange} accept="image/jpeg, image/png, image/webp" />
                    </div>
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="description">รายละเอียด</label>
                  <textarea id="description" name="description" rows="5" value={productForm.description} onChange={handleProductChange} placeholder="ระบุคุณสมบัติ จุดเด่น การใช้งาน และการรับประกัน" maxLength="2000"></textarea>
                </div>
                <div className="button-row">
                  <button type="button" className="button button-soft button-content" onClick={handleBack}>ยกเลิก</button>
                  <button type="submit" className="button">{product ? "บันทึกข้อมูล" : "เพิ่มสินค้า"}</button>
                </div>
              </form>
            </section>
          </>
        : <h2 className="self-center text-center text-content-soft">
              <span className="icon-material text-9xl wght-100">database_off</span><br />
              Product not found.</h2>
      }
    </>
  );

};