import { Box } from "@/components/atoms/layout";
import Dashboard from "@/components/organisms/dashboard";

// const NOTES_ICON = "/icons/notes.png";
// const LAB_REPORTS_ICON = "/icons/lab-report.png";
// const SYLLABUS_ICON = "/icons/syllabus.png";
// const Q_BANK_ICON = "/icons/q-bank.png";
// const RESULTS_ICON = "/icons/result.png";
// const JOKES_ICON = "/icons/joke.png";
// const SUBMIT_ICON = "/icons/submit.png";
// const PHONE_BOOK_ICON = "/icons/phonebook.png";
// const COUNT_CONVERTER_ICON = "/icons/converter.png";

// const FRONT_PAGE_ITEMS = [
//   {
//     id: 1,
//     title: "Notes",
//     icon: <img src={NOTES_ICON} alt="Notes" />,
//     href: APP_PATHS.NOTES,
//   },
//   {
//     id: 2,
//     title: "Lab Reports",
//     icon: <img src={LAB_REPORTS_ICON} alt="Lab Reports" />,
//     href: APP_PATHS.LAB_REPORTS,
//   },
//   {
//     id: 3,
//     title: "Q-Bank",
//     icon: <img src={Q_BANK_ICON} alt="Q-Bank" />,
//     href: APP_PATHS.QBANKS,
//   },
//   {
//     id: 4,
//     title: "Syllabus",
//     icon: <img src={SYLLABUS_ICON} alt="Syllabus" />,
//     href: APP_PATHS.SYLLABUS,
//   },
//   {
//     id: 5,
//     title: "Results",
//     icon: <img src={RESULTS_ICON} alt="Results" />,
//     href: APP_PATHS.RESULTS,
//   },
//   {
//     id: 7,
//     title: "Submit Notes",
//     icon: <img src={SUBMIT_ICON} alt="Submit" />,
//     href: APP_CONFIG.submitLink,
//     isExternal: true,
//   },
//   {
//     id: 2323,
//     title: "Phone Book",
//     icon: <img src={PHONE_BOOK_ICON} alt="Phone Book" />,
//     href: "https://triptoafsin.github.io/butex-phonebook-v2/",
//     isExternal: true,
//   },
//   {
//     id: 1221212,
//     title: "Count Koto",
//     icon: <img src={COUNT_CONVERTER_ICON} alt="Count Converter" />,
//     href: "https://triptoafsin.github.io/CountKoto-/",
//     isExternal: true,
//   },
//   {
//     id: 6,
//     title: "Jokes",
//     icon: <img src={JOKES_ICON} alt="Jokes" />,
//     href: APP_PATHS.JOKES,
//   },
// ];

function FrontPage() {
  return (
    <Box className="flex flex-col items-center min-h-screen p-4">
      <Dashboard />
    </Box>
  );
}

export default FrontPage;
