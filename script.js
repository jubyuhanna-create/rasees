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
const rvLowSend = document.getElementById('rv-low-send');
const rvThanks = document.getElementById('rv-thanks');
let rvSelected = 0;

function rvHighlight(v) {
  rvStars.forEach(s => {
    const val = parseInt(s.dataset.val, 10);
    s.classList.toggle('selected', val <= v);
  });
}

async function rvSendWebhook(rating, comment, priority) {
  const payload = {
    restaurant_id: 'rasees',
    rating,
    rating_label: `${rating} / 5`,
    comment: comment || '—',
    priority: priority || 'normal',
    source: 'homepage-widget-ar',
    timestamp_iso: new Date().toISOString(),
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
  rvLowSend.disabled = true;
  rvLowSend.textContent = 'جارٍ الإرسال...';
  await rvSendWebhook(rvSelected, comment, 'urgent');
  rvLow.classList.add('hidden');
  rvThanks.textContent = 'شكراً على ملاحظتك! فريقنا رح يراجعها قريباً 🙏';
  rvThanks.classList.remove('hidden');
  rvLowSend.disabled = false;
  rvLowSend.textContent = 'إرسال الملاحظة';
});
