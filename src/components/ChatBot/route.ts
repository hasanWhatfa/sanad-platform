import { OpenAI } from "openai";

// لاحظ استخدام VITE_ بدل process.env
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // لازم تحطها بالكلاينت
});

const systemPrompt = `
أنت مساعد متخصص في تقديم معلومات حول السياحة في منطقة توسكانا بإيطاليا فقط. 
أجب فقط عن الأسئلة المتعلقة بالسفر، المعالم، الفنادق، الطعام، النقل، المواسم السياحية، الأنشطة الترفيهية في توسكانا. 
إذا تم سؤالك عن أي موضوع خارج توسكانا، فاعتذر وقل أنني متخصص فقط في السياحة في توسكانا.
`;

export async function askBot(message: string) {
  if (!message.trim()) return "⚠️ رجاءً اكتب رسالة.";

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    return completion.choices[0]?.message?.content ?? "❌ لم أستطع توليد رد.";
  } catch (error) {
    console.error("❌ API Error:", error);
    return "⚠️ حصل خطأ داخلي.";
  }
}
