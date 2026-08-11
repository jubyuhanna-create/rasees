'use strict';

/* ══════════════════════════════════════════
   RASEES — rating widget
   نفس منطق الويب اب المستقل: 4-5 نجوم بتوديك مباشرة
   لصفحة جوجل، 1-3 نجوم بتفتح مربع ملاحظات وترسل عالماك.كوم
   ══════════════════════════════════════════ */

const RV_GOOGLE_URL = 'https://g.page/r/CQu_UpilLZgMEAE/review';
const RV_WEBHOOK_URL = 'https://hook.eu1.make.com/lw2a19ge56y3mtp4imbe7cxfalbnxsyi';

const rvStars = document.querySelectorAll('#rv-stars .star');
const rvLow = document.getElementById('rv-low');
const rvLowText = document.getElementById('rv-low-text');
const rvLowName = document.getElementById('rv-low-name');
const rvLowPhone = document.getElementById('rv-low-phone');
const rvLowSend = document.getElementById('rv-low-send');
const rvThanks = document.getElementById('rv-thanks');
let rvSelected = 0;

function rvHighlight(v) {
  rvStars.forEach(s => {
    const val = parseInt(s.dataset.val, 10);
    s.classList.toggle('selected', val <= v);
  });
}

// نفس طريقة بناء الوقت المستخدمة بالويب اب المستقل — تاريخ وساعة مقروءة + فرق التوقيت
function rvBuildTimestamp() {
  const now = new Date();
  const offset = -now.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const hh = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
  const mm = String(Math.abs(offset) % 60).padStart(2, '0');
  const readable = now.toLocaleString('en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  });
  return { iso: now.toISOString(), readable: `${readable} (UTC${sign}${hh}:${mm})` };
}

async function rvSendWebhook(rating, comment, priority, extra) {
  const ts = rvBuildTimestamp();
  const payload = {
    restaurant_id: 'rasees',
    rating,
    rating_label: `${rating} / 5`,
    comment: comment || '—',
    name: (extra && extra.name) || '',
    phone: (extra && extra.phone) || '',
    priority: priority || 'normal',
    source: 'homepage-widget-ar',
    timestamp_iso: ts.iso,
    timestamp_readable: ts.readable,
  };
  try {
    await fetch(RV_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn('webhook failed:', err);
  }
}

rvStars.forEach(star => {
  star.addEventListener('mouseenter', () => rvHighlight(parseInt(star.dataset.val, 10)));
  star.addEventListener('mouseleave', () => rvHighlight(rvSelected));
  star.addEventListener('click', () => {
    const v = parseInt(star.dataset.val, 10);
    rvSelected = v;
    rvHighlight(v);
    star.classList.add('pop');
    setTimeout(() => star.classList.remove('pop'), 300);

    if (v >= 4) {
      window.open(RV_GOOGLE_URL, '_blank');
      rvSendWebhook(v, '', 'positive');
      rvLow.classList.add('hidden');
      rvThanks.textContent = 'شكراً! فتحنالك لسان جوجل — رح نفرح كتير بتقييمك ⭐';
      rvThanks.classList.remove('hidden');
    } else {
      rvThanks.classList.add('hidden');
      rvLow.classList.remove('hidden');
    }
  });
});

rvLowSend.addEventListener('click', async () => {
  const comment = rvLowText.value.trim();
  const name = rvLowName ? rvLowName.value.trim() : '';
  const phone = rvLowPhone ? rvLowPhone.value.trim() : '';
  rvLowSend.disabled = true;
  rvLowSend.textContent = 'جارٍ الإرسال...';
  await rvSendWebhook(rvSelected, comment, 'urgent', { name, phone });
  rvLow.classList.add('hidden');
  rvThanks.textContent = 'شكراً على ملاحظتك! فريقنا رح يراجعها قريباً 🙏';
  rvThanks.classList.remove('hidden');
  rvLowSend.disabled = false;
  rvLowSend.textContent = 'إرسال الملاحظة';
});
