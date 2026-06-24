let latestMessage = null;
let latestReply = null;
let latestTime = 0;

module.exports = async function (req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // إرسال رسالة جديدة
    if (req.method === 'POST') {
        try {
            const userMessage = req.body?.message || 'لم يتم إرسال رسالة';

            latestMessage = userMessage;
            latestReply = `لقد استلمت رسالتك: "${userMessage}"`;
            latestTime = Date.now();

            return res.status(200).json({
                success: true,
                reply: latestReply,
                timestamp: latestTime
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                error: 'حدث خطأ داخلي في الخادم'
            });
        }
    }

    // جلب آخر رسالة بشكل فوري
    if (req.method === 'GET') {
        return res.status(200).json({
            success: true,
            message: latestMessage,
            reply: latestReply,
            timestamp: latestTime
        });
    }

    return res.status(405).json({
        success: false,
        error: 'Method Not Allowed'
    });
};
