export interface TestCardProps {
  title: string;
  description: string;
  testID:string;
}

export const testCardData : TestCardProps[]= [
    {
    title: "اختبار القلق",
    description: "اختبار يقيس مستوى القلق لديك من خلال مجموعة أسئلة قصيرة مبنية على أسس علمية.",
    testID:"anxiety"
    },
    {
    title: "اختبار الاكتئاب",
    description: "يقيّم مؤشرات الاكتئاب بناءً على إجاباتك، ليساعدك على فهم حالتك النفسية.",
    testID:"depression"
    },
    {
    title: "اختبار التعلق",
    description: "يساعدك على معرفة نمط التعلق العاطفي لديك، وكيف يؤثر على علاقاتك.",
    testID:"attachment"
    },
    {
    title: "اختبار فرط الحركة وتشتت الانتباه (ADHD)",
    description: "يقيس احتمالية وجود أعراض فرط الحركة وتشتت الانتباه لمساعدتك على فهم نفسك أكثر.",
    testID:"adhd"
    }
]