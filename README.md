# موقع رسيس

موقع ستاتيك بسيط (3 ملفات: index.html, style.css, script.js) — جاهز للنشر مباشرة بدون أي build.

## قبل النشر — لازم تعمل

- [ ] تحطلي تفاصيل تاريخ المبنى الحقيقية بدل النص المؤقت (قسم "قصتنا")
- [ ] تحطلي الصور الحقيقية بدل الخانات الفاضية (قسم "صور المحل" وقسم "قصتنا")
- [ ] تتأكد من ساعات الدوام الكاملة (حالياً مكتوب "حتى 11 مساءً" بس بدون تفاصيل الأيام)
- [ ] تتأكد من رابط تقييم جوجل الموجود بملف script.js (متغير RV_GOOGLE_URL)

## النشر على GitHub Pages

1. سوي repository جديد على GitHub (مثلاً `rasees-website`)
2. ارفع الثلاث ملفات (index.html, style.css, script.js) للـ repo (من واجهة GitHub: Add file → Upload files)
3. روح لـ **Settings → Pages**
4. تحت **Source** اختار **Deploy from a branch**، وبعدين اختار الفرع `main` والمجلد `/ (root)`
5. اضغط **Save** — بعد دقيقة لدقيقتين الموقع بيصير شغال على رابط شبيه بـ:
   `https://<username>.github.io/rasees-website/`

## النشر على Vercel

1. ادخل على vercel.com وسجل دخول (بيقدر يكون بنفس حساب GitHub)
2. اضغط **Add New → Project**
3. اربط نفس الـ repository يلي رفعته على GitHub
4. Framework Preset خليه **Other** (لأنه موقع ستاتيك بسيط، مافي build خطوة)
5. اضغط **Deploy** — خلال ثواني بيطلعلك رابط شبيه بـ:
   `https://rasees-website.vercel.app`

بعدين تقدر تربط دومين خاص (مثلاً rasees.com) من إعدادات المشروع بالطريقتين.

## ربط دومين مخصص لاحقاً

سواء GitHub Pages أو Vercel، الاثنين بيدعموا ربط دومين خاص مجاناً من إعدادات المشروع
(Settings → Domains) — بس لازم يكون عندك الدومين مشترى من مزود مثل Namecheap أو GoDaddy.
