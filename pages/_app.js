import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";
import { ProblemSolverProvider } from "../Context/ProblemSolverContext";
const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider>
    <ProblemSolverProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </ProblemSolverProvider>
  </ThemeProvider>
);

export default MyApp;
