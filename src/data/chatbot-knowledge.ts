export type Intent = {
  id: string;
  keywords: string[];
  keywordsAr: string[];
  response: string;
  responseAr: string;
  suggestions?: string[];
  suggestionsAr?: string[];
};

export const intents: Intent[] = [
  {
    id: "greeting",
    keywords: ["bonjour", "salut", "hello", "bonsoir", "coucou", "hey", "bjr", "slt"],
    keywordsAr: ["السلام", "مرحبا", "أهلا", "صباح", "مساء"],
    response: "Bonjour ! Je suis l'assistant virtuel du Cabinet Dentaire Dr. [Nom]. Je suis là pour répondre à vos questions sur nos services, les rendez-vous, ou toute autre information. Comment puis-je vous aider ?",
    responseAr: "مرحباً! أنا المساعد الافتراضي لعيادة طب الأسنان. أنا هنا للإجابة على أسئلتكم حول خدماتنا، المواعيد، أو أي معلومات أخرى. كيف يمكنني مساعدتك؟",
    suggestions: ["Prendre rendez-vous", "Nos services", "Horaires d'ouverture", "Nous contacter"],
    suggestionsAr: ["حجز موعد", "خدماتنا", "ساعات العمل", "اتصل بنا"],
  },
  {
    id: "appointment_booking",
    keywords: ["rendez-vous", "rdv", "prendre", "réserver", "booking", "réservation", "prendre rdv", "consulter"],
    keywordsAr: ["موعد", "حجز", "احجز", "الحجز"],
    response: "Pour prendre rendez-vous, vous avez deux options :\n\n1️⃣ **En ligne** : Utilisez notre système de réservation depuis la page \"Prendre rendez-vous\" sur notre site.\n\n2️⃣ **Par téléphone** : Appelez-nous au 05XX-XXXXXX du lundi au vendredi de 9h à 17h.\n\nSouhaitez-vous être dirigé vers la page de réservation ?",
    responseAr: "لحجز موعد، لديك خياران:\n\n1️⃣ **عبر الإنترنت**: استخدم نظام الحجز الخاص بنا من صفحة \"احجز موعدًا\" على موقعنا.\n\n2️⃣ **هاتفياً**: اتصل بنا على 05XX-XXXXXX من الاثنين إلى الجمعة من 9 صباحاً إلى 5 مساءً.\n\nهل ترغب في التوجيه إلى صفحة الحجز؟",
    suggestions: ["Aller à la réservation", "Horaires", "Annuler un RDV"],
    suggestionsAr: ["الذهاب إلى الحجز", "ساعات العمل", "إلغاء موعد"],
  },
  {
    id: "services_list",
    keywords: ["service", "services", "consultation", "consultations", "soins", "dentaire", "dentiste", "quoi"],
    keywordsAr: ["خدمات", "خدمة", "استشارة", "رعاية", "أسنان", "علاج"],
    response: "Notre cabinet propose les services suivants :\n\n🦷 **Consultations générales** : Détartrage, caries, soins conservateurs\n🦷 **Chirurgie dentaire** : Extractions, dents de sagesse, implants\n🦷 **Orthodontie** : Bagues, aligneurs invisibles\n🦷 **Blanchiment dentaire** : Professionnel en cabinet\n🦷 **Prothèses** : Couronnes, bridges\n🦷 **Urgences dentaires** : Douleurs, abcès\n\nPour plus de détails, consultez notre page Services.",
    responseAr: "يقدم عيادتنا الخدمات التالية:\n\n🦷 **الاستشارات العامة**: تنظيف، تسوس، علاج تحفظي\n🦷 **جراحة الأسنان**: قلع، ضروس العقل، زراعة\n🦷 **تقويم الأسنان**: تقويم، مصففات شفافة\n🦷 **تبييض الأسنان**: تبييض احترافي في العيادة\n🦷 **تركيبات**: تيجان، جسور\n🦷 **طوارئ الأسنان**: آلام، خراجات\n\nلمزيد من التفاصيل، راجع صفحة الخدمات.",
    suggestions: ["Chirurgie dentaire", "Orthodontie", "Blanchiment", "Prendre RDV"],
    suggestionsAr: ["جراحة الأسنان", "تقويم الأسنان", "تبييض", "حجز موعد"],
  },
  {
    id: "hours",
    keywords: ["horaire", "horaires", "heure", "ouvert", "fermé", "jour", "quand", "semaine", "samedi", "dimanche"],
    keywordsAr: ["ساعات", "وقت", "مفتوح", "مغلق", "أيام", "متى", "أسبوع", "السبت", "الأحد"],
    response: "**Horaires d'ouverture :**\n\n📅 Lundi – Vendredi : 9h00 – 17h00\n📅 Samedi : 9h00 – 13h00\n❌ Dimanche : Fermé\n\nPour les urgences, veuillez nous contacter par téléphone.",
    responseAr: "**ساعات العمل:**\n\n📅 الاثنين – الجمعة: 9:00 – 17:00\n📅 السبت: 9:00 – 13:00\n❌ الأحد: مغلق\n\nللحالات الطارئة، يرجى الاتصال بنا هاتفياً.",
    suggestions: ["Prendre rendez-vous", "Nous contacter", "Adresse"],
    suggestionsAr: ["حجز موعد", "اتصل بنا", "العنوان"],
  },
  {
    id: "contact",
    keywords: ["contact", "téléphone", "tel", "appeler", "appel", "email", "mail", "joindre", "numéro"],
    keywordsAr: ["اتصال", "هاتف", "اتصل", "رقم", "بريد", "إيميل"],
    response: "**Nous contacter :**\n\n📞 Téléphone : 05XX-XXXXXX\n📧 Email : contact@cabinet-dentaire.ma\n💬 WhatsApp : Cliquez sur l'icône WhatsApp en bas à droite\n📍 Adresse : [Adresse du cabinet], [ville]\n\nN'hésitez pas à nous appeler pendant les heures d'ouverture !",
    responseAr: "**اتصل بنا:**\n\n📞 الهاتف: 05XX-XXXXXX\n📧 البريد الإلكتروني: contact@cabinet-dentaire.ma\n💬 واتساب: انقر على أيقونة واتساب في الأسفل يميناً\n📍 العنوان: [عنوان العيادة], [مدينة]\n\nلا تتردد في الاتصال بنا خلال ساعات العمل!",
    suggestions: ["Horaires", "Adresse", "Prendre RDV", "WhatsApp"],
    suggestionsAr: ["ساعات العمل", "العنوان", "حجز موعد", "واتساب"],
  },
  {
    id: "address",
    keywords: ["adresse", "où", "localisation", "trouver", "venir", "map", "plan"],
    keywordsAr: ["عنوان", "أين", "موقع", "مكان", "الوصول"],
    response: "**Notre adresse :**\n\n📍 [Adresse complète du cabinet]\n📍 [ville], Maroc\n\nConsultez notre page Contact pour voir la carte interactive et les indications pour nous trouver facilement.",
    responseAr: "**عنواننا:**\n\n📍 [العنوان الكامل للعيادة]\n📍 [مدينة]، المغرب\n\nتفضل بزيارة صفحة الاتصال لرؤية الخريطة التفاعلية واتجاهات الوصول إلينا بسهولة.",
    suggestions: ["Contact", "Horaires", "Prendre RDV"],
    suggestionsAr: ["اتصل بنا", "ساعات العمل", "حجز موعد"],
  },
  {
    id: "dental_cleaning",
    keywords: ["détartrage", "nettoyage", "tartre", "dentiste", "nettoyage dentaire", "calcaire", "plaque"],
    keywordsAr: ["تنظيف", "جير", "قلح", "كلس", "بلاك"],
    response: "**Détartrage professionnel :**\n\nLe détartrage est recommandé 1 à 2 fois par an. Il permet d'éliminer le tartre et la plaque dentaire que le brossage seul ne peut pas enlever.\n\nL'intervention est indolore et dure environ 30 minutes. Après le détartrage, vos dents retrouvent leur éclat naturel et vos gencives sont en meilleure santé.\n\nPrenez rendez-vous pour un détartrage de contrôle.",
    responseAr: "**تنظيف الأسنان الاحترافي:**\n\nيُنصح بإزالة الجير مرة أو مرتين سنوياً. يسمح بإزالة الجير والطبقة البكتيرية التي لا يستطيع التنظيف بالفرشاة إزالتها.\n\nالإجراء غير مؤلم ويستغرق حوالي 30 دقيقة. بعد التنظيف، تستعيد أسنانك بريقها الطبيعي وتصبح لثتك أكثر صحة.\n\nاحجز موعداً للتنظيف الدوري.",
    suggestions: ["Blanchiment", "Consultation", "Prendre RDV"],
    suggestionsAr: ["تبييض", "استشارة", "حجز موعد"],
  },
  {
    id: "whitening",
    keywords: ["blanchiment", "blanchir", "dents blanches", "éclat", "sourire", "esthétique", "blanc"],
    keywordsAr: ["تبييض", "تبييض الأسنان", "أسنان بيضاء", "ابتسامة", "تجميل"],
    response: "**Blanchiment dentaire :**\n\nNous proposons deux méthodes :\n\n✨ **En cabinet** : 1 séance de 1h30, résultats immédiats (4 à 8 teintes plus claires)\n✨ **À domicile** : Gouttières sur mesure à porter la nuit pendant 1 à 2 semaines\n\nLe blanchiment est sans danger pour l'émail. Un bilan préalable est nécessaire pour vérifier l'absence de caries ou de gencives sensibles.\n\nLes résultats durent 1 à 3 ans avec une bonne hygiène.",
    responseAr: "**تبييض الأسنان:**\n\nنقدم طريقتين:\n\n✨ **في العيادة**: جلسة واحدة مدتها 1.5 ساعة، نتائج فورية (4-8 درجات أفتح)\n✨ **في المنزل**: قوالب مخصصة ترتديها ليلاً لمدة أسبوع إلى أسبوعين\n\nالتبييض آمن للمينا. الفحص المسبق ضروري للتحقق من عدم وجود تسوس أو لثة حساسة.\n\nالنتائج تدوم من 1 إلى 3 سنوات مع نظافة جيدة.",
    suggestions: ["Détartrage", "Consultation", "Prendre RDV"],
    suggestionsAr: ["تنظيف", "استشارة", "حجز موعد"],
  },
  {
    id: "implants",
    keywords: ["implant", "implants", "implant dentaire", "dent manquante", "remplacer", "bridge", "couronne"],
    keywordsAr: ["زرع", "زراعة", "غرسة", "سن مفقود", "تعويض", "جسر", "تاج"],
    response: "**Implants dentaires :**\n\nL'implant dentaire est la solution idéale pour remplacer une ou plusieurs dents manquantes. C'est une racine artificielle en titane qui s'intègre à l'os de la mâchoire.\n\nAvantages : aspect naturel, préservation de l'os, durabilité (20 ans+).\n\nLe processus comprend : consultation avec imagerie 3D, pose de l'implant sous anesthésie locale, période d'ostéointégration (3-6 mois), pose de la couronne.\n\nPrenez rendez-vous pour une évaluation.",
    responseAr: "**زراعة الأسنان:**\n\nزراعة الأسنان هي الحل الأمثل لتعويض سن أو عدة أسنان مفقودة. وهي جذر اصطناعي من التيتانيوم يندمج مع عظم الفك.\n\nالمزايا: مظهر طبيعي، الحفاظ على العظم، متانة (20 سنة+).\n\nتشمل العملية: استشارة مع تصوير ثلاثي الأبعاد، زرع الغرسة تحت التخدير الموضعي، فترة اندماج عظمي (3-6 أشهر)، تركيب التاج.\n\nاحجز موعداً للتقييم.",
    suggestions: ["Consultation", "Chirurgie", "Prendre RDV"],
    suggestionsAr: ["استشارة", "جراحة", "حجز موعد"],
  },
  {
    id: "orthodontics",
    keywords: ["orthodontie", "bagues", "dents droites", "aligneurs", "invisalign", "appareil dentaire", "redresser"],
    keywordsAr: ["تقويم", "أسلاك", "مصففات", "أسنان مستقيمة", "شفاف"],
    response: "**Orthodontie :**\n\nNous proposons des traitements orthodontiques pour enfants et adultes :\n\n🔹 **Bagues métalliques** : Solution classique et économique\n🔹 **Bagues céramique** : Plus discrètes\n🔹 **Aligneurs transparents** : Amovibles et invisibles\n\nLa durée du traitement varie de 6 à 24 mois selon la complexité du cas.\n\nConsultez-nous pour un devis personnalisé.",
    responseAr: "**تقويم الأسنان:**\n\nنقدم علاجات تقويمية للأطفال والكبار:\n\n🔹 **الأقواس المعدنية**: حل كلاسيكي واقتصادي\n🔹 **الأقواس الخزفية**: أكثر خفاءً\n🔹 **المصففات الشفافة**: قابلة للإزالة وغير مرئية\n\nمدة العلاج تتراوح من 6 إلى 24 شهراً حسب تعقيد الحالة.\n\nاستشرنا للحصول على عرض أسعار شخصي.",
    suggestions: ["Consultation", "Blanchiment", "Prendre RDV"],
    suggestionsAr: ["استشارة", "تبييض", "حجز موعد"],
  },
  {
    id: "preparation",
    keywords: ["préparation", "préparer", "avant", "conseil", "conseils", "comment", "déroule", "se passer"],
    keywordsAr: ["تحضير", "استعداد", "قبل", "نصيحة", "نصائح", "كيف"],
    response: "**Préparation pour une consultation :**\n\n✅ Brossez-vous les dents avant de venir\n✅ Apportez votre carte d'identité\n✅ Prévoyez la liste de vos médicaments actuels\n✅ Notez vos questions pour ne pas les oublier\n✅ Arrivez 10 minutes avant l'heure du rendez-vous\n\nPour une radiographie ou un soin spécifique, notre secrétaire vous donnera les instructions nécessaires lors de la réservation.",
    responseAr: "**التحضير للاستشارة:**\n\n✅ نظف أسنانك قبل القدوم\n✅ أحضر بطاقة التعريف\n✅ حضّر قائمة أدويتك الحالية\n✅ دوّن أسئلتك لعدم نسيانها\n✅ احضر قبل الموعد بـ 10 دقائق\n\nلأي فحص أو علاج خاص، ستعطيك سكرتيرتنا التعليمات اللازمة عند الحجز.",
    suggestions: ["Prendre RDV", "Services", "Contact"],
    suggestionsAr: ["حجز موعد", "الخدمات", "اتصل بنا"],
  },
  {
    id: "emergency",
    keywords: ["urgence", "urgent", "douleur", "saignement", "grave", "urgences", "abcès", "dent cassée", "traumatisme"],
    keywordsAr: ["طوارئ", "طارئ", "ألم", "نزيف", "خطير", "خراج", "سن مكسور"],
    response: "⚠️ **Si vous avez une urgence dentaire, veuillez appeler immédiatement le 05XX-XXXXXX.**\n\nNotre cabinet assure un service d'urgence sous 24h pour les cas aigus : douleurs violentes, abcès, dents cassées ou délogées.\n\n**En attendant :**\n- Rincez à l'eau salée tiède\n- Appliquez du froid sur la joue en cas de gonflement\n- Prenez un antalgique (paracétamol) si nécessaire\n\nCe chatbot ne remplace pas une consultation médicale d'urgence.",
    responseAr: "⚠️ **إذا كانت لديك حالة طارئة في الأسنان، يرجى الاتصال فوراً على 05XX-XXXXXX.**\n\nعيادتنا توفر خدمة طوارئ خلال 24 ساعة للحالات الحادة: آلام شديدة، خراجات، أسنان مكسورة أو مخلوعة.\n\n**أثناء الانتظار:**\n- اغسل بالماء الدافئ المملح\n- ضع كمادات باردة على الخد في حالة التورم\n- تناول مسكناً (باراسيتامول) إذا لزم الأمر\n\nهذا المساعد لا يغني عن الاستشارة الطبية الطارئة.",
    suggestions: ["Contact", "Prendre RDV"],
    suggestionsAr: ["اتصل بنا", "حجز موعد"],
  },
  {
    id: "thankyou",
    keywords: ["merci", "merci beaucoup", "remercier", "thanks", "thank"],
    keywordsAr: ["شكرا", "شكراً", "جزيل"],
    response: "Je vous en prie ! N'hésitez pas si vous avez d'autres questions. 😊\n\nSi vous souhaitez prendre rendez-vous, vous pouvez le faire directement sur notre site ou nous appeler.",
    responseAr: "العفو! لا تتردد في طرح أي أسئلة أخرى. 😊\n\nإذا كنت ترغب في حجز موعد، يمكنك القيام بذلك مباشرة على موقعنا أو الاتصال بنا.",
    suggestions: ["Prendre RDV", "Services", "Contact"],
    suggestionsAr: ["حجز موعد", "الخدمات", "اتصل بنا"],
  },
  {
    id: "farewell",
    keywords: ["au revoir", "bye", "à bientôt", "bonne journée", "bonsoir", "ciao", "à plus"],
    keywordsAr: ["وداعاً", "مع السلامة", "إلى اللقاء", "تصبح على خير"],
    response: "Merci de votre visite ! Passez une excellente journée. 😊\n\nPour toute question, n'hésitez pas à revenir ou à consulter notre site web.",
    responseAr: "شكراً لزيارتك! أتمنى لك يوماً رائعاً. 😊\n\nلأي استفسار، لا تتردد في العودة أو زيارة موقعنا.",
    suggestions: ["Prendre RDV", "Services", "Contact"],
    suggestionsAr: ["حجز موعد", "الخدمات", "اتصل بنا"],
  },
  {
    id: "default",
    keywords: [],
    keywordsAr: [],
    response: "Je suis désolé, je n'ai pas bien compris votre question. Pourriez-vous reformuler ?\n\nJe peux vous aider avec :\n✅ Prise de rendez-vous\n✅ Informations sur nos services (soins, chirurgie, orthodontie, blanchiment, implants)\n✅ Horaires et contact\n✅ Préparation aux soins\n✅ Urgences dentaires\n\nOu vous pouvez consulter notre site web pour plus d'informations.",
    responseAr: "آسف، لم أفهم سؤالك جيداً. هل يمكنك إعادة الصياغة؟\n\nيمكنني مساعدتك في:\n✅ حجز المواعيد\n✅ معلومات عن خدماتنا (علاج، جراحة، تقويم، تبييض، زراعة)\n✅ ساعات العمل والاتصال\n✅ التحضير للعلاج\n✅ طوارئ الأسنان\n\nأو يمكنك زيارة موقعنا لمزيد من المعلومات.",
    suggestions: ["Prendre RDV", "Services", "Horaires", "Contact"],
    suggestionsAr: ["حجز موعد", "الخدمات", "ساعات العمل", "اتصل بنا"],
  },
];

export const quickActions = [
  { label: "🦷 Consultation", labelAr: "🦷 استشارة", query: "Consultation dentaire" },
  { label: "📅 Prendre RDV", labelAr: "📅 حجز موعد", query: "Prendre rendez-vous" },
  { label: "✨ Blanchiment", labelAr: "✨ تبييض", query: "Blanchiment dentaire" },
  { label: "🕐 Horaires", labelAr: "🕐 ساعات العمل", query: "Horaires d'ouverture" },
];
