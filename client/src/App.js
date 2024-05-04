import "./App.css";
import Header from "./components/common/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import CategoryHome from "./components/allcourses/CategoryHome";
import CourseDetail from "./components/allcourses/CourseDetail";
import VideoPlayer from "./components/video/VideoPlayer";

function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/about" element={<About />} />
					<Route exact path="/courses" element={<CourseHome />} />
					<Route exact path="/category" element={<CategoryHome />} />
					<Route
						exact
						path="/courses/course-detail/video/:courseId"
						element={<VideoPlayer />}
					/>
					<Route
						exact
						path="/courses/course-detail/:courseId"
						element={<CourseDetail />}
					/>
					<Route
						exact
						path="/courses/category/:categoryId"
						element={<CategoryCourses />}
					/>
					<Route
						exact
						path="/category/manage"
						element={<CategoryManagement />}
					/>
					<Route exact path="/course/manage" element={<CourseManagement />} />

					<Route exact path="/team" element={<Team />} />
					<Route exact path="/pricing" element={<Pricing />} />
					<Route exact path="/journal" element={<Blog />} />
					<Route exact path="/contact" element={<Contact />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/signup" element={<Signup />} />
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
