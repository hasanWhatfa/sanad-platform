export interface TestCardProps {
  title: string;
  description: string;
  name_id:string;
  id:number;
}

export const testCardData : TestCardProps[]= [
    {
    title: "اختبار القلق",
    description: "اختبار يقيس مستوى القلق لديك من خلال مجموعة أسئلة قصيرة مبنية على أسس علمية.",
    name_id:"anxiety",
    id:2
    },
    {
    title: "اختبار الاكتئاب",
    description: "يقيّم مؤشرات الاكتئاب بناءً على إجاباتك، ليساعدك على فهم حالتك النفسية.",
    name_id:"depression",
    id:4
    },
    {
    title: "اختبار التعلق",
    description: "يساعدك على معرفة نمط التعلق العاطفي لديك، وكيف يؤثر على علاقاتك.",
    name_id:"attachment",
    id:1
    },
    {
    title: "اختبار فرط الحركة وتشتت الانتباه (ADHD)",
    description: "يقيس احتمالية وجود أعراض فرط الحركة وتشتت الانتباه لمساعدتك على فهم نفسك أكثر.",
    name_id:"adhd",
    id:3
    }
]