export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
  slug: string;
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "SETlib",
    category: "Document Management System",
    description:
      "Built a full-stack document management system for UW Tacoma, enabling worksheet and problem lookup, creation, and generation. Reduced facilitator workflows from 20 minutes to 2 minutes per problem and weekly prep from 6 hours to 1 hour.",
    image: "/assets/mock.png",
    tags: ["Next.js", "TypeScript", "Java", "Spring Boot", "PostgreSQL", "AWS RDS", "AWS Cognito", "JWT", "JUnit", "REST API"],
    year: "2025",
    slug: "SETlib",
  },
  {
    id: "02",
    title: "Illuminance Esthetics",
    category: "Beauty School LMS",
    description:
      "Led development of a beauty school LMS as both full-stack developer and technical PM. Owned the course feature end-to-end — rich media storage, progress tracking, and scoring. Shipped 10 features in 10 weeks, hitting every deadline early.",
    image: "/assets/lms.png",
    tags: ["Next.js", "TypeScript", "Go", "PostgreSQL", "AWS S3", "Docker", "Vercel", "REST API"],
    year: "2025",
    slug: "illuminance-esthetics",
  },
  {
    id: "03",
    title: "Home Recommendation System",
    category: "MLOps & Recommendation Engine",
    description:
      "Designing a scalable, multi-stage home recommendation system leveraging TTE+ANN for candidate generation, GBDT for ranking, and LTR for fine-ranking on Zillow's 31M-row ZTRAX dataset. Automated MLOps pipelines with Airflow reduce deployment time by 75%, while Redis caching improves response time by 50%.",
    image: "/assets/mock1.png",
    tags: ["TensorFlow", "Python", "FastAPI", "Spring Boot", "React", "PostgreSQL", "Kafka", "Docker", "Kubernetes", "Airflow", "Apache Spark"],
    year: "2025",
    slug: "home-recommendation",
  },
  {
    id: "04",
    title: "AWS Cost Optimization",
    category: "Cloud Infrastructure",
    description:
      "Built an automated S3 cost optimizer with risk scoring, rollback snapshots, and safe storage class transitions. Deployed serverless with Lambda, EventBridge, and Terraform IaC — saving $50/month in cloud costs.",
    image: "/assets/mock1.png",
    tags: ["Python", "boto3", "AWS Lambda", "Terraform", "EventBridge", "SNS", "S3"],
    year: "2025",
    slug: "aws-cost-optimization",
  },
  {
    id: "05",
    title: "Unix Shell in C",
    category: "Systems Programming",
    description:
      "Built a fully functional Unix shell from scratch in C, implementing process management, I/O redirection, piping, signal handling, and built-in commands with robust memory management.",
    image: "/assets/shell.png",
    tags: ["C", "Unix", "POSIX", "Systems Programming"],
    year: "2025",
    slug: "unix-shell",
  },
];
