export default function handler(req, res) {
    // التأكد من أن الطلب من نوع POST
    if (req.method === 'POST') {
        const userMessage = req.body.message || '';

        // معالجة الرسالة وإنشاء الرد (يمكنك ربطه بـ AI لاحقاً هنا)
        const botReply = `لقد استلمت رسالتك: "${userMessage}". هذا رد مباشر من الخادم!`;

        // إرسال الرد للواجهة الأمامية
        res.status(200).json({ reply: botReply });
    } else {
        // رفض أي طلبات أخرى غير POST
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
