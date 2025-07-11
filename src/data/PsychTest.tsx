import attchmentImage from '/images/attachmentImage.jpg';


export interface PsychTest {
  id: string;                        
  testName: string;
  testTitle: string;
  hook: string;
  testSentence: string;
  testImage: string;
  testTitleQuestion: string;
  testQuestionDesc: string;
  aboutDisorder: string[];
  questions: PsychTestQuestion[];
  tips?: string[];
}
export interface PsychTestQuestion {
  questId:number;
  questionText: string;                   
  questionDesc: string;                    
  options: PsychTestOption[];             
}
export interface PsychTestOption {
  optionText: string;                     
  score: number;                          
}


export const testsData: PsychTest[] =
[
  {
    id: "attachment",
    testName: "التعلق",
    testTitle: "اختبار أنماط التعلق",
    hook: "اكتشف نمط تعلقك في العلاقات العاطفية والاجتماعية.",
    testSentence: "هذا الاختبار لا يُعد بديلاً عن التقييم العيادي، لكنه يساعدك على فهم كيفية تعاملك مع القرب والارتباط.",
    testImage: attchmentImage,
    testTitleQuestion: "هل تعرف كيف تتفاعل عاطفياً مع من تحب؟",
    testQuestionDesc: "اختبر نمط التعلق لديك في دقائق معدودة، مجاناً وبدون الحاجة لتسجيل.",
    aboutDisorder: [
      "نظرية التعلق (Attachment Theory) تُعنى بكيفية تشكّل علاقاتنا العاطفية والاجتماعية، انطلاقاً من الطفولة وحتى البلوغ.",
      "يوجد أربعة أنماط رئيسية للتعلق: الآمن، القلق، التجنبي، والتعلق المضطرب (الخائف). لكل نمط خصائص معينة تؤثر على سلوكنا في العلاقات.",
      "فهم نمط التعلق يمكن أن يساعدك على تحسين علاقاتك، التعامل مع الشريك أو الأصدقاء بوعي، وتطوير الذات من خلال الشفاء العاطفي."
    ],
    questions: [
      {
        questId:1,
        questionText: "هل تشعر بالقلق عندما لا يرد عليك الطرف الآخر مباشرة؟",
        questionDesc: "مثل الشعور بالإهمال أو الهجر عند عدم الرد.",
        options: [
          { optionText: "نعم، بشكل متكرر", score: 3 },
          { optionText: "أحياناً", score: 2 },
          { optionText: "نادراً", score: 1 },
          { optionText: "لا، أبداً", score: 0 },
        ]
      },
      {
        questId:2,
        questionText: "هل تجد صعوبة في طلب المساعدة أو التعبير عن احتياجاتك؟",
        questionDesc: "خاصة عند شعورك بالضعف أو الحاجة للدعم.",
        options: [
          { optionText: "نعم، دائماً", score: 3 },
          { optionText: "أحياناً", score: 2 },
          { optionText: "نادراً", score: 1 },
          { optionText: "لا، أعبّر بسهولة", score: 0 },
        ]
      },
      {
        questId:3,
        questionText: "هل تحاول تجنّب القرب العاطفي العميق مع الآخرين؟",
        questionDesc: "مثل التهرب من المصارحة أو الانفتاح الكامل.",
        options: [
          { optionText: "نعم، أجد صعوبة في ذلك", score: 3 },
          { optionText: "أحياناً", score: 2 },
          { optionText: "نادراً", score: 1 },
          { optionText: "لا، أحب القرب", score: 0 },
        ]
      },
      {
        questId:4,
        questionText: "هل تخاف من أن يتم التخلي عنك رغم محبة الطرف الآخر؟",
        questionDesc: "مثل الإحساس الدائم بأن العلاقة قد تنتهي فجأة.",
        options: [
          { optionText: "نعم، كثيراً", score: 3 },
          { optionText: "أحياناً", score: 2 },
          { optionText: "نادراً", score: 1 },
          { optionText: "لا، أثق بالعلاقة", score: 0 },
        ]
      },
      {
        questId:5,
        questionText: "هل تميل إلى المثالية أو الإفراط في التعلّق عندما تحب؟",
        questionDesc: "مثل الشعور بأنك لا تستطيع العيش دون الطرف الآخر.",
        options: [
          { optionText: "نعم، جداً", score: 3 },
          { optionText: "أحياناً", score: 2 },
          { optionText: "نادراً", score: 1 },
          { optionText: "لا، عندي توازن", score: 0 },
        ]
      }
    ],
    tips: [
      "راقب مشاعرك عند القرب أو البعد من الآخرين، ودوّنها.",
      "ابدأ تدريجياً بالتعبير عن احتياجاتك دون خوف.",
      "اقرأ أكثر عن نمط التعلق القلق أو التجنبي لتتعرف على نفسك.",
      "جلسات الدعم العاطفي قد تكون مفيدة جداً في تنظيم التعلّق.",
    ]
  }


]



