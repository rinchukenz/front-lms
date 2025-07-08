import React, { useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import courseImg from "../../assets/python.jpeg";
import aws from "../../assets/AWS.jpg";
import sb from "../../assets/SB.jpg";
import py from "../../assets/PY.jpg";
import ml from "../../assets/ML.jpg";
import da from "../../assets/DA.jpg";
import pb from "../../assets/PB.jpeg";
import java from "../../assets/JAVA.jpeg";



export const courses = [
  {
    id: 1,
    image: ml,
    title: "Machine Learning",
    subtitle: "Recorded Course",
    description: "Learn the fundamentals of machine learning including supervised and unsupervised models.",
    sections: [
      {
        title: "Introduction",
        description: "An overview of machine learning and its key concepts.",
        contents: ["What is ML?", "Applications of ML", "ML vs AI vs DL"]
      },
      {
        title: "Supervised Learning",
        description: "Covers basic supervised learning algorithms and evaluation techniques.",
        contents: ["Linear Regression", "Logistic Regression", "Decision Trees"]
      }
    ]
  },
  {
    id: 2,
    image: aws,
    title: "Amazon Web Services (AWS)",
    subtitle: "Recorded Course",
    description: "Master AWS services like EC2, S3, Lambda, and deploy secure applications.",
    sections: [
      {
        title: "AWS Basics",
        description: "Learn the foundation of cloud computing and how AWS operates.",
        contents: ["Intro to Cloud", "Creating AWS Account", "IAM Roles"]
      },
      {
        title: "Core Services",
        description: "Dive into essential AWS services used in real-world applications.",
        contents: ["EC2 Setup", "S3 Storage", "Lambda Functions"]
      }
    ]
  },
  {
    id: 3,
    image: py,
    title: "Python Test Practices",
    subtitle: "Recorded Course",
    description: "Best practices in Python unit testing using unittest and pytest frameworks.",
    sections: [
      {
        title: "Testing Basics",
        description: "Introduction to why testing is essential and how to begin.",
        contents: ["Why Testing?", "Writing First Test", "unittest Overview"]
      },
      {
        title: "pytest Framework",
        description: "Understand pytest features for effective testing.",
        contents: ["Installing pytest", "Fixtures", "Mocking"]
      }
    ]
  },
  {
    id: 4,
    image: da,
    title: "Data Analytics",
    subtitle: "Recorded Course",
    description: "Explore tools and techniques used in data cleaning, analysis, and visualization.",
    sections: [
      {
        title: "Foundations",
        description: "Learn about data types, sources, and preprocessing steps.",
        contents: ["Data Types", "Data Collection", "Data Cleaning"]
      },
      {
        title: "Visualization",
        description: "Create visual insights from data using different chart types.",
        contents: ["Bar Charts", "Pie Charts", "Dashboards in Excel"]
      }
    ]
  },
  {
    id: 5,
    image: py,
    title: "Python Test Practices - II",
    subtitle: "Recorded Course",
    description: "Advanced testing patterns, integration testing, and CI/CD setup for Python projects.",
    sections: [
      {
        title: "Advanced Testing",
        description: "Deep dive into test coverage, integration tests, and automation pipelines.",
        contents: ["Integration Testing", "Test Coverage", "CI with GitHub Actions"]
      }
    ]
  },
  {
    id: 6,
    image: java,
    title: "Java Full Stack Development",
    subtitle: "Recorded Course",
    description: "Comprehensive course covering Java, Spring Boot, React, and RESTful APIs.",
    sections: [
      {
        title: "Backend Development",
        description: "Build REST APIs using Java and Spring Boot framework.",
        contents: ["Java Basics", "Spring Boot Intro", "REST API Development"]
      },
      {
        title: "Frontend Development",
        description: "Create responsive frontends using React and integrate with APIs.",
        contents: ["React Basics", "Component Lifecycle", "API Integration"]
      }
    ]
  },
  {
    id: 7,
    image: py,
    title: "Python Test Practices - III",
    subtitle: "Recorded Course",
    description: "Real-world test automation scenarios and scaling test cases efficiently.",
    sections: [
      {
        title: "Scaling Tests",
        description: "Learn how to scale test automation for large projects.",
        contents: ["Parallel Testing", "Test Discovery", "Test Suites"]
      }
    ]
  },
  {
    id: 8,
    image: sb,
    title: "Spring Boot",
    subtitle: "Recorded Course",
    description: "Create powerful backend applications with Spring Boot and JPA.",
    sections: [
      {
        title: "Spring Boot Basics",
        description: "Start building Spring Boot applications with annotations and dependencies.",
        contents: ["Setting up Project", "Annotations", "CRUD Operations"]
      },
      {
        title: "Data Handling",
        description: "Manage relational data using JPA and H2 database.",
        contents: ["Spring Data JPA", "H2 Database", "Pagination"]
      }
    ]
  },
  {
    id: 9,
    image: pb,
    title: "Power BI",
    subtitle: "Recorded Course",
    description: "Build insightful reports and dashboards using Power BI Desktop.",
    sections: [
      {
        title: "Getting Started",
        description: "Basics of Power BI and how to start building your first report.",
        contents: ["Intro to Power BI", "Connecting to Data", "Building Reports"]
      },
      {
        title: "Advanced Visuals",
        description: "Enhance your dashboards with DAX and advanced charting.",
        contents: ["Custom Visuals", "DAX Basics", "Publishing Reports"]
      }
    ]
  }
];



function Courses() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRequests = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-gray-600 mb-6 mt-4">
        Quick look at everything going around within your courses
      </h2>

      <div className="my-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-96 px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
      </div>

      {filteredRequests.length === 0 ? (
        <div className="text-center text-gray-500 py-16">No courses found.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              image={course.image}
              title={course.title}
              subtitle={course.subtitle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
