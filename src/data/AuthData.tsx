export interface AuthData{
    type:'login' | 'signup';
    data:FormInterface;
}

interface FormInterface{
    title:string;
    passwordField:Filed;
    confirmPass?:Filed;
    emailField:Filed;
    btnContent:string;
    firstName?:Filed;
    laseName?:Filed;
    ageField?:Filed;
    gender?:Filed;
    img?:Filed
    dontYou:{
        text:string;
        linkWords:string;
    }
}
export interface Filed{
    title:string;
    placeholder:string;
    type?:'email'|'text'|'date'|'time'|'password'|'number'|'select'|'file';
    options?:Array<string>;
}

export const authDataFinal :  AuthData[] = [
    {
    type:'login',
    data:{
        title:'اهلا بعودتك',
        emailField:{
            title:'البريد الالكتروني',
            placeholder:'ادخل بريدك الالكتروني...',
            type:'email'
        },
        passwordField:{
            title:'كلمة المرور',
            placeholder:'Enter your password',
            type:'password'
        },
        btnContent:'تسجيل دخول',
        dontYou:{
            text:'ليس لديك حساب؟',
            linkWords:'انشئ حساب',
        },
    }
  }, 
  {
    type:'signup',
    data:{
        title:'انضم الينا',
        firstName:{
            type:'text',
            title:'الاسم الأول:',
            placeholder:'ادخل اسمك الاول....'
        },
        laseName:{
            type:'text',
            title:'الاسم الثاني: ',
            placeholder:"ادخل اسمك الثاني..."
        },
        emailField:{
            type:'email',
            title:'البريد الالكتروني:',
            placeholder:"ادخل بريدك الالكتروني..."
        },
        gender:{
            title:'الجنس: ',
            placeholder:"اختر جنسك",
            options:['ذكر','انثى'],
            type:'select'
        },
        ageField:{
            title:"العمر:",
            placeholder:"ادخل عمرك",
            type:"number"
        },
        passwordField:{
            title:'كلمة المرور: ',
            placeholder:"اختر كلمة مرور قوية",
            type:"password",
        },
        confirmPass:{
            title:'تأكيد كلمة المرور: ',
            placeholder:"اعد ادخال كلمة المرور",
            type:"password"
        },
        btnContent:"انشئ حساب",
        dontYou:{
            text:"هل لديك حساب؟",
            linkWords:"سجل دخول"
        }
    }
  }
]