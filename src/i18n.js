import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    kk: {
        translation: {
            appName: "Chatbot Baiterek",
            subTitle: "қызметкерлерге арналған чат-бот",
            welcomeMessage: "Сәлеметсіз бе! Мен — Бәйтерек холдингінің виртуалды көмекшісімін және мен жасанды интеллект негізінде жұмыс істеймін 🤖",
            disclaimer: "Бұл чат-бот тек қана анықтамалық ақпарат ұсынады",

            /* старые ключи, оставляем без изменений */
            category: "Санат",
            direction: "Бағыт",
            hintChoose: "Алдымен санат пен бағытты таңдаңыз ↑",
            hintWrite: "Сұрағыңызды жазыңыз 👇",
            btnSend: "Жіберу",
            directions: {
                credit: ["Өнеркәсіп", "Құрылысшы", "Фермер", "Экспортёр", "Басқа"],
                leasing: ["А/ш", "Көлік", "Жабдық", "Басқа"],
                guarantee: ["ШОБ", "IT жоба", "Басқа"],
                subsidy: ["Пайыз", "Инвестиция"],
                insurance: ["Мүлік", "Экспорт", "Денсаулық"],
                invest: ["Стартап", "Өндіріс"],
            },

            /* новые ключи для ChatBot */
            selectCompany: "Компанияны таңдаңыз",
            employees: "Компания қызметкерлері",
            hintNoCompany: "Алдымен жоғарыдан компанияны таңдаңыз...",
            hintNoEmployee: "Содан кейін қызметкерді таңдап, чат бастауға болады.",
            hintEmployee: "{{employee}} - мүшеге хабарлама жіберіңіз ({{company}} компаниясы)",
            placeholderDefault: "Сұрақтарыңызды қоя беріңіз",
            placeholderMessage: "{{employee}} - мүшеге хабарлама ұсыныңыз",
        },
    },

    ru: {
        translation: {
            appName: "Chatbot Baiterek",
            subTitle: "чат-бот для сотрудников",
            welcomeMessage: "Здравствуйте! Я - виртуальный помощник Холдинга Байтерек и работаю на искусственном интеллекте 🤖",
            disclaimer: "Информация, предоставляемая данным чат-ботом, носит исключительно справочный характер",

            /* старые ключи */
            category: "Категория",
            direction: "Направление",
            hintChoose: "Сначала выберите категорию и направление ↑",
            hintWrite: "Напишите свой вопрос 👇",
            btnSend: "Отправить",
            directions: {
                credit: ["Промышленник", "Строитель", "Фермер", "Экспортер", "Прочее"],
                leasing: ["Сельхоз", "Транспорт", "Оборудование", "Прочее"],
                guarantee: ["МСП", "IT-проекты", "Прочее"],
                subsidy: ["Проценты", "Инвестиции"],
                insurance: ["Имущество", "Экспорт", "Здоровье"],
                invest: ["Стартап", "Производство"],
            },

            /* новые ключи для ChatBot */
            selectCompany: "Выберите компанию",
            employees: "Сотрудники компании",
            hintNoCompany: "Пожалуйста, выберите компанию выше...",
            hintNoEmployee: "Теперь выберите сотрудника, чтобы начать чат.",
            hintEmployee: "Напишите сообщение {{employee}} (сотруднику {{company}})",
            placeholderDefault: "Задавайте свои вопросы",
            placeholderMessage: "Ваше сообщение для {{employee}}",
        },
    },

    en: {
        translation: {
            appName: "Chatbot Baiterek",
            subtitle: "internal corporate bot" ,
            welcomeMessage: "Hi there! I'm Baiterek Holding's AI-powered 🤖 virtual assistant, here to help you navigate our support programs with ease.",
            disclaimer: "The information provided by this chatbot is for reference only" ,

            /* старые ключи */
            category: "Category",
            direction: "Direction",
            hintChoose: "Pick a category & direction first ↑",
            hintWrite: "Type your question 👇",
            btnSend: "Send",
            directions: {
                credit: ["Industrial", "Builder", "Farmer", "Exporter", "Other"],
                leasing: ["Agro", "Transport", "Equipment", "Other"],
                guarantee: ["SME", "IT project", "Other"],
                subsidy: ["Rates", "Investments"],
                insurance: ["Property", "Export", "Health"],
                invest: ["Startup", "Manufacturing"],
            },

            /* новые ключи для ChatBot */
            selectCompany: "Select a company",
            employees: "Company employees",
            hintNoCompany: "Please choose a company above...",
            hintNoEmployee: "Now pick an employee to start chatting.",
            hintEmployee: "Type a message for {{employee}} ({{company}})",
            placeholderDefault: "You can ask your questions",
            placeholderMessage: "Your message to {{employee}}",
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "ru",
        fallbackLng: "ru",
        interpolation: { escapeValue: false },
    });

export default i18n;
