const axios = require('axios');

module.exports = async (req, res) => {
    // السماح لموقعك بقرأة البيانات (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    // نأخذ اسم الدواء من الرابط (مثلاً ?name=DOLIPRANE)
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: "المرجو كتابة اسم الدواء" });
    }

    try {
        // الاتصال المباشر ببيانات الوزارة (ANAM)
        const response = await axios.get(`https://e-services.anam.ma/eServices/api/Medicament/GetMedicamentClause/${name}`);
        
        // إرسال البيانات الحقيقية لموقعك
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "خطأ في جلب البيانات من المصدر" });
    }
};
