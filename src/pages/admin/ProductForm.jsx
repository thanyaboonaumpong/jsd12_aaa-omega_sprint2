import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MessageContext } from "../../contexts/messageContext/MessageContext";
import { PageNotFound, ImageNotFound } from "../../components/common/NotFound";
import { createProduct, updateProduct } from "../../utils/api";

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
    date: product?.date ? product.date.slice(0, 10) : "",
  };

  const [productForm, setProductForm] = useState(productInitial);
  const [errors, setErrors] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleProductChange = (event) => {
    const { name, value, files } = event.target;
    setProductForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!productForm.name.trim()) {
      newErrors.name = "กรุณาระบุชื่อสินค้า";
    } else if (productForm.name.trim().length < 3) {
      newErrors.name = "ชื่อสินค้าต้องมีอย่างน้อย 3 ตัวอักษร";
    }

    if (!productForm.description.trim()) {
      newErrors.description = "กรุณาระบุรายละเอียดสินค้า";
    } else if (productForm.description.trim().length < 10) {
      newErrors.description = "รายละเอียดสินค้าต้องมีอย่างน้อย 10 ตัวอักษร";
    }

    if (productForm.price === "" || productForm.price === null) {
      newErrors.price = "กรุณาระบุราคาสินค้า";
    } else if (Number(productForm.price) <= 0) {
      newErrors.price = "ราคาสินค้าต้องมากกว่า 0";
    }

    if (productForm.stock === "" || productForm.stock === null) {
      newErrors.stock = "กรุณาระบุจำนวนสต็อก";
    } else if (Number(productForm.stock) < 0) {
      newErrors.stock = "จำนวนสต็อกต้องไม่ติดลบ";
    }

    if (!productForm.date) {
      newErrors.date = "กรุณาระบุวันที่สินค้า";
    } else {
      const dateValue = new Date(productForm.date);
      if (isNaN(dateValue.getTime())) {
        newErrors.date = "วันที่ไม่ถูกต้อง";
      }
    }

    if (productForm.tags.trim()) {
      const tagList = productForm.tags.split(",").map((t) => t.trim()).filter(Boolean);
      if (tagList.length === 0) {
        newErrors.tags = "รูปแบบแท็กไม่ถูกต้อง (คั่นด้วย ,)";
      } else if (tagList.some((t) => t.length > 30)) {
        newErrors.tags = "แต่ละแท็กต้องไม่เกิน 30 ตัวอักษร";
      }
    }

    if (!productForm.category) {
      newErrors.category = "กรุณาเลือกหมวดหมู่สินค้า";
    }

    if (productForm.salePrice !== "" && Number(productForm.salePrice) >= Number(productForm.price)) {
      newErrors.salePrice = "ราคาลดแล้วต้องน้อยกว่าราคาสินค้า";
    }

    return newErrors;
  };

  const handleProductSubmit = async (event) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      name: productForm.name.trim(),
      description: productForm.description.trim(),
      sku: productForm.sku.trim(),
      category: productForm.category,
      tags: productForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      price: Number(productForm.price),
      salePrice: Number(productForm.salePrice) || 0,
      stock: Number(productForm.stock),
      stockMin: Number(productForm.stockMin) || 0,
      date: productForm.date,
      image: productForm.image instanceof File ? "" : (productForm.image || ""),
    };

    try {
      setSubmitLoading(true);
      let result;
      if (product) {
        result = await updateProduct(product.productId, payload);
      } else {
        result = await createProduct(payload);
      }

      if (result.success) {
        setSubmitSuccess(true);
        setTimeout(() => navigate("/admin/products"), 1200);
      } else {
        setSubmitError(result.message || "เกิดข้อผิดพลาด กรุณาลองใหม่");
      }
    } catch {
      setSubmitError("ไม่สามารถเชื่อมต่อ server ได้ กรุณาตรวจสอบการเชื่อมต่อ");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      {!productId || product
        ? <>
            <section id="productForm" className="flex flex-row flex-wrap justify-between items-center gap-5">
              <h1>
                {product
                  ? <span className="text-content-hover">รายละเอียดสินค้า:</span>
                  : "เพิ่มสินค้าใหม่"}{" "}
                {product && product.productId.toUpperCase()}
              </h1>

              {submitSuccess && (
                <div className="w-full p-3 rounded-xl bg-success-lighter text-success-base text-sm">
                  {product ? "บันทึกข้อมูลสำเร็จ" : "เพิ่มสินค้าสำเร็จ"} กำลังกลับหน้าสินค้า...
                </div>
              )}
              {submitError && (
                <div className="w-full p-3 rounded-xl bg-error-lighter text-error-base text-sm">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleProductSubmit} noValidate>
                {/* ชื่อสินค้า + รหัสสินค้า */}
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="name">ชื่อสินค้า <span className="text-error-base">*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={productForm.name}
                      onChange={handleProductChange}
                      placeholder="ระบุชื่อสินค้าให้ชัดเจน"
                      maxLength="120"
                      className={errors.name ? "!border-error-base" : ""}
                    />
                    {errors.name && <p className="text-xs text-error-base mt-1">{errors.name}</p>}
                  </div>
                  <div className="input-group">
                    <label htmlFor="sku">
                      รหัสสินค้า{" "}
                      <span className="text-xs text-content-soft">(SKU)</span>
                      <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content" title="ระบุด้วย A-Z, 0-9 และขีด(-) เท่านั้น">
                        <span className="icon-material">info_i</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      id="sku"
                      name="sku"
                      value={productForm.sku}
                      onChange={handleProductChange}
                      placeholder="ระบุรหัสสินค้า"
                      pattern="[A-Za-z0-9\-]+"
                      maxLength="50"
                    />
                  </div>
                </div>

                {/* หมวดหมู่ + แท็ก */}
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="category">หมวดหมู่ <span className="text-error-base">*</span></label>
                    <select
                      id="category"
                      name="category"
                      value={productForm.category}
                      onChange={handleProductChange}
                      className={errors.category ? "!border-error-base" : ""}
                    >
                      <option value="" disabled>เลือกหมวดหมู่</option>
                      <option value="solar">แผงโซล่าเซลล์</option>
                      <option value="inverter">อินเวอร์เตอร์</option>
                      <option value="battery">แบตเตอรี่</option>
                      <option value="accessory">อุปกรณ์เสริม</option>
                    </select>
                    {errors.category && <p className="text-xs text-error-base mt-1">{errors.category}</p>}
                  </div>
                  <div className="input-group">
                    <label htmlFor="tags">
                      แท็ก / ป้ายกำกับ{" "}
                      <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content" title="ระบุคำ เช่น จุดเด่น หรือประเภท และคั่นด้วย ,">
                        <span className="icon-material">info_i</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={productForm.tags}
                      onChange={handleProductChange}
                      placeholder="เช่น สินค้าขายดี, ประสิทธิภาพสูง"
                      maxLength="150"
                      className={errors.tags ? "!border-error-base" : ""}
                    />
                    {errors.tags && <p className="text-xs text-error-base mt-1">{errors.tags}</p>}
                  </div>
                </div>

                {/* ราคา + ราคาลด + สต็อก + สต็อกขั้นต่ำ */}
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="price">ราคาสินค้า <span className="text-error-base">*</span></label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={productForm.price}
                      onChange={handleProductChange}
                      placeholder="ระบุราคาสินค้า"
                      min="1"
                      className={errors.price ? "!border-error-base" : ""}
                    />
                    {errors.price && <p className="text-xs text-error-base mt-1">{errors.price}</p>}
                  </div>
                  <div className="input-group">
                    <label htmlFor="salePrice">ราคาลดแล้ว</label>
                    <input
                      type="number"
                      id="salePrice"
                      name="salePrice"
                      value={productForm.salePrice}
                      onChange={handleProductChange}
                      placeholder="ระบุราคาลดแล้ว"
                      min="0"
                      className={errors.salePrice ? "!border-error-base" : ""}
                    />
                    {errors.salePrice && <p className="text-xs text-error-base mt-1">{errors.salePrice}</p>}
                  </div>
                  <div className="input-group">
                    <label htmlFor="stock">จำนวนสต็อก <span className="text-error-base">*</span></label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={productForm.stock}
                      onChange={handleProductChange}
                      placeholder="ระบุจำนวนคงเหลือ"
                      min="0"
                      className={errors.stock ? "!border-error-base" : ""}
                    />
                    {errors.stock && <p className="text-xs text-error-base mt-1">{errors.stock}</p>}
                  </div>
                  <div className="input-group">
                    <label htmlFor="stockMin">สต็อกขั้นต่ำ</label>
                    <input
                      type="number"
                      id="stockMin"
                      name="stockMin"
                      value={productForm.stockMin}
                      onChange={handleProductChange}
                      placeholder="ระบุจำนวนขั้นต่ำเพื่อแจ้งเตือน"
                      min="0"
                    />
                  </div>
                </div>

                {/* วันที่สินค้า */}
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="date">วันที่สินค้า <span className="text-error-base">*</span></label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={productForm.date}
                      onChange={handleProductChange}
                      className={errors.date ? "!border-error-base" : ""}
                    />
                    {errors.date && <p className="text-xs text-error-base mt-1">{errors.date}</p>}
                  </div>
                </div>

                {/* รูปภาพ */}
                <div className="input-row xs:flex-row">
                  <img
                    className="object-cover size-17 min-w-17 min-h-17"
                    src={
                      productForm.image instanceof File
                        ? URL.createObjectURL(productForm.image)
                        : productForm.image?.trim() || ImageNotFound
                    }
                    alt="preview"
                  />
                  <div className="input-group">
                    <label className="label-normal" htmlFor="image">
                      รูปภาพสินค้า{" "}
                      <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content" title="รองรับไฟล์ JPG, PNG, WEBP (ไม่เกิน 5MB)">
                        <span className="icon-material">info_i</span>
                      </span>
                    </label>
                    <input
                      type="file"
                      id="image"
                      className="max-w-57.5"
                      name="image"
                      onChange={handleProductChange}
                      accept="image/jpeg, image/png, image/webp"
                    />
                  </div>
                </div>

                {/* รายละเอียด */}
                <div className="input-group">
                  <label htmlFor="description">รายละเอียด <span className="text-error-base">*</span></label>
                  <textarea
                    id="description"
                    name="description"
                    rows="5"
                    value={productForm.description}
                    onChange={handleProductChange}
                    placeholder="ระบุคุณสมบัติ จุดเด่น การใช้งาน และการรับประกัน"
                    maxLength="2000"
                    className={errors.description ? "!border-error-base" : ""}
                  ></textarea>
                  {errors.description && <p className="text-xs text-error-base mt-1">{errors.description}</p>}
                </div>

                <div className="button-row">
                  <button type="button" className="button button-soft button-content" onClick={handleBack}>
                    ยกเลิก
                  </button>
                  <button type="submit" className="button" disabled={submitLoading}>
                    {submitLoading ? "กำลังบันทึก..." : product ? "บันทึกข้อมูล" : "เพิ่มสินค้า"}
                  </button>
                </div>
              </form>
            </section>
          </>
        : <PageNotFound text="ไม่พบหน้าสินค้า" />
      }
    </>
  );
}
