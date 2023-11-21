

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { UserProvider } from './store/UserContext';
import constant from "./utils/GlobalValues";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserMiddleware from './utils/UserMiddleware';
import PrivateRouting from "./navigation/PrivateRouting";
import {LoginPageWithRouter} from "./pages/LoginPageWithRouter";
import {DashboardPage} from "./pages/DashboardPage";
import { ContestsPage } from "./pages/ContestsPage";
import {SystemErrorPage} from "./components/SystemErrorPage";
import {SystemLoadingPage} from "./components/SystemLoadingPage";
import { Component } from 'react';
import { AuthLayout } from "./components/layouts/AuthLayout";
import RegistrationPage from "./pages/RegistrationPage";
import ForgetPage from "./pages/ForgetPage";
import { ContestStatementPage } from "./pages/ContestStatementPage";
import OnlineAuditoriumPage from "./pages/OnlineAuditoriumPage";
import ExpertPage from "./pages/ExpertPage";
import ExpertUserStatementGradePage from "./pages/ExpertUserStatementGradePage";


export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLaunched : false,
      isError : false,
      user : {
        isAuthed : false
      },
    }
    this.checkAuthStatus = this.checkAuthStatus.bind(this);
  }

  async componentDidMount(){
    await this.checkAuthStatus();
  }

  async checkAuthStatus(){
    console.log("checkAuthStatus");
    this.setState({isLaunched: false, isError : false});
    
    const userMiddleware = new UserMiddleware();
    const jwt = userMiddleware.getJWTFromCookie();
    console.log(jwt);
    if(jwt === null){
      this.setState({isLaunched: true, isError : false});
      return;
    }
    
    this.setState({isLaunched: false, isError : false});
    fetch(constant.baseDomain + "/api/user", 
      {
        method : "GET",
        headers : {
          "Authorization" : "Bearer " + jwt,
        }
      }
    )
    .then((response) => {
        if(response.status === 403){
          this.setState({isLaunched: true, isError : false});
          return;
        }
        return response.json();
    })
    .then((jsonAnswerStatus) => {
          console.log("jsonAnswerStatus:" + jsonAnswerStatus);
          if(jsonAnswerStatus.status === "success"){
            this.setState({
              isLaunched: true, 
              isError : false, 
              user : {isAuthed: true},
            });
            
          } else {
            console.log("Провал");
            this.setState({isLaunched: true, isError : false});
          }
        },
        (error) => {
          console.log(error);
          this.setState({isLaunched: true, isError : true});
        }
    );
    
  }
  
  render(){

    if(!this.state.isLaunched){
      return (
        <SystemLoadingPage />
      )
    }
    if(this.state.isError){
      return (
        <SystemErrorPage tryAgain={() => this.checkAuthStatus()} />
      )
    }

    return (
      <UserProvider valueUser={this.state.user}>
        <BrowserRouter>
          <Routes>
              <Route path = "/" element={<PrivateRouting/>}>
                <Route path ="/" exact element={<DashboardPage/>}></Route>
                <Route path ="/contests" exact element={<ContestsPage/>}></Route>
                <Route path ="/contest/1/user-statement" exact element={<ContestStatementPage/>}></Route>
                <Route path ="/online_auditorium" exact element={<OnlineAuditoriumPage/>}></Route>
                <Route path ="/expert" exact element={<ExpertPage/>}></Route>

                <Route path ="/expert/user_statement_grade/:user_expert_statement_grade_id" exact element={<ExpertUserStatementGradePage/>}></Route>
                
              </Route>

              <Route path="/login" element={<AuthLayout />}>
                <Route path="/login" exact element={<LoginPageWithRouter/>} />
              </Route>

              <Route path="/registration" element={<AuthLayout />}>
                <Route path="/registration" exact element={<RegistrationPage/>} />
              </Route>

              <Route path="/forget" element={<AuthLayout />}>
                <Route path="/forget" exact element={<ForgetPage/>} />
              </Route>

          </Routes>
        </BrowserRouter>
      </UserProvider>
    );
  }
}
