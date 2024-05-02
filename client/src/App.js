import "./App.css";
import Header from "./components/common/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/about/About";
import CourseHome from "./components/allcourses/CourseHome";
import Team from "./components/team/Team";
import Pricing from "./components/pricing/Pricing";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import CategoryCourses from "./components/allcourses/CategoryCourse";
import CategoryManagement from "./components/allcourses/CategoryManagement";
import Login from "./components/login_signup/Login";
import Signup from "./components/login_signup/Signup";
import CourseManagement from "./components/allcourses/CourseManagement";

function App() {
	return (
		<>
			<Router>
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/about" component={About} />
					<Route exact path="/courses" component={CourseHome} />
					<Route
						exact
						path="/courses/category/:categoryId"
						component={CategoryCourses}
					/>
					<Route exact path="/category/manage" component={CategoryManagement} />
					<Route exact path="/course/manage" component={CourseManagement} />

					<Route exact path="/team" component={Team} />
					<Route exact path="/pricing" component={Pricing} />
					<Route exact path="/journal" component={Blog} />
					<Route exact path="/contact" component={Contact} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={Signup} />
				</Switch>
				<Footer />
			</Router>
		</>
	);
}

export default App;
