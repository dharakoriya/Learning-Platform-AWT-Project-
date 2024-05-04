import React from "react"
import Back from "../common/back/Back"
import CoursesCard from "./CoursesCard"
import OnlineCourses from "./OnlineCourses"

const CategoryHome = () => {
    return (
        <>
            <Back title='Explore Categories' />
            {/* <CoursesCard /> */}
            <OnlineCourses />
        </>
    )
}

export default CategoryHome
