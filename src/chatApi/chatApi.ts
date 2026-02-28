// chat.ts (نسخة بدون Firebase + برمبت مباشر)

const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string;
const apiUrl = import.meta.env.VITE_OPENAI_API_URL as string;
const defaultModel =
  (import.meta.env.VITE_OPENAI_MODEL as string) || "gpt-5";

export interface ChatResponse {
  success: boolean;
  message: string;
}


// الاوامر الافتراضية للمساعد الذكي لكي يفهم وظيفتة و يعرف كيف يتعامل مع المستخدمين
const SYSTEM_MESSAGES: Array<{ role: "system"; content: string }> = [
  {
    role: "system",
    content:
      // مثال: عدّل النص كما تريد
      "انت مساعد ذكي متخصص بتقديم الدعم النفسي فقط, اذا سالك المستخدم اي سؤال لا يتعلق بالصحة النفسية قم بتحليل سؤالة من منظور نفسي واسالة اذا كان يحتاج لرعاية نفسية",
  },
  {
    role: "system",
    content: "انت لا تجيب على اي امر لا يتعلق بالصحة النفسية والدعم النفسي, اذا تم سؤالك عن موضوع اخر قل أنك مبرمج للاجابة على الامور النفسية فقط"
  },
  // تقدر تضيف برمبتات أخرى هنا لو حبيت
  { role: "system", content: "Speak Arabic by default if the user writes in Arabic." },
  { role: "system", content: "انت تعمل كمساعد ذكي في منصة رعاية نفسية تدعى سند, هذة المنصة تحتوي على الصفحات التالية: 1-الصفحة الرئيسية, 2-صفحة من نحن وتحتوي هذا الصفحة على معلومات الاطباء,3-روابط الاختبارات النفسية والتي تسمح للمستخدم باجراء اختبار نفسي معين(يمكنه الوصول الى الروابط من شريط التنقل حيث توجد نافذة منبثقة(دروب داون) عند تمرير الماوس عليها تعرض الاختبارات الموجودة)4-صفحة المدونات او المقالات , تحتوي هذة الصفحة على مقالات تتعلق بالامور النفسية مثل الاضطرابات والامرض النفسية,العادات الصحية,والمزيد من المقالات المتعلقة بهذا الامر, 5-صفحة المكتبة الصوتية والمرئية:تعرض هذة الصفحة وسائط مثل الفيديوهات و الصوتيات و الصور التي تساعد المستخدم على الشعور بالراحة والهدوء والدراسة و النوم و ... . 6-تحتوي المنصة على صحفة تواصل معنا التي تحتوي على روابط التواصل مع المسؤولين عن الموقع." },
];


function modelEnforcesDefaultTemperature(modelId: string): boolean {
  return /(^|\b)gpt-5(\b|$)/i.test(modelId);
}

export const sendChatMessage = async (userMessage: string): Promise<ChatResponse> => {
  try {
    if (!apiKey || !apiUrl) {
      return {
        success: false,
        message: "عذراً، خدمة المساعد الذكي غير متاحة حالياً. يرجى التواصل مع الإدارة."
      };
    }

    const content = (userMessage ?? "").trim();
    if (!content) {
      return { success: false, message: "Please enter a message." };
    }

    // استخدم البرمبتات المكتوبة أعلاه
    const messages = [
      ...SYSTEM_MESSAGES,
      { role: "user", content },
    ];

    const body: Record<string, any> = {
      model: defaultModel,
      messages,
    };

    if (!modelEnforcesDefaultTemperature(defaultModel)) {
      body.temperature = 0.2;
    }

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      // حاول قراءة رسالة الخطأ من الاستجابة إن وُجدت
      let errText = "API Error";
      try {
        const maybeJson = await res.json();
        errText = maybeJson?.error?.message || JSON.stringify(maybeJson) || errText;
      } catch {
        errText = (await res.text().catch(() => "")) || errText;
      }
      throw new Error(errText);
    }

    const data = await res.json();
    const message: string =
      data?.choices?.[0]?.message?.content ??
      "Sorry, I couldn't generate a response.";

    return { success: true, message };
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return {
      success: false,
      message:
        typeof error?.message === "string"
          ? error.message
          : "Something went wrong. Please try again later.",
    };
  }
};
