import './AboutUs.scss';

export default function AboutUs() {
  return (
    <main className="about-us">
      <div className="about-us--cover">
        <img src="src/assets/images/about_us_cover.jpg" />
        <div className="about-us--title">About Us</div>
      </div>
      <div className="about-us--content">
        <p>
          TaskWorkflow, a project born out of my drive to enhance my backend skills, stands as a
          testament to my journey in web development. Built with React, .NET, and Vite, TaskWorkflow
          offers a streamlined approach to task management, akin to Jira but with a focus on
          simplicity.
        </p>
        <p>
          TaskWorkflow empowers teams to effortlessly create, assign, and track tasks, fostering
          collaboration and accountability. With its intuitive interface and powerful features,
          TaskWorkflow revolutionizes project management, ensuring clarity and efficiency at every
          turn. Join me in exploring the possibilities with TaskWorkflow and unlock the true
          potential of your projects.
        </p>
      </div>
    </main>
  );
}
