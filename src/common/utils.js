import { message } from "antd";
import {
  ClockCircleOutlined,
  SyncOutlined,
  FormOutlined,
  EditOutlined,
  CheckCircleOutlined,
  UndoOutlined,
  FileSearchOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import moment from "moment";


const resultCode = {
  Error: 0,
  Success: 1,
  Warning: 2,
  Auth: 4,
};

const periodTypes = [
  { value: "Y", label: "Жил" },
  { value: "H", label: "Хагас жил" },
  { value: "M", label: "Сар" },
  { value: "Q", label: "Улирал" },
];

const newsCategoryArray = [
  { value: "1", label: "Мэдээ  мэдээлэл(Нүүр хуудас)" },
  { value: "2", label: "Зарлал" },
  { value: "3", label: "Хууль, Эрх зүйн актууд" },
  { value: "4", label: "Маягт" },
];

const successMsg = {
  save: "Амжилттай хадгаллаа",
  refresh: "Амжилттай шинэчиллээ",
  confirm: "Амжилттай баталгаажлаа",
  delete: "Амжилттай устгагдлаа",
  sendRequest: "Хүсэлт амжилттай илгээгдлээ",
};


const getErrorMsg = (err) => {
  let errMsg = null;
  if (!errMsg && err.request) {
    if (err.request.status === 500) {
      var obj = JSON.parse(err.request.responseText);
      errMsg = obj.message;
      if (obj.message?.includes("Read timed out executing GET")) {
        if (obj.message?.includes("/getCitizenIDCardInfo?regNo=")) {
          errMsg = "ХУР - сервистэй холбогдож чадсангүй";
        }
      }
    } else if (err.request.status === 502)
      errMsg = `Системийн шинэчлэл хийгдэж байна. Түр хүлээнэ үү.`;
    else if (err.request.status === 504)
      errMsg = `Сервeрт холбогдож чадсангүй.`;
  }

  if (!errMsg && err && err.response && err.response.data) {
    errMsg = err.response.data.message
      ? err.response.data.message
      : err.response.data.error;
  }

  if (!errMsg && err && (err.message || err.msg)) {
    errMsg = err.message ? err.message : err.msg;
  }

  if (!errMsg && err) {
    errMsg = err;
  }
  if (!axios.isCancel(err) && errMsg) {
    message.error(errMsg);
  }
};
const getResultFromResponse = (res) => {
  if (!res) {
    message.error("Серверт холбогдож чадсангүй.");
    return undefined;
  }

  if (res.code === resultCode.Warning) {
    message.warning(res.warnings.map((warn) => warn.msg).join("\n - "));
    return undefined;
  }
  if (res.code === resultCode.Error) {
    message.error("1::" + res.msg);
    return undefined;
  }
  if (res.code === resultCode.Auth) {
    message.error("2::" + res.msg);
    return undefined;
  }
  return res.result;
};

const showErrorMsg = (err, _) => {
  getErrorMsg(err);
  // if (!axios.isCancel(err)) {
  //   if (dur) message.error(getErrorMsg(err), dur);
  //   else
  //   message.error(getErrorMsg(err));
  // }
};
const activeStatus = {
  Inactive: 0,
  Active: 1,
  ComingSoon: 2,
};

const newsType = {
  NEWS: { code: "NEWS", name: "Мэдээ мэдээлэл", color: "purple", id: 1 },
  LANDING: {
    code: "LANDING",
    name: "Нүүр хуудасны мэдээлэл",
    color: "magenta",
    id: 2,
  },
  FOOTER: { code: "FOOTER", name: "FOOTER мэдээлэл", color: "geekblue", id: 3 },
};

const newsCategoryTypes = {
  NEWS: 1,
  SYSTEM: 2,
};

const newsTypeArray = [
  { id: 1, name: "NEWS", color: "purple" },
  { id: 2, name: "LANDING", color: "magenta" },
  { id: 3, name: "FOOTER", color: "geekblue" },
];

const newsMappingType = {
  LANDING: { code: "LANDING", name: "Нүүр хуудас", color: "magenta" },
  ROLE_TYPE: { code: "ROLE_TYPE", name: "Эрхийн төрөл", color: "purple" },
  ROLE: { code: "ROLE", name: "Хэрэглэгчийн эрх", color: "geekblue" },
  ORG_BRANCH: { code: "ORG_BRANCH", name: "Харьяа газар", color: "blue" },
};

const notificationType = {
  DEFAULT: { id: 1, name: "Энгийн" },
  NEWS: { id: 2, name: "Мэдээ" },
  ROUTE: { id: 3, name: "URL" },
};

const notificationTypeColor = [
  { name: "Энгийн", id: 1, color: "purple" },
  { name: "Мэдээ", id: 2, color: "blue" },
  { name: "URL", id: 3, color: "geekblue" },
];

const perRoleType = [
  { name: "ААН", id: 1, color: "green" },
  { name: "Яам", id: 2, color: "cyan" },
];

const expressionType = {
  Uncheck: "Uncheck",
  Check: "Check",
  SetValue: "SetValue",
};

const getExpressionType = (type) => {
  if (type === expressionType.Uncheck) return "Идэвхгүй";
  if (type === expressionType.Check) return "Шалгуур";
  if (type === expressionType.SetValue) return "Утга оноох";
  return "";
};
const activityType = [
  { name: "Үйл ажиллагаа явуулж байгаа", value: "ACTIVE", id: 1 },
  { name: "Хуулийн этгээд дампуурсан", value: "BURSTED", id: 2 },
  { name: "Сураггүй алга болсон", value: "DISAPPEARED", id: 3 },
  { name: "Ажиллах хугацаа дууссан", value: "EXPIRED", id: 4 },
  { name: "Үйл ажиллагаа явуулаагүй", value: "INACTIVE", id: 5 },
  { name: "Татан буугдсан", value: "DISSOLVED", id: 6 },
  { name: "Татан буугдахаар хүлээгдэж байгаа", value: "PENDING", id: 7 },
];

const roleNames = [
  { name: "ААН", id: 1, color: "#13c2c2" },
  { name: "Мэргэжилтэн", id: 2, color: "#1890ff" },
  { name: "Админ", id: 3, color: "#2f54eb" },
];

const roleTypeStatus = {
  Organization: 1,
  Branch: 2,
  Admin: 3,
};

const roleTypes = [
  { id: roleTypeStatus.Organization, name: "ААН" },
  { id: roleTypeStatus.Branch, name: "Яам" },
  { id: roleTypeStatus.Admin, name: "Админ" },
];

const perRoleTypeColor = (type) => {
  if (type === roleTypeStatus.Organization) return "green";
  if (type === roleTypeStatus.Branch) return "cyan";
  if (type === roleTypeStatus.Admin) return "orange";
  return "";
};

const countryList = [
  { name: "Afghanistan", code: "AF" },
  { name: "land Islands", code: "AX" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "AndorrA", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Anguilla", code: "AI" },
  { name: "Antarctica", code: "AQ" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Aruba", code: "AW" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bermuda", code: "BM" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Bouvet Island", code: "BV" },
  { name: "Brazil", code: "BR" },
  { name: "British Indian Ocean Territory", code: "IO" },
  { name: "Brunei Darussalam", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Cape Verde", code: "CV" },
  { name: "Cayman Islands", code: "KY" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Christmas Island", code: "CX" },
  { name: "Cocos (Keeling) Islands", code: "CC" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "Congo, The Democratic Republic of the", code: "CD" },
  { name: "Cook Islands", code: "CK" },
  { name: "Costa Rica", code: "CR" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Ethiopia", code: "ET" },
  { name: "Falkland Islands (Malvinas)", code: "FK" },
  { name: "Faroe Islands", code: "FO" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "French Guiana", code: "GF" },
  { name: "French Polynesia", code: "PF" },
  { name: "French Southern Territories", code: "TF" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Gibraltar", code: "GI" },
  { name: "Greece", code: "GR" },
  { name: "Greenland", code: "GL" },
  { name: "Grenada", code: "GD" },
  { name: "Guadeloupe", code: "GP" },
  { name: "Guam", code: "GU" },
  { name: "Guatemala", code: "GT" },
  { name: "Guernsey", code: "GG" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Heard Island and Mcdonald Islands", code: "HM" },
  { name: "Holy See (Vatican City State)", code: "VA" },
  { name: "Honduras", code: "HN" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran, Islamic Republic Of", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Isle of Man", code: "IM" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jersey", code: "JE" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Korea, Republic of", code: "KR" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libyan Arab Jamahiriya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Macao", code: "MO" },
  { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Martinique", code: "MQ" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mayotte", code: "YT" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia, Federated States of", code: "FM" },
  { name: "Moldova, Republic of", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montenegro", code: "ME" },
  { name: "Montserrat", code: "MS" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "Netherlands Antilles", code: "AN" },
  { name: "New Caledonia", code: "NC" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "Niue", code: "NU" },
  { name: "Norfolk Island", code: "NF" },
  { name: "Northern Mariana Islands", code: "MP" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestinian Territory, Occupied", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Pitcairn", code: "PN" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Qatar", code: "QA" },
  { name: "Reunion", code: "RE" },
  { name: "Romania", code: "RO" },
  { name: "Russian Federation", code: "RU" },
  { name: "RWANDA", code: "RW" },
  { name: "Saint Helena", code: "SH" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Pierre and Miquelon", code: "PM" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia", code: "RS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Georgia and the South Sandwich Islands", code: "GS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Suriname", code: "SR" },
  { name: "Svalbard and Jan Mayen", code: "SJ" },
  { name: "Swaziland", code: "SZ" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syrian Arab Republic", code: "SY" },
  { name: "Taiwan, Province of China", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania, United Republic of", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tokelau", code: "TK" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Turks and Caicos Islands", code: "TC" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "United States Minor Outlying Islands", code: "UM" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Venezuela", code: "VE" },
  { name: "Viet Nam", code: "VN" },
  { name: "Virgin Islands, British", code: "VG" },
  { name: "Virgin Islands, U.S.", code: "VI" },
  { name: "Wallis and Futuna", code: "WF" },
  { name: "Western Sahara", code: "EH" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" },
];

const reportDataType = {
  AMOUNT: { code: "AMOUNT", name: "Тоон дүн" },
  TEXT: { code: "TEXT", name: "Текст" },
  TEXT_AREA: { code: "TEXT_AREA", name: "Их текст" },
  LICENSE: { code: "LICENSE", name: "Тусгай зөвшөөрөл" },
  SOFTWARE: { code: "SOFTWARE", name: "Программ хангамжийн байгууллага" },
};

const reportDrawType = {
  INPUT: {
    code: "INPUT",
    name: "Утга оруулах",
    dataTypes: [
      reportDataType.AMOUNT,
      reportDataType.TEXT,
      reportDataType.TEXT_AREA,
      reportDataType.LICENSE,
      reportDataType.SOFTWARE,
    ],
  },
  STATIC_TEXT: {
    code: "STATIC_TEXT",
    name: "Тогтмол текст",
    dataTypes: [reportDataType.TEXT],
  },
};

const reportFormType = {
  FORM: { code: "FORM", name: "Үндсэн" },
  WITH_CHILD: { code: "WITH_CHILD", name: "Тодруулга /Дэд бүлэгтэй/" },
  FORM_WITH_ROWSUM: {
    code: "FORM_WITH_ROWSUM",
    name: "Мөрийн нийлбэр тооцох тайлан",
  },
  FORM_WITH_COLSUM: {
    code: "FORM_WITH_COLSUM",
    name: "Баганын нийлбэр тооцох тайлан",
  },
  INPUT: { code: "INPUT", name: "Утга оруулах" },
  FORM_VERTICAL_AUTO: {
    code: "FORM_VERTICAL_AUTO",
    name: "Тайлан дэд төрлөөр мөрлүү - автоматаар зурагдах",
  },
  FORM_HORIZONTAL_AUTO: {
    code: "FORM_HORIZONTAL_AUTO",
    name: "Дүнгийн төрлөөр мөрлүү - автоматаар зурагдах",
  },
};

const reportFormLineType = {
  TEXT: {
    id: 1,
    name: "Текст",
  },
  PROPERTY: {
    id: 2,
    name: "Үзүүлэлт",
  },
  NUMBER: {
    id: 3,
    name: "Тоо",
  },
};

const reportDataUserOrgStatus = {
  DEFAULT: {
    id: 1,
    name: "Анхны төлөв",
    color: "lime",
    description: "Тайлангийн тохиргоо хийнэ үү",
    sendButtonName: "Тайлан илгээх",
    jumpUrl: "",
  },
  AAN_ERROR: {
    id: 2,
    name: "ААН-ийн тохиргоо дутуу",
    color: "orange",
    description: "ААН-ийн тохиргоо дутуу байна",
    icon: "",
    sendButtonName: "Тохиргоо дутуу байна",
    jumpUrl: "/orgInfo",
  },
  PACKAGE_ERROR: {
    id: 3,
    name: "Багцын төрөл олдоогүй",
    color: "volcano",
    description: "Тухайн ААН-д тохирох багцын төрөл олдоогүй",
    icon: "",
    sendButtonName: "Багцын төрөл олдоогүй",
    jumpUrl: "",
  },
  PERIOD_PACKAGE_MAP_TYPE_INACTIVE: {
    id: 4,
    name: "Тайлант үед хамрагдаагүй",
    color: "volcano",
    description:
      "Тухайн ААН-д тохирох багцын төрөл идэвхигүй байгаа тул тайлант үед хамрагдаагүй",
    icon: "",
    sendButtonName: "Багцын төрөл идэвхигүй",
    jumpUrl: "",
  },
  CONFIG_CONFIRMED: {
    id: 5,
    name: "Тохиргоо баталгаажсан",
    color: "cyan",
    description: "Тохиргоо баталгаажсан тайлан шивхэд бэлэн",
    icon: <EditOutlined style={{ color: "inherit" }} />,
    sendButtonName: "Тохиргоо баталгаажсан",
    jumpUrl: "",
  },
  REPORT_PROCESSING: {
    id: 6,
    name: "Тайлан хүлээгдэж буй",
    color: "warning",
    description: "Тайлан хүлээгдэж буй",
    icon: "",
    sendButtonName: "Тайлан хүлээгдэж буй",
    jumpUrl: "",
  },
  REPORT_CONFIRMED: {
    id: 7,
    name: "Тайлан баталгаажсан",
    color: "success",
    description: "Баталгаажсан тайлан",
    icon: "",
    sendButtonName: "Баталгаажсан",
    jumpUrl: "",
  },
};

const statusCodeMessage = {
  100: {
    code: "NOT_DIRECTOR_MAP",
    color: "volcano",
    message: "Захиралын бүртгэл байхгүй байна",
  },
  200: {
    code: "NOT_ACCOUNTANT_MAP",
    color: "volcano",
    message: "Ерөнхий нягтлан бодогчын бүртгэл байхгүй байна",
  },
  300: {
    code: "NOT_CONFIG",
    color: "geekblue",
    message: "Байгуулага идэвхгүй байна",
  },
  400: {
    code: "UNCONFIRMED_CONFIG",
    color: "geekblue",
    message: "Байгууллагын хүсэлт баталгаажаагүй байна",
  },
  500: {
    code: "NO_REPORT_PACKAGE_TYPE",
    color: "magenta",
    message: "Багцын тохиргоо дутуу",
  },
};

const renderDate = (date) => {
  if (date) {
    return moment(date).format("yyyy-MM-DD HH:mm:ss");
  }
  return null;
};

const cellType = {
  CELL_DATA: "CELL_DATA",
  CHILD_ROW_DATA: "CHILD_ROW_DATA",
};

const activityStatus = [
  { id: 0, name: "Баталгаажаагүй", code: "inActive" },
  { id: 1, name: "Баталгаажсан", code: "active" },
  { id: 2, name: "Хүсэлт илгээсэн", code: "sent" },
  { id: 3, name: "Буцаагдсан", code: "returned" },
];

const reportPeriodMapStatus = {
  CREATED: {
    id: 0,
    name: "Үүсгэсэн",
    color: "",
  },
  ACTIVE: {
    id: 1,
    name: "Идэвхтэй",
    color: "",
  },
  REPORT_WRITING: {
    id: 2,
    name: "Тайлант үе нээлттэй",
    color: "processing",
  },
  REPORT_END: {
    id: 3,
    name: "Тайлан шивэх хугацаа дууссан",
    color: "geekblue",
  },
  FINISH: {
    id: 4,
    name: "Тайлант үе хаагдсан",
    color: "success",
  },
};

const reportDataHdrStatusOb = {
  CREATED: {
    id: 0,
    name: "Тайлан шивж эхлэх",
    name2: "Тайлан шивж эхлэх",
    icon: <EditOutlined />,
    color: "default",
    color2: "#facd32",
  },
  WRITING: {
    id: 1,
    name: "Тайлан шивж эхэлсэн",
    name2: "Тайлан шивж эхэлсэн",
    icon: <FormOutlined />,
    color: "cyan",
    color2: "#ff7c5a",
  },
  SENT: {
    id: 2,
    name: "Илгээсэн",
    name2: "Хүлээгдэж буй",
    icon: <ClockCircleOutlined />,
    color: "processing",
    color2: "#69c0ff",
  },
  PROCESSING: {
    id: 3,
    name: "Хянагдаж буй",
    name2: "Хянагдаж буй",
    icon: <FileSearchOutlined />,
    color: "processing",
    color2: "#1890ff",
  },
  RETURNED: {
    id: 4,
    name: "Буцаагдсан",
    name2: "Буцаагдсан",
    icon: <UndoOutlined />,
    color: "warning",
    color2: "orange",
  },
  CANCELED: {
    id: 5,
    name: "Цуцлагдсан",
    name2: "Цуцлагдсан",
    icon: <CloseCircleOutlined />,
    color: "red",
    color2: "#f5222d",
  },
  CONFIRMED: {
    id: 6,
    name: "Баталгаажсан",
    name2: "Баталгаажсан",
    icon: <CheckCircleOutlined />,
    color: "success",
    color2: "#078f10",
  },
};
const reportDataHdrStatus = {
  0 : reportDataHdrStatusOb.CREATED,
  1 : reportDataHdrStatusOb.WRITING,
  2 : reportDataHdrStatusOb.SENT,
  3 : reportDataHdrStatusOb.PROCESSING,
  4 : reportDataHdrStatusOb.RETURNED,
  5 : reportDataHdrStatusOb.CANCELED,
  6 : reportDataHdrStatusOb.CONFIRMED,
};

const orgReportStatus = [
  { id: 0, name: "Шийдвэрлэж буй", code: "PROCESSING" },
  { id: 1, name: "Баталгаажсан", code: "CONFIRMED" },
  { id: 2, name: "Хүсэлт илгээсэн", code: "SENT" },
  { id: 3, name: "Буцаагдсан", code: "RETURNED" },
];

export {
  renderDate,
  countryList,
  roleNames,
  successMsg,
  periodTypes,
  activeStatus,
  activityType,
  newsCategoryArray,
  roleTypes,
  roleTypeStatus,
  reportDrawType,
  reportDataType,
  expressionType,
  reportFormType,
  cellType,
  showErrorMsg,
  getResultFromResponse,
  getExpressionType,
  perRoleTypeColor,
  newsMappingType,
  perRoleType,
  notificationType,
  notificationTypeColor,
  reportDataUserOrgStatus,
  reportFormLineType,
  newsType,
  newsCategoryTypes,
  statusCodeMessage,
  newsTypeArray,
  activityStatus,
  reportPeriodMapStatus,
  orgReportStatus,
  reportDataHdrStatusOb,
  reportDataHdrStatus,
};
