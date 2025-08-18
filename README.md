# BookStore API Documentation

## Overview
BookStore API هو نظام لإدارة المؤلفين والكتب والمستخدمين مع صلاحيات متعددة (أدمن، مؤلف، مستخدم عادي). يوفر عمليات CRUD، تسجيل الدخول، واستعادة كلمة المرور، مع حماية JWT وصلاحيات متقدمة.

---

## Authentication & User Management

### Auth Endpoints
- `POST /api/auth/register` — تسجيل مستخدم جديد
- `POST /api/auth/login` — تسجيل الدخول
- `POST /api/auth/forgot-password` — إرسال كود استعادة كلمة المرور
- `POST /api/auth/verify-reset-code` — تحقق من كود الاستعادة
- `POST /api/auth/reset-password` — إعادة تعيين كلمة المرور

### User Profile
- `GET /api/auth/my-profile` — جلب بيانات المستخدم الحالي
- `PUT /api/auth/update-me` — تعديل بيانات المستخدم الحالي
- `DELETE /api/auth/delete-me` — حذف حساب المستخدم الحالي

### Admin User Management
- `GET /api/auth/` — جلب كل المستخدمين (أدمن فقط)
- `GET /api/auth/:id` — جلب مستخدم محدد
- `DELETE /api/auth/:id` — حذف مستخدم (أدمن فقط)

---

## Author Management

### Author Profile (للمؤلف المسجل دخول)
- `GET /api/authors/me` — جلب بيانات المؤلف الحالي
- `PUT /api/authors/update-me` — تعديل بيانات المؤلف الحالي
- `DELETE /api/authors/delete-me` — حذف حساب المؤلف الحالي

### Admin Author Management
- `POST /api/authors/` — إضافة مؤلف جديد (أدمن فقط)
- `GET /api/authors/` — جلب كل المؤلفين (أدمن فقط)
- `GET /api/authors/:id` — جلب مؤلف محدد (أدمن فقط)
- `PUT /api/authors/:id` — تعديل مؤلف (أدمن فقط)
- `DELETE /api/authors/:id` — حذف مؤلف (أدمن فقط)

---

## Books Management

- `POST /api/books/` — إضافة كتاب جديد (أدمن أو مؤلف)
- `GET /api/books/` — جلب كل الكتب
- `GET /api/books/:id` — جلب كتاب محدد
- `PUT /api/books/:id` — تعديل كتاب (أدمن أو مؤلف)
- `DELETE /api/books/:id` — حذف كتاب (أدمن أو مؤلف)

---

## Middlewares
- حماية JWT لجميع المسارات الخاصة
- صلاحيات الوصول عبر دالة `allowedTo`
- تحقق من صحة البيانات عبر Validators

---

## Error Handling
- جميع الأخطاء ترجع بصيغة JSON مع رسالة الخطأ وكود الحالة

---

## Uploads
- رفع الصور عبر `/api/upload` (حسب الإعدادات)

---

## Technologies
- Node.js, Express.js
- MongoDB
- JWT Authentication

---

## ملاحظات
- يجب إرسال التوكن في الهيدر `Authorization: Bearer <token>` للمسارات المحمية
- جميع البيانات ترجع بصيغة JSON

---

## Contact
لأي استفسار أو دعم، تواصل مع المطور.
