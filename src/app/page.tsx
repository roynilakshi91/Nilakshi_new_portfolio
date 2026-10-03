import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getJSONData } from "@/lib/serverUtils";
import Link from "next/link";
import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  GlobeIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default async function Home() {
  const data = await getJSONData();

  return (
    <main>
      {/* Home / Hero */}
      <section
        id="home"
        className="container max-w-5xl mx-auto py-16 md:py-24 lg:py-28"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="w-1/2 mx-auto lg:w-1/3">
            <Image
              src={`${basePath}/assets/profile_1.jpg`}
              width={280}
              height={280}
              alt="Nilakshi Roy"
              className="mx-auto aspect-square overflow-hidden object-cover object-center rounded-full"
            />
          </div>

          <div className="w-full lg:w-2/3 space-y-5">
            <div className="space-y-2">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Hello 👋, I&apos;m
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                {data.personalInfo.name}
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold">
                {data.personalInfo.title}
              </h2>
            </div>

            <p className="max-w-[650px] lg:text-lg text-gray-500 dark:text-gray-400">
              {data.personalInfo.bio}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={data.contactInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <FileTextIcon className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              </Link>

              <Link href={data.contactInfo.github} target="_blank">
                <Button variant="secondary" size="icon" aria-label="GitHub">
                  <GitHubLogoIcon className="h-4 w-4" />
                </Button>
              </Link>

              <Link href={data.contactInfo.linkedin} target="_blank">
                <Button variant="secondary" size="icon" aria-label="LinkedIn">
                  <LinkedInLogoIcon className="h-4 w-4" />
                </Button>
              </Link>

              <Link href={`mailto:${data.contactInfo.email}`}>
                <Button variant="secondary" size="icon" aria-label="Email">
                  <EnvelopeClosedIcon className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Data Science Projects */}
      <section
        id="projects"
        className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
      >
        <h2 className="font-bold text-3xl md:text-5xl mb-12">
          My Projects
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {data.projects.map((project) => (
            <Card
              key={project.title}
              className="flex flex-col lg:flex-row overflow-hidden"
            >
              <div className="w-full lg:w-1/2 p-3 flex items-center">
                {project.image ? (
                  <Image
                    src={
                      project.image.startsWith("/")
                        ? `${basePath}${project.image}`
                        : project.image
                    }
                    width={1340}
                    height={776}
                    alt={`${project.title} screenshot`}
                    className="w-full h-64 lg:h-72 rounded-md object-contain"
                  />
                ) : (
                  <div className="project-image-placeholder w-full h-64 lg:h-72 rounded-md">
                    <span>Project image unavailable</span>
                  </div>
                )}
              </div>

              <div className="w-full lg:w-1/2 flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl">
                    {project.title}
                  </CardTitle>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-gray-500 dark:text-gray-400">
                    {project.description}
                  </p>

                  <p className="mt-5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    <strong>Pipeline:</strong> {project.pipeline}
                  </p>
                </CardContent>

                <CardFooter>
                  <div className="flex flex-wrap gap-3">
                    <Link href={project.live_url} target="_blank">
                      <Button size="sm">
                        <GlobeIcon className="h-3 w-3 mr-2" />
                        Live Demo
                      </Button>
                    </Link>

                    <Link href={project.code_repo_url} target="_blank">
                      <Button size="sm" variant="outline">
                        <GitHubLogoIcon className="h-3 w-3 mr-2" />
                        GitHub
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* EDA */}
      <section
        id="eda"
        className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
      >
        <h2 className="font-bold text-3xl md:text-5xl mb-10">
          EDA — Exploratory Data Analysis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
          {data.edaProjects.map((project) => (
            <Link
              key={project.title}
              href={project.url}
              target="_blank"
              className="text-lg font-medium hover:text-primary transition-colors"
            >
              {project.title} →
            </Link>
          ))}
        </div>
      </section>

      {/* Data Visualization */}
      <section
        id="visualization"
        className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
      >
        <h2 className="font-bold text-3xl md:text-5xl mb-10">
          Data Visualization
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
          {data.visualizationProjects.map((project) => (
            <Link
              key={project.title}
              href={project.url}
              target="_blank"
              className="text-lg font-medium hover:text-primary transition-colors"
            >
              {project.title} →
            </Link>
          ))}
        </div>
      </section>

      {/* Work Experience */}
      <section
        id="experience"
        className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
      >
        <h2 className="font-bold text-3xl md:text-5xl mb-12">
          Work Experience
        </h2>

        <div className="relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20 grid gap-10">
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="grid gap-1 relative">
              <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-2 dark:bg-gray-50" />

              <h4 className="text-xl font-medium">
                {exp.role} @{" "}
                <Link
                  href={exp.companyWebsite}
                  target="_blank"
                  className="text-primary"
                >
                  {exp.company}
                </Link>
              </h4>

              <div className="text-gray-500 dark:text-gray-400">
                {exp.startDate} - {exp.endDate}
              </div>

              <div className="mt-2">
                <ul className="text-gray-500 text-sm list-disc pl-4 space-y-1">
                  {exp.keyResponsibilities.map((resp) => (
                    <li key={resp}>{resp}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section
        id="education"
        className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
      >
        <h2 className="font-bold text-3xl md:text-5xl mb-12">
          Education
        </h2>

        <div className="relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20 grid gap-10">
          {data.education.map((ed) => (
            <div key={ed.id} className="grid gap-1 relative">
              <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-2 dark:bg-gray-50" />

              <h4 className="text-xl font-medium">{ed.degree}</h4>
              <h5 className="font-medium">{ed.institution}</h5>

              <div className="text-gray-500 dark:text-gray-400">
                {ed.startDate} - {ed.endDate}
              </div>

              <p className="mt-2 text-sm text-gray-500">
                {ed.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
