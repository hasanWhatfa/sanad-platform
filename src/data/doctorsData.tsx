// doctorsData.ts

export interface Review {
  userName: string;
  userImage: string;
  comment: string;
  rating: number; // تقييم من 5
}

export interface Doctor {
  id: number;
  name: string;
  description: string;
  breif: string;
  achievements: string[];
  image: string;
  review: Review[];
}

const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "د. سامر عابد",
    description: "اختصاصي علاج الصدمات النفسية واضطرابات القلق.",
    breif:
      "د. سامر عابد أخصائي في علم النفس الإكلينيكي، يعمل على دعم الأفراد في رحلتهم نحو التعافي من الإدمان والتعلّق السلوكي. يعتمد نهجًا علاجيًا شاملًا يجمع بين الإصغاء، الفهم العميق، وتحديد المسببات النفسية الكامنة خلف السلوك الإدماني.",
    achievements: [
      "حائز على جائزة أفضل طبيب نفسي لعام 2021",
      "مشارك في مؤتمر الصحة النفسية العالمي 2023",
      "مؤلف عدة أبحاث في الطب النفسي العصبي",
    ],
    image: "/images/manStanding3.webp",
    review: [
      {
        userName: "محمد هدهود",
        userImage: "/images/manStanding1.webp",
        comment: "استمعت جدًا للجلسة مع الدكتور سامر، كان مُنصت ومحترف.",
        rating: 5,
      },
      {
        userName: "سارة ابو خضر",
        userImage: "/images/woman1.webp",
        comment: "جلساته كانت مفيدة جدًا وساعدتني على تجاوز محنتي.",
        rating: 4,
      },
      {
        userName: "علي السامر",
        userImage: "/images/manStanding2.webp",
        comment: "شكراً دكتور سامر على المتابعة المستمرة والدعم.",
        rating: 5,
      },
      {
        userName: "منى عوض",
        userImage: "/images/woman2.webp",
        comment: "طريقة شرحه وتحليله للمشكلة كانت واضحة وعميقة.",
        rating: 4,
      },
    ],
  },
  {
    id: 2,
    name: "د. ليلى ناصر",
    description: "خبيرة في علاج الاكتئاب واضطرابات المزاج.",
    breif:
      "د. ليلى ناصر معالجة نفسية بخبرة تمتد لأكثر من عشر سنوات، تتميز بقدرتها على الاستماع العميق، وفهم الخلفيات الشخصية لكل حالة، مما يساعدها على تحليل جذور المشكلة بدقة ووضع خطة علاج مخصصة.",
    achievements: [
      "حائزة على جائزة التميز في الطب النفسي 2020",
      "عضوة في الجمعية العالمية للصحة النفسية",
      "مقدمة برامج توعية نفسية في الوطن العربي",
    ],
    image: "/images/woman2.webp",
    review: [
      {
        userName: "نورا شمس",
        userImage: "/images/woman3.webp",
        comment: "دكتورة رائعة ولطيفة، أعطتني شعور بالأمان.",
        rating: 5,
      },
      {
        userName: "فهد الحسن",
        userImage: "/images/manStanding1.webp",
        comment: "الاستشارات كانت مفيدة وفتحت لي آفاق جديدة.",
        rating: 4,
      },
      {
        userName: "سندس الرفاعي",
        userImage: "/images/woman2.webp",
        comment: "استفدت كثيرًا من الجلسات، شكرًا دكتورة.",
        rating: 5,
      },
      {
        userName: "عدي العزام",
        userImage: "/images/manStanding3.webp",
        comment: "تعامل محترف وفهم عميق للحالة النفسية.",
        rating: 4,
      },
    ],
  },
  {
    id: 3,
    name: "د. سامر الأحمد",
    description: "متخصص في الطب النفسي للأطفال والمراهقين.",
    breif:
      "د. سامر الأحمد معالج نفسي بخبرة تتجاوز 12 عامًا، يركز في عمله على فهم أعماق التجربة الإنسانية وتحليل جذور المعاناة النفسية. يتميز بأسلوب هادئ وإنساني مبني على الاستماع الدقيق.",
    achievements: [
      "حائز على جائزة الطبيب الشباب المميز 2019",
      "شارك في تطوير بروتوكولات علاج اضطراب نقص الانتباه",
      "مدرب معتمد في العلاج السلوكي المعرفي",
    ],
    image: "/images/docPhoto.webp",
    review: [
      {
        userName: "محمد هدهود",
        userImage: "/images/manStanding1.webp",
        comment: "ابني تحسن كثيرًا بعد الجلسات، شكرًا دكتور سامر.",
        rating: 5,
      },
      {
        userName: "رنا زهران",
        userImage: "/images/woman1.webp",
        comment: "متفهم جدًا ويعرف كيف يتعامل مع الأطفال.",
        rating: 4,
      },
      {
        userName: "خالد يوسف",
        userImage: "/images/manStanding2.webp",
        comment: "جلسة ممتازة ومنظمة جدًا.",
        rating: 4,
      },
      {
        userName: "سمية عماد",
        userImage: "/images/woman3.webp",
        comment: "تحسن واضح على حالة ابنتي بفضل الدكتور.",
        rating: 5,
      },
    ],
  },
  {
    id: 4,
    name: "د. مريم أحمد",
    description: "طبيبة نفسية متخصصة في علاج الصدمات العاطفية.",
    breif:
      "د. مريم تهتم بفهم التفاعلات الإنسانية العميقة داخل العلاقات، وتساعد الأفراد والأزواج على تخطي التحديات العاطفية والتواصل بشكل صحي. تؤمن بأهمية الإصغاء والاحتواء في العلاج.",
    achievements: [
      "حاصلة على شهادة العلاج النفسي التحليلي",
      "متحدثة رئيسية في مؤتمرات الطب النفسي العربي",
      "مؤلفة كتب تعليمية في الصحة النفسية",
    ],
    image: "/images/woman2.webp",
    review: [
      {
        userName: "سعاد حسين",
        userImage: "/images/woman2.webp",
        comment: "ممتنة جدًا للدكتورة مريم، ساعدتني كثيرًا.",
        rating: 5,
      },
      {
        userName: "أحمد فاضل",
        userImage: "/images/manStanding1.webp",
        comment: "كانت الجلسات مفيدة ومريحة للنفس.",
        rating: 4,
      },
      {
        userName: "آمنة جلال",
        userImage: "/images/woman1.webp",
        comment: "استطاعت تفهم وضعي بسرعة.",
        rating: 4,
      },
      {
        userName: "ليلى الرفاعي",
        userImage: "/images/woman3.webp",
        comment: "شكراً على رحابة الصدر والنصائح القيمة.",
        rating: 5,
      },
    ],
  },
  {
    id: 5,
    name: "د. خالد حسن",
    description: "خبير في اضطرابات القلق واضطرابات النوم.",
    breif:
      "د. خالد يعمل على مساعدة الأشخاص في إدارة القلق والتوتر والتغلب على مشاكل النوم المزمنة باستخدام تقنيات علمية متقدمة وأساليب علاجية فعالة.",
    achievements: [
      "حائز على جائزة التميز في أبحاث القلق 2022",
      "عضو لجنة الصحة النفسية في جامعة القاهرة",
      "مشارك في حملات التوعية بأهمية النوم الصحي",
    ],
    image: "/images/manStanding2.webp",
    review: [
      {
        userName: "رامي يوسف",
        userImage: "/images/manStanding3.webp",
        comment: "نصائح الدكتور ساعدتني على تحسين نومي.",
        rating: 5,
      },
      {
        userName: "شهد علي",
        userImage: "/images/woman2.webp",
        comment: "أسلوبه مريح وواضح.",
        rating: 4,
      },
      {
        userName: "أحمد خليل",
        userImage: "/images/manStanding1.webp",
        comment: "متابعته كانت رائعة وأفادتني.",
        rating: 5,
      },
      {
        userName: "ميساء جابر",
        userImage: "/images/woman1.webp",
        comment: "أوصي به بشدة لكل من يعاني من الأرق.",
        rating: 4,
      },
    ],
  },
  {
  id: 6,
  name: "د. حنان المصري",
  description: "اختصاصية في علاج اضطرابات الأكل والتقدير الذاتي.",
  breif:
    "د. حنان تؤمن بأن كل فرد يستحق أن يشعر بالرضا تجاه نفسه. تركز في علاجها على استعادة العلاقة الصحية مع الطعام والجسد، باستخدام أساليب معرفية وسلوكية فعّالة.",
  achievements: [
    "مؤلفة كتاب 'رحلة حب الذات'",
    "عضوة في الجمعية الدولية لعلاج اضطرابات الأكل",
    "مشاركة في حملات دعم الصحة النفسية للشباب",
  ],
  image: "/images/woman1.webp",
  review: [
    {
      userName: "سلمى أحمد",
      userImage: "/images/woman2.webp",
      comment: "ساعدتني أتعامل مع جسدي بحب وتقبل.",
      rating: 5,
    },
    {
      userName: "غادة نبيل",
      userImage: "/images/woman3.webp",
      comment: "كانت تجربة علاجية داعمة ومحفزة.",
      rating: 4,
    },
    {
      userName: "أماني فؤاد",
      userImage: "/images/woman1.webp",
      comment: "فهمتني بدون أحكام وساعدتني أتقدم.",
      rating: 5,
    },
    {
      userName: "ديمة خالد",
      userImage: "/images/woman2.webp",
      comment: "أنصح بها جداً خصوصاً للمراهقات.",
      rating: 5,
    },
  ],
},
{
  id: 7,
  name: "د. رائد العمري",
  description: "طبيب نفسي متخصص في الإدمان والعلاقات السامة.",
  breif:
    "د. رائد يدمج بين المقاربات العلمية والعلاج بالقبول والالتزام لمساعدة الأشخاص في كسر دائرة الإدمان وبناء حدود صحية في علاقاتهم.",
  achievements: [
    "خبير معتمد في علاج الإدمان السلوكي والكيميائي",
    "مدرب في مراكز إعادة التأهيل النفسية",
    "ناشط في توعية المجتمع بأضرار العلاقات السامة",
  ],
  image: "/images/manStanding3.webp",
  review: [
    {
      userName: "عدنان الشريف",
      userImage: "/images/manStanding1.webp",
      comment: "كان صادق ومباشر وساعدني أواجه الواقع.",
      rating: 5,
    },
    {
      userName: "نور الزين",
      userImage: "/images/woman3.webp",
      comment: "تجربتي معه غيرت حياتي فعلاً.",
      rating: 5,
    },
    {
      userName: "زياد المصري",
      userImage: "/images/manStanding2.webp",
      comment: "فهم الإدمان بطريقة إنسانية بدون لوم.",
      rating: 4,
    },
    {
      userName: "ليان حسن",
      userImage: "/images/woman1.webp",
      comment: "أنقذني من علاقة مرهقة كنت عالقة فيها.",
      rating: 5,
    },
  ],
},
{
  id: 8,
  name: "د. يارا فواز",
  description: "متخصصة في علاج اضطراب الشخصية الحدية والقلق المزمن.",
  breif:
    "د. يارا تعمل على تمكين مرضاها من فهم نمط تفكيرهم وتعديل السلوكيات السامة باستخدام العلاج الجدلي السلوكي، وتؤمن بقوة بالعلاقة العلاجية الداعمة.",
  achievements: [
    "مدربة معتمدة في DBT",
    "مشاركة في ورش دعم الصحة النفسية للنساء",
    "مستشارة في عدد من المنظمات الإنسانية",
  ],
  image: "/images/woman2.webp",
  review: [
    {
      userName: "هدى رامي",
      userImage: "/images/woman3.webp",
      comment: "أعطتني أدوات عملية أقدر أستخدمها يومياً.",
      rating: 5,
    },
    {
      userName: "رغد يوسف",
      userImage: "/images/woman1.webp",
      comment: "كانت علاقتها معي إنسانية جداً ومحترفة.",
      rating: 5,
    },
    {
      userName: "آية أسامة",
      userImage: "/images/woman2.webp",
      comment: "فهمتني بعمق وساعدتني أتحكم بانفعالاتي.",
      rating: 4,
    },
    {
      userName: "ميس حسام",
      userImage: "/images/woman1.webp",
      comment: "أفضل دكتورة تعاملت معها في حياتي.",
      rating: 5,
    },
  ],
},
{
  id: 9,
  name: "د. عماد السعدي",
  description: "أخصائي نفسي في إدارة الغضب والعلاقات الأسرية.",
  breif:
    "د. عماد يساعد الأفراد والأزواج على فهم جذور التوتر والانفعالات المفرطة داخل الأسرة، ويعمل على إعادة بناء التواصل الإيجابي باستخدام استراتيجيات فعالة ومجربة.",
  achievements: [
    "أستاذ جامعي في علم النفس الأسري",
    "مقدم ورش تدريبية في الذكاء العاطفي",
    "كاتب عمود أسبوعي في جريدة الصحة النفسية",
  ],
  image: "/images/manStanding2.webp",
  review: [
    {
      userName: "رائد طه",
      userImage: "/images/manStanding1.webp",
      comment: "خلاني أفهم مشاعري قبل ما تنفجر.",
      rating: 5,
    },
    {
      userName: "لبنى محمد",
      userImage: "/images/woman2.webp",
      comment: "ساعدني على تحسين علاقتي بزوجي وأولادي.",
      rating: 5,
    },
    {
      userName: "ثريا نبيل",
      userImage: "/images/woman3.webp",
      comment: "نصائحه كانت واقعية وسهلة التطبيق.",
      rating: 4,
    },
    {
      userName: "مازن ناصر",
      userImage: "/images/manStanding3.webp",
      comment: "أول مرة أحس حدا فهم غضبي بدون يحكم علي.",
      rating: 5,
    },
  ],
},
{
  id: 10,
  name: "د. نادين يوسف",
  description: "متخصصة في الدعم النفسي بعد الفقد والطلاق.",
  breif:
    "د. نادين ترافق الأفراد في المراحل الصعبة من حياتهم، وتقدم لهم الدعم المهني والإنساني لتخطي الحزن، والعودة إلى الحياة بثقة وكرامة.",
  achievements: [
    "محاضرة في مركز الإرشاد الأسري",
    "مؤسسة مبادرة 'نتعافى معاً'",
    "خبرة في العلاج الجماعي والدعم النفسي الطارئ",
  ],
  image: "/images/woman3.webp",
  review: [
    {
      userName: "يمنى علاء",
      userImage: "/images/woman2.webp",
      comment: "وجودها كان مصدر أمان بالنسبة إلي.",
      rating: 5,
    },
    {
      userName: "ربى سالم",
      userImage: "/images/woman1.webp",
      comment: "علمتني كيف أعيش لحالي بسلام.",
      rating: 5,
    },
    {
      userName: "نورا جابر",
      userImage: "/images/woman2.webp",
      comment: "صوتها لحاله بيعطي راحة نفسية.",
      rating: 4,
    },
    {
      userName: "رنا جاسم",
      userImage: "/images/woman3.webp",
      comment: "ما حسيت يوم إني وحيدة خلال العلاج.",
      rating: 5,
    },
  ],
}

];

export default doctorsData;
