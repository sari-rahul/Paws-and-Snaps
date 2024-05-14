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
import Copyright from "./components/Copyright";
import ArticleEditForm from "./pages/articles/ArticlesEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";



function App() {
  
  return (
    
        <div className={styles.App}>
          <NavBar /> 
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <About/>} />
              <Route exact path="/intro" render={() => <Introduction/>} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/articles" render={() => <ArticleHomePage/>} />
              <Route exact path="/articles/create" render={() => <ArticleCreateForm />} />
              <Route exact path="/articles/:id" render={() => <ArticlePage />} />
              <Route exact path="/articles/:id/edit" render={() => <ArticleEditForm />} />
              <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
              <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm/>} />
              <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm/>} />
              <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm/>} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
            <Footer/>
          </Container>
          <Copyright/>          
        </div>
      
  );
}

export default App;