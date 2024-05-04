import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefault";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ArticleCreateForm from "./pages/articles/ArticleCreateForm";
import ArticlePage from "./pages/articles/ArticlePage";
import ArticleHomePage from "./pages/articles/ArticlesHomePage";
import About from "./pages/about/About";
import Introduction from "./pages/introduction/Introduction";


function App() {
  
  return (
    
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <About/>} />
              <Route exact path="/intro" render={() => <Introduction/>} />
              <Route exact path="/news" render={() => <ArticleHomePage/>} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/articles/create" render={() => <ArticleCreateForm />} />
              <Route exact path="/articles/:id" render={() => <ArticlePage />} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
      
  );
}

export default App;