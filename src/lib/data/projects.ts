// @/lib/data/projects.ts
import { Globe, Code2, Palette, Zap, Server, Smartphone } from 'lucide-react'

export const projects = [
  {
    slug: "delegatespaces",
    title: "DelegateSpaces",
    category: "web",
    deviceType: "web",
    hero: "/images/portfolio/web/delegatespace.png",
    // adminPanel: {
    //   description: "A comprehensive management suite designed for non-technical administrators to maintain the entire digital ecosystem without touching a single line of code.",
    //   capabilities: [
    //     { 
    //       label: "Dashboard", 
    //       feature: "Real-time analytics and overview of system-wide activity at a glance.",
    //       image: "/images/portfolio/web/ds/dashboard.png" 
    //     },
    //     { 
    //       label: "Users", 
    //       feature: "Granular user management with role-based access control and activity logs.",
    //       image: "/images/portfolio/web/ds/users.png" 
    //     },
    //     { 
    //       label: "Events", 
    //       feature: "Complete event lifecycle management from creation to attendee tracking.",
    //       image: "/images/portfolio/web/ds/events.png" 
    //     },
    //     { 
    //       label: "Jobs", 
    //       feature: "Enterprise-grade career portal management and applicant tracking system.",
    //       image: "/images/portfolio/web/ds/jobs.png" 
    //     },
    //     { 
    //       label: "Notes", 
    //       feature: "Interactive Q&A engine to manage community engagement and knowledge base.",
    //       image: "/images/portfolio/web/ds/notes.png" 
    //     },
    //     { 
    //       label: "Polls", 
    //       feature: "Real-time polling system with automated data visualization and export.",
    //       image: "/images/portfolio/web/ds/polls.png" 
    //     }
    //   ]
    // },
    gallery: [
      "/images/portfolio/web/ds/1.png",
      "/images/portfolio/web/ds/2.png",
      "/images/portfolio/web/ds/3.png"
    ],
    // demoVideo: "/videos/demo.mp4",
    description: 
      "A premium digital ecosystem engineered for a global IT consultancy, focusing on high-conversion storytelling, ultra-fast performance, and a sophisticated brand identity that resonates with enterprise-level clients.",
    
    overview: 
      `DelegateSpaces was architected to serve as more than just a website—it is a digital headquarters. The primary goal was to bridge the gap between complex software solutions and executive-level decision-making. 

      The project involved creating a custom design system from the ground up, ensuring every interaction felt intentional. By leveraging Next.js App Router and Server Components, we achieved a near-instantaneous browsing experience. We focused heavily on "Information Architecture," ensuring that a CTO looking for technical depth and a CEO looking for business value could both find their answers within three clicks.`,
    
    problem: 
      `The previous digital presence faced three critical bottlenecks:
      • Credibility Gap: The design didn't reflect the high-end nature of their software engineering capabilities.
      • Performance Friction: High-resolution assets were causing significant layout shifts and slow time-to-interactive scores.
      • Lead Decay: The contact flow was generic, failing to capture specific project requirements from high-intent enterprise leads.`,
    
    solution: 
      `We implemented a "Performance-First" design philosophy. This included:
      • Hybrid Rendering: Using SSR for dynamic service pages and SSG for static educational content to ensure 100/100 Lighthouse scores.
      • Motion Storytelling: Using Framer Motion to create "Scroll-Triggered Declarations" that highlight key statistics as the user explores.
      • Enterprise Lead Funnels: A multi-step, logic-based contact system that categorizes leads by industry and budget before they even reach the sales team.`,
    
    techStack: [
      { name: "Next.js 14", icon: "Globe" },
      { name: "TypeScript", icon: "Code2" },
      { name: "TailwindCSS", icon: "Palette" },
      { name: "Framer Motion", icon: "Zap" },
      { name: "Node.js API", icon: "Server" },
      { name: "Mobile First", icon: "Smartphone" }
    ],
    
    features: [
      "Dynamic Case Study CMS for real-time project updates",
      "Interactive Tech-Stack visualization components",
      "Advanced SEO orchestration with automated Metadata generation",
      "Global Edge Middleware for localized content delivery",
      "Custom-built Iconography and 3D Asset integration",
      "Accessible UI (WCAG 2.1 compliant) for inclusive browsing"
    ],
    
    impact: [
      { 
        label: "Lead Generation", 
        value: "Convert Leads", 
        description: "Multi-step logic funnels designed to capture enterprise-grade inquiries effortlessly." 
      },
      { 
        label: "SEO Engine", 
        value: "Scale Content", 
        description: "Built-in dynamic metadata orchestration to rank high-intent keywords automatically." 
      },
      { 
        label: "Performance", 
        value: "Global Speed", 
        description: "Hybrid rendering ensures the product scales across regions without latency." 
      },
      { 
        label: "Brand Identity", 
        value: "Executive UI", 
        description: "A design system that adapts to light/dark modes while maintaining premium authority." 
      }
    ],
    link: "https://delegatespace.vercel.app/"
  },



  {
    slug: "catenally",
    title: "Catenally",
    category: "web",
    deviceType: "web",
    hero: "/images/portfolio/web/catenally.png",
  
    // adminPanel: {
    //   description: "A powerful and intuitive backend system designed to allow business owners and marketing teams to manage website content, services, and leads without any technical expertise.",
    //   capabilities: [
    //     { 
    //       label: "Dashboard", 
    //       feature: "Centralized overview of website performance, visitor insights, and lead activity.",
    //       image: "/images/portfolio/web/catenally/dashboard.png" 
    //     },
    //     { 
    //       label: "Services", 
    //       feature: "Easily manage and update all service offerings with dynamic content editing.",
    //       image: "/images/portfolio/web/catenally/services.png" 
    //     },
    //     { 
    //       label: "Leads", 
    //       feature: "Track and manage incoming business inquiries with detailed user data.",
    //       image: "/images/portfolio/web/catenally/leads.png" 
    //     },
    //     { 
    //       label: "Content", 
    //       feature: "CMS-driven sections to update homepage, about, and landing pages in real-time.",
    //       image: "/images/portfolio/web/catenally/content.png" 
    //     },
    //     { 
    //       label: "Testimonials", 
    //       feature: "Manage client feedback and success stories to build trust and credibility.",
    //       image: "/images/portfolio/web/catenally/testimonials.png" 
    //     },
    //     { 
    //       label: "Settings", 
    //       feature: "Control branding elements, SEO metadata, and global configurations.",
    //       image: "/images/portfolio/web/catenally/settings.png" 
    //     }
    //   ]
    // },
  
    gallery: [
      "/images/portfolio/web/catenally/1.png",
      "/images/portfolio/web/catenally/2.png",
      "/images/portfolio/web/catenally/3.png"
    ],
  
    // demoVideo: "/videos/demo.mp4",
  
    description: 
      "A modern, conversion-focused IT company website built to position the brand as a premium digital solutions provider. Designed with a clean UI, fast performance, and strategic content flow to convert visitors into business leads.",
  
    overview: 
      `Catenally was designed as a high-impact digital presence for an IT service company aiming to attract both startups and enterprise clients. The platform goes beyond a traditional company website by combining storytelling, performance, and lead generation into a single cohesive experience.
  
      The focus was on creating a scalable design system that maintains visual consistency across all pages while ensuring flexibility for future growth. Special attention was given to user journey mapping—ensuring that every visitor, whether technical or non-technical, can quickly understand the company's value proposition.
  
      Built using modern frontend architecture, the platform delivers a seamless browsing experience across devices, ensuring high engagement and retention.`,
  
    problem: 
      `The client faced multiple challenges with their previous website:
      • Weak First Impression: Outdated UI that failed to represent their technical expertise.
      • Low Conversion Rate: Visitors were not engaging or submitting inquiries.
      • Poor Structure: Lack of clear content hierarchy made navigation confusing.
      • Performance Issues: Slow loading speeds impacting SEO and user experience.`,
  
    solution: 
      `We approached the project with a "Conversion-Driven Design" strategy:
  
      • Modern UI System: Designed a clean, minimal, and professional interface aligned with global SaaS standards.
      • Structured Content Flow: Reorganized pages to guide users from awareness to action smoothly.
      • Optimized Performance: Implemented lazy loading, optimized assets, and efficient rendering techniques.
      • Lead Capture Optimization: Strategically placed CTAs and forms to maximize inquiry generation.
      • Responsive Design: Ensured pixel-perfect experience across mobile, tablet, and desktop devices.`,
  
    techStack: [
      { name: "Next.js", icon: "Globe" },
      { name: "TypeScript", icon: "Code2" },
      { name: "TailwindCSS", icon: "Palette" },
      { name: "Framer Motion", icon: "Zap" },
      { name: "Node.js", icon: "Server" },
      { name: "Responsive Design", icon: "Smartphone" }
    ],
  
    features: [
      "Fully responsive multi-page website with modern UI/UX",
      "Dynamic service pages with reusable components",
      "SEO-optimized structure for better search rankings",
      "Interactive animations for enhanced user engagement",
      "Optimized image and asset loading for fast performance",
      "Integrated contact forms with lead tracking system"
    ],
  
    impact: [
      { 
        label: "User Experience", 
        value: "Modern UI", 
        description: "Clean and structured design improves engagement and session duration." 
      },
      { 
        label: "Lead Generation", 
        value: "Higher Conversions", 
        description: "Optimized CTAs and forms significantly increase inquiry rates." 
      },
      { 
        label: "Performance", 
        value: "Fast Load", 
        description: "Optimized assets and architecture ensure smooth browsing experience." 
      },
      { 
        label: "Scalability", 
        value: "Future Ready", 
        description: "Flexible structure allows easy addition of new services and pages." 
      }
    ],
  
    link: "https://catenally-y5.vercel.app/"
  },



  {
    slug: "delegatehost",
    title: "DelegateHost",
    category: "web",
    deviceType: "web",
    hero: "/images/portfolio/web/delegatehost.png",
  
    // adminPanel: {
    //   description: "A streamlined hosting management system that allows administrators to control plans, users, and infrastructure services without technical complexity.",
    //   capabilities: [
    //     { 
    //       label: "Dashboard", 
    //       feature: "Overview of active users, hosting plans, revenue insights, and system health.",
    //       image: "/images/portfolio/web/delegatehost/dashboard.png" 
    //     },
    //     { 
    //       label: "Hosting Plans", 
    //       feature: "Create, update, and manage hosting packages with pricing and feature controls.",
    //       image: "/images/portfolio/web/delegatehost/plans.png" 
    //     },
    //     { 
    //       label: "Users", 
    //       feature: "Manage customer accounts, subscriptions, and activity tracking.",
    //       image: "/images/portfolio/web/delegatehost/users.png" 
    //     },
    //     { 
    //       label: "Orders", 
    //       feature: "Track hosting purchases, renewals, and billing status in real-time.",
    //       image: "/images/portfolio/web/delegatehost/orders.png" 
    //     },
    //     { 
    //       label: "Support", 
    //       feature: "Ticket-based support system to handle customer queries efficiently.",
    //       image: "/images/portfolio/web/delegatehost/support.png" 
    //     },
    //     { 
    //       label: "Settings", 
    //       feature: "Configure system-wide settings including pricing, integrations, and branding.",
    //       image: "/images/portfolio/web/delegatehost/settings.png" 
    //     }
    //   ]
    // },
  
    gallery: [
      "/images/portfolio/web/delegatehost/1.png",
      "/images/portfolio/web/delegatehost/2.png",
      "/images/portfolio/web/delegatehost/3.png"
    ],
  
    // demoVideo: "/videos/demo.mp4",
  
    description: 
      "A high-performance hosting and infrastructure services website designed to showcase plans, build trust, and convert users with a clean UI, clear pricing structures, and seamless navigation.",
  
    overview: 
      `DelegateHost was developed as a conversion-focused platform for a hosting and cloud services provider. The goal was to simplify complex hosting concepts and present them in a user-friendly and visually appealing way.
  
      The platform emphasizes clarity—users can easily understand hosting plans, compare features, and make decisions without confusion. The design system ensures consistency across all pages while maintaining flexibility for scaling services in the future.
  
      Built with modern web technologies, the website delivers a fast, responsive, and reliable experience, essential for users evaluating hosting providers.`,
  
    problem: 
      `The client faced several key issues:
      • Complex Communication: Hosting plans and technical features were difficult for non-technical users to understand.
      • Low Trust Factor: Lack of modern design and structured information reduced credibility.
      • Poor Conversion Flow: Pricing and call-to-actions were not strategically placed.
      • Performance Bottlenecks: Slow load times affected user retention and SEO rankings.`,
  
    solution: 
      `We implemented a "Clarity + Conversion" approach:
  
      • Simplified Pricing UI: Designed easy-to-compare hosting plans with clear feature breakdowns.
      • Trust-Driven Sections: Added testimonials, guarantees, and service highlights to build credibility.
      • Optimized User Flow: Structured navigation to guide users from landing → plans → checkout.
      • Performance Optimization: Used modern rendering techniques and asset optimization for fast load times.
      • Mobile Optimization: Ensured seamless experience across all devices, especially mobile users.`,
  
    techStack: [
      { name: "Next.js", icon: "Globe" },
      { name: "TypeScript", icon: "Code2" },
      { name: "TailwindCSS", icon: "Palette" },
      { name: "Framer Motion", icon: "Zap" },
      { name: "Node.js", icon: "Server" },
      { name: "Responsive Design", icon: "Smartphone" }
    ],
  
    features: [
      "Dynamic hosting plans with pricing comparison UI",
      "Fully responsive multi-page architecture",
      "SEO-optimized pages for better visibility",
      "Interactive animations for better engagement",
      "Optimized performance with fast loading speeds",
      "Integrated contact and support system"
    ],
  
    impact: [
      { 
        label: "User Understanding", 
        value: "Simplified Plans", 
        description: "Clear pricing and features help users make faster decisions." 
      },
      { 
        label: "Conversion Rate", 
        value: "More Sales", 
        description: "Optimized CTAs and structured flow improve purchase intent." 
      },
      { 
        label: "Performance", 
        value: "Fast Experience", 
        description: "Optimized assets ensure smooth and quick page loads." 
      },
      { 
        label: "Brand Trust", 
        value: "Professional Look", 
        description: "Modern UI builds credibility in a competitive hosting market." 
      }
    ],
  
    link: "https://delegatehost.vercel.app/"
  },




  {
    slug: "vsk-global-infotech",
    title: "VSK Global Infotech",
    category: "web",
    deviceType: "web",
    hero: "/images/portfolio/web/vks.png",
  
    // adminPanel: {
    //   description: "A comprehensive recruitment management system designed to streamline job postings, candidate tracking, and hiring workflows for HR teams and administrators.",
    //   capabilities: [
    //     { 
    //       label: "Dashboard", 
    //       feature: "Real-time overview of job postings, applications, and hiring metrics.",
    //       image: "/images/portfolio/web/vsk/dashboard.png" 
    //     },
    //     { 
    //       label: "Jobs", 
    //       feature: "Create, update, and manage job listings with role-specific requirements.",
    //       image: "/images/portfolio/web/vsk/jobs.png" 
    //     },
    //     { 
    //       label: "Applications", 
    //       feature: "Track candidate applications with status updates and filtering options.",
    //       image: "/images/portfolio/web/vsk/applications.png" 
    //     },
    //     { 
    //       label: "Candidates", 
    //       feature: "Centralized database of applicants with profile and resume management.",
    //       image: "/images/portfolio/web/vsk/candidates.png" 
    //     },
    //     { 
    //       label: "Employers", 
    //       feature: "Manage company profiles and job providers within the system.",
    //       image: "/images/portfolio/web/vsk/employers.png" 
    //     },
    //     { 
    //       label: "Settings", 
    //       feature: "Control platform configurations, notifications, and access permissions.",
    //       image: "/images/portfolio/web/vsk/settings.png" 
    //     }
    //   ]
    // },
  
    gallery: [
      "/images/portfolio/web/vsk/1.png",
      "/images/portfolio/web/vsk/2.png",
      "/images/portfolio/web/vsk/3.png"
    ],
  
    // demoVideo: "/videos/demo.mp4",
  
    description: 
      "A scalable job portal platform designed to connect job seekers with employers through an intuitive interface, advanced filtering, and a powerful admin system for managing the complete recruitment lifecycle.",
  
    overview: 
      `VSK Global Infotech was built as a full-featured recruitment platform aimed at simplifying the hiring process for both candidates and recruiters. The platform bridges the gap between talent and opportunity by offering a seamless job discovery and application experience.
  
      The focus was on building a structured and scalable system where users can easily browse jobs, apply with minimal friction, and track their applications. On the other side, recruiters get complete control over job listings and candidate pipelines.
  
      The system architecture ensures performance, scalability, and flexibility for future enhancements such as AI-based job recommendations and analytics.`,
  
    problem: 
      `The client faced several operational challenges:
      • Manual Hiring Process: Managing candidates and job postings manually was inefficient.
      • Poor User Experience: Existing platform lacked intuitive navigation and filtering.
      • Low Engagement: Job seekers were dropping off due to complex application flows.
      • Data Management Issues: No centralized system for tracking applicants and jobs.`,
  
    solution: 
      `We implemented a "Recruitment Automation + UX Optimization" strategy:
  
      • Smart Job Search: Advanced filtering based on role, location, and experience level.
      • Streamlined Application Flow: Simplified apply process to reduce drop-offs.
      • Admin Automation: Built a centralized dashboard for managing jobs and candidates.
      • Scalable Architecture: Designed backend to handle large volumes of users and data.
      • Performance Optimization: Ensured fast loading and smooth interaction across devices.`,
  
    techStack: [
      { name: "Next.js", icon: "Globe" },
      { name: "TypeScript", icon: "Code2" },
      { name: "TailwindCSS", icon: "Palette" },
      { name: "Framer Motion", icon: "Zap" },
      { name: "Node.js", icon: "Server" },
      { name: "Responsive Design", icon: "Smartphone" }
    ],
  
    features: [
      "Advanced job search with filters and categories",
      "Seamless job application system",
      "Admin dashboard for job and candidate management",
      "Responsive design for mobile and desktop users",
      "Optimized performance for fast browsing",
      "Scalable architecture for future enhancements"
    ],
  
    impact: [
      { 
        label: "Hiring Efficiency", 
        value: "Faster Recruitment", 
        description: "Automated workflows reduce manual hiring efforts significantly." 
      },
      { 
        label: "User Engagement", 
        value: "Higher Retention", 
        description: "Improved UX leads to longer sessions and more applications." 
      },
      { 
        label: "Data Management", 
        value: "Centralized System", 
        description: "All candidates and jobs managed in one unified platform." 
      },
      { 
        label: "Scalability", 
        value: "Future Growth", 
        description: "System designed to support expansion and new features easily." 
      }
    ],
  
    link: "https://vks-web.vercel.app/"
  },


  {
    slug: "spinny-clone",
    title: "Spinny Clone",
    category: "mvp",
    deviceType: "web",
    hero: "/images/portfolio/mvp/spinny.png",
  
    // adminPanel: {
    //   description: "A robust vehicle marketplace management system that enables administrators to control listings, pricing, inventory, and user interactions efficiently.",
    //   capabilities: [
    //     { 
    //       label: "Dashboard", 
    //       feature: "Overview of total listings, user activity, and sales insights in real-time.",
    //       image: "/images/portfolio/mvp/spinny/dashboard.png" 
    //     },
    //     { 
    //       label: "Vehicles", 
    //       feature: "Add, update, and manage car listings with specifications, images, and pricing.",
    //       image: "/images/portfolio/mvp/spinny/vehicles.png" 
    //     },
    //     { 
    //       label: "Listings", 
    //       feature: "Control listing visibility, featured cars, and promotional placements.",
    //       image: "/images/portfolio/mvp/spinny/listings.png" 
    //     },
    //     { 
    //       label: "Users", 
    //       feature: "Manage buyers and sellers with activity tracking and profile control.",
    //       image: "/images/portfolio/mvp/spinny/users.png" 
    //     },
    //     { 
    //       label: "Leads", 
    //       feature: "Track user inquiries, test drive requests, and purchase intent signals.",
    //       image: "/images/portfolio/mvp/spinny/leads.png" 
    //     },
    //     { 
    //       label: "Content", 
    //       feature: "Manage banners, homepage sections, and marketing content dynamically.",
    //       image: "/images/portfolio/mvp/spinny/content.png" 
    //     }
    //   ]
    // },
  
    gallery: [
      "/images/portfolio/mvp/spinny/1.png",
      "/images/portfolio/mvp/spinny/2.png",
      "/images/portfolio/mvp/spinny/3.png"
    ],
  
    // demoVideo: "/videos/demo.mp4",
  
    description: 
      "A feature-rich car marketplace platform inspired by modern automotive platforms, designed to provide a seamless car discovery, comparison, and buying experience with advanced filtering and interactive visuals.",
  
    overview: 
      `The Spinny Clone was developed as a scalable MVP for a digital car marketplace, focusing on delivering a premium browsing and decision-making experience for users looking to buy vehicles online.
  
      The platform combines high-quality vehicle presentation with powerful filtering capabilities, allowing users to explore cars based on price, brand, fuel type, and other specifications. A major highlight is the immersive experience through interactive 360-degree vehicle views, enhancing user confidence before purchase.
  
      Built with scalability in mind, the system is designed to evolve into a full-fledged marketplace with integrations like payments, inspections, and logistics.`,
  
    problem: 
      `The automotive marketplace domain presented multiple challenges:
      • Information Overload: Users struggled to compare multiple vehicles efficiently.
      • Low Engagement: Static images failed to provide a realistic car exploration experience.
      • Trust Issues: Lack of transparency in listings reduced buyer confidence.
      • Complex Navigation: Poor filtering systems made it hard to find relevant cars.`,
  
    solution: 
      `We implemented a "Discovery + Experience" focused approach:
  
      • Advanced Filtering System: Multi-level filters for precise vehicle search.
      • 360° Car View: Interactive visualization to simulate real-world inspection.
      • Structured Listing Pages: Clean UI with all key specifications highlighted.
      • Lead Capture System: Integrated inquiry and sharing features for better engagement.
      • Performance Optimization: Fast loading and smooth transitions for better UX.`,
  
    techStack: [
      { name: "Next.js", icon: "Globe" },
      { name: "TypeScript", icon: "Code2" },
      { name: "TailwindCSS", icon: "Palette" },
      { name: "Framer Motion", icon: "Zap" },
      { name: "Node.js", icon: "Server" },
      { name: "Responsive Design", icon: "Smartphone" }
    ],
  
    features: [
      "Advanced car filtering based on multiple attributes",
      "Interactive 360-degree vehicle view experience",
      "Detailed car listing pages with specifications",
      "User inquiry and sharing functionality",
      "Responsive and mobile-friendly design",
      "Optimized performance for fast browsing"
    ],
  
    impact: [
      { 
        label: "User Experience", 
        value: "Immersive Browsing", 
        description: "360° views and structured listings improve decision-making." 
      },
      { 
        label: "Engagement", 
        value: "Higher Interaction", 
        description: "Interactive features increase time spent on the platform." 
      },
      { 
        label: "Lead Generation", 
        value: "More Inquiries", 
        description: "Optimized inquiry flow captures high-intent users." 
      },
      { 
        label: "Scalability", 
        value: "Marketplace Ready", 
        description: "Architecture supports future expansion into full e-commerce ecosystem." 
      }
    ],
  
    link: "https://core-ecommerce-web.vercel.app/"
  },


  {
    slug: "bundle-script",
    title: "Bundle Script",
    category: "mvp",
    deviceType: "web",
    hero: "/images/portfolio/mvp/bundles.png",
  
    // adminPanel: {
    //   description: "A modular and extensible admin system that allows platform owners to manage community features, plugins, users, and business operations from a single unified dashboard.",
    //   capabilities: [
    //     { 
    //       label: "Dashboard", 
    //       feature: "Centralized overview of user activity, plugins, and platform engagement metrics.",
    //       image: "/images/portfolio/mvp/bundles/dashboard.png" 
    //     },
    //     { 
    //       label: "Users", 
    //       feature: "Manage user accounts, roles, permissions, and activity logs.",
    //       image: "/images/portfolio/mvp/bundles/users.png" 
    //     },
    //     { 
    //       label: "Plugins", 
    //       feature: "Enable, disable, and configure modules like events, jobs, and eCommerce.",
    //       image: "/images/portfolio/mvp/bundles/plugins.png" 
    //     },
    //     { 
    //       label: "Events", 
    //       feature: "Create and manage events with registrations and participation tracking.",
    //       image: "/images/portfolio/mvp/bundles/events.png" 
    //     },
    //     { 
    //       label: "Jobs", 
    //       feature: "Manage job listings and applications within the community ecosystem.",
    //       image: "/images/portfolio/mvp/bundles/jobs.png" 
    //     },
    //     { 
    //       label: "Store", 
    //       feature: "Control products, orders, and payments for the built-in eCommerce module.",
    //       image: "/images/portfolio/mvp/bundles/store.png" 
    //     }
    //   ]
    // },
  
    gallery: [
      "/images/portfolio/mvp/bundles/1.png",
      "/images/portfolio/mvp/bundles/2.png",
      "/images/portfolio/mvp/bundles/3.png"
    ],
  
    // demoVideo: "/videos/demo.mp4",
  
    description: 
      "A flexible, plugin-based community platform script designed to combine social interaction, business tools, and content management into a single scalable ecosystem.",
  
    overview: 
      `Bundle Script was developed as a modular platform that allows businesses and communities to build their own ecosystem without developing multiple separate systems.
  
      The core idea was to provide a plug-and-play architecture where features like events, job portals, and eCommerce can be activated as needed. This makes the platform highly adaptable for different use cases such as startups, educational communities, or niche networks.
  
      The system is designed with scalability and extensibility in mind, enabling future plugin integrations and feature expansion without affecting the core architecture.`,
  
    problem: 
      `The project aimed to solve key challenges:
      • Fragmented Systems: Businesses were using separate platforms for events, jobs, and store management.
      • High Development Cost: Building each feature individually required significant time and resources.
      • Lack of Flexibility: Existing solutions were rigid and not customizable.
      • User Disengagement: Switching between multiple platforms reduced user retention.`,
  
    solution: 
      `We implemented a "Modular Ecosystem" approach:
  
      • Plugin-Based Architecture: Enabled independent modules that can be activated or deactivated.
      • Unified User Experience: Single platform for multiple activities like jobs, events, and shopping.
      • Scalable Backend: Designed system to support future plugins and integrations.
      • Centralized Management: Admin panel to control all features from one place.
      • Performance Optimization: Ensured smooth performance even with multiple active modules.`,
  
    techStack: [
      { name: "Next.js", icon: "Globe" },
      { name: "TypeScript", icon: "Code2" },
      { name: "TailwindCSS", icon: "Palette" },
      { name: "Framer Motion", icon: "Zap" },
      { name: "Node.js", icon: "Server" },
      { name: "Modular Architecture", icon: "Smartphone" }
    ],
  
    features: [
      "Plugin-based system for flexible feature activation",
      "Integrated event management module",
      "Built-in job portal functionality",
      "eCommerce store integration within the platform",
      "User authentication and role-based access control",
      "Scalable architecture for future expansion"
    ],
  
    impact: [
      { 
        label: "Flexibility", 
        value: "Modular System", 
        description: "Users can enable only the features they need." 
      },
      { 
        label: "Efficiency", 
        value: "All-in-One Platform", 
        description: "Combines multiple systems into a single ecosystem." 
      },
      { 
        label: "Cost Saving", 
        value: "Reduced Development", 
        description: "Eliminates need for building separate platforms." 
      },
      { 
        label: "Scalability", 
        value: "Future Ready", 
        description: "Supports easy addition of new plugins and features." 
      }
    ],
  
    link: "https://ds-bundlescript-web.vercel.app/"
  },


  {
    slug: "just-home",
    title: "Just Home",
    category: "mvp",
    deviceType: "web",
    hero: "/images/portfolio/mvp/justhome.png",
  
    // adminPanel: {
    //   description: "A powerful real estate management system that enables administrators to manage property listings, agents, and platform content efficiently from a centralized dashboard.",
    //   capabilities: [
    //     { 
    //       label: "Dashboard", 
    //       feature: "Overview of total properties, inquiries, and platform activity in real-time.",
    //       image: "/images/portfolio/mvp/justhome/dashboard.png" 
    //     },
    //     { 
    //       label: "Properties", 
    //       feature: "Add, update, and manage property listings with images, pricing, and specifications.",
    //       image: "/images/portfolio/mvp/justhome/properties.png" 
    //     },
    //     { 
    //       label: "Listings", 
    //       feature: "Control featured properties and listing visibility across the platform.",
    //       image: "/images/portfolio/mvp/justhome/listings.png" 
    //     },
    //     { 
    //       label: "Agents", 
    //       feature: "Manage real estate agents, profiles, and assigned properties.",
    //       image: "/images/portfolio/mvp/justhome/agents.png" 
    //     },
    //     { 
    //       label: "Leads", 
    //       feature: "Track property inquiries, buyer interest, and contact requests.",
    //       image: "/images/portfolio/mvp/justhome/leads.png" 
    //     },
    //     { 
    //       label: "Content", 
    //       feature: "Update homepage banners, sections, and marketing content dynamically.",
    //       image: "/images/portfolio/mvp/justhome/content.png" 
    //     }
    //   ]
    // },
  
    gallery: [
      "/images/portfolio/mvp/justhome/1.png",
      "/images/portfolio/mvp/justhome/2.png",
      "/images/portfolio/mvp/justhome/3.png"
    ],
  
    // demoVideo: "/videos/demo.mp4",
  
    description: 
      "A modern real estate platform designed to simplify property discovery with detailed listings, intuitive navigation, and a scalable backend system for managing properties and user inquiries.",
  
    overview: 
      `Just Home was developed as a scalable real estate solution aimed at connecting buyers, sellers, and agents through a seamless digital experience.
  
      The platform focuses on presenting properties in a visually appealing and structured manner, allowing users to explore listings with complete details including images, pricing, location, and features. The goal was to reduce friction in property discovery and make the browsing experience intuitive.
  
      Built as an MVP with future scalability in mind, the system can be extended into a full marketplace with features like booking visits, payments, and advanced analytics.`,
  
    problem: 
      `The real estate domain presented several challenges:
      • Unorganized Listings: Property data was not structured properly, making it hard to browse.
      • Poor User Experience: Complicated navigation led to user drop-offs.
      • Low Lead Conversion: Inquiry flows were not optimized.
      • Manual Management: Property updates and tracking were inefficient.`,
  
    solution: 
      `We implemented a "Discovery + Conversion" strategy:
  
      • Structured Listings: Designed clean property pages with all essential details.
      • Advanced Browsing: Enabled users to explore properties easily with intuitive navigation.
      • Lead Capture System: Optimized inquiry forms to increase conversions.
      • Admin Automation: Built a centralized panel to manage listings and leads.
      • Performance Optimization: Ensured fast loading and smooth UI experience.`,
  
    techStack: [
      { name: "Next.js", icon: "Globe" },
      { name: "TypeScript", icon: "Code2" },
      { name: "TailwindCSS", icon: "Palette" },
      { name: "Framer Motion", icon: "Zap" },
      { name: "Node.js", icon: "Server" },
      { name: "Responsive Design", icon: "Smartphone" }
    ],
  
    features: [
      "Detailed property listing pages with images and specifications",
      "User-friendly navigation for property discovery",
      "Lead inquiry system for potential buyers",
      "Admin dashboard for managing properties and agents",
      "Responsive design across all devices",
      "Optimized performance for fast browsing"
    ],
  
    impact: [
      { 
        label: "User Experience", 
        value: "Easy Discovery", 
        description: "Structured listings simplify property browsing." 
      },
      { 
        label: "Lead Generation", 
        value: "More Inquiries", 
        description: "Optimized forms increase buyer engagement." 
      },
      { 
        label: "Efficiency", 
        value: "Centralized Control", 
        description: "Admins manage all properties from one dashboard." 
      },
      { 
        label: "Scalability", 
        value: "Future Expansion", 
        description: "Ready to evolve into a full real estate marketplace." 
      }
    ],
  
    link: "/maintenance"
  },


  {
    slug: "campus",
    title: "Campus",
    category: "product",
    deviceType: "mobile",
    hero: "/images/portfolio/product/campus.png",
  
    adminPanel: {
      description: "A comprehensive management suite designed for non-technical administrators to maintain the entire digital ecosystem without touching a single line of code.",
      capabilities: [
        { 
          label: "Dashboard", 
          feature: "Real-time analytics and overview of system-wide activity at a glance.",
          image: "/images/portfolio/web/ds/dashboard.png" 
        },
        { 
          label: "Users", 
          feature: "Granular user management with role-based access control and activity logs.",
          image: "/images/portfolio/web/ds/users.png" 
        },
        { 
          label: "Events", 
          feature: "Complete event lifecycle management from creation to attendee tracking.",
          image: "/images/portfolio/web/ds/events.png" 
        },
        { 
          label: "Jobs", 
          feature: "Enterprise-grade career portal management and applicant tracking system.",
          image: "/images/portfolio/web/ds/jobs.png" 
        },
        { 
          label: "Notes", 
          feature: "Interactive Q&A engine to manage community engagement and knowledge base.",
          image: "/images/portfolio/web/ds/notes.png" 
        },
        { 
          label: "Polls", 
          feature: "Real-time polling system with automated data visualization and export.",
          image: "/images/portfolio/web/ds/polls.png" 
        }
      ]
    },
  
    gallery: [
      "/images/portfolio/product/campus/1.png",
      "/images/portfolio/product/campus/2.png",
      "/images/portfolio/product/campus/3.png"
    ],
  
    // demoVideo: "/videos/demo.mp4",
  
    description: 
      "A full-scale community platform designed as a mobile-first product that combines social networking, job discovery, events, and content sharing into a single unified ecosystem.",
  
    overview: 
      `Campus was conceptualized as a next-generation community platform aimed at students, professionals, and niche groups who want to connect, collaborate, and grow within a single digital space.
  
      Unlike traditional apps that focus on one feature, Campus integrates multiple engagement layers such as social feeds, job portals, events, blogs, and polls—creating a highly interactive and sticky user experience.
  
      Built with a product-first mindset, the platform is designed to scale into a full SaaS ecosystem, supporting multiple communities, institutions, or organizations under one system.`,
  
    problem: 
      `The platform addresses several key challenges:
      • Fragmented Experience: Users relied on multiple apps for networking, jobs, and events.
      • Low Engagement: Standalone platforms struggled to retain users.
      • Lack of Community Tools: No unified solution for managing and growing communities.
      • Manual Operations: Community admins lacked tools to manage users and content effectively.`,
  
    solution: 
      `We implemented a "Unified Community Ecosystem" strategy:
  
      • All-in-One Platform: Combined social, professional, and informational features.
      • Engagement-Driven Design: Features like polls, posts, and events to keep users active.
      • Scalable Architecture: Built to support multiple communities and large user bases.
      • Admin Automation: Centralized system to manage all platform activities.
      • Mobile-First Approach: Optimized for seamless mobile interaction and performance.`,
  
    techStack: [
      { name: "Flutter (Mobile App)", icon: "Smartphone" },
      { name: "Next.js (Web Panel)", icon: "Globe" },
      { name: "TypeScript", icon: "Code2" },
      { name: "Node.js", icon: "Server" },
      { name: "Firebase", icon: "Zap" },
      { name: "Responsive Design", icon: "Palette" }
    ],
  
    features: [
      "Social feed with posts, likes, and discussions",
      "Integrated job portal within the community",
      "Event management and participation tracking",
      "Polls and blogs for user engagement",
      "User authentication and profile management",
      "Admin panel for complete platform control"
    ],
  
    impact: [
      { 
        label: "User Engagement", 
        value: "High Retention", 
        description: "Multiple features keep users active within one platform." 
      },
      { 
        label: "Community Growth", 
        value: "Scalable Network", 
        description: "Supports expansion across multiple groups and institutions." 
      },
      { 
        label: "Product Value", 
        value: "All-in-One App", 
        description: "Replaces multiple apps with a single unified solution." 
      },
      { 
        label: "Monetization Ready", 
        value: "SaaS Potential", 
        description: "Can be scaled into a subscription-based product." 
      }
    ],
  
    link: "https://delegatecampus1.vercel.app/"
  },



  {
    slug: "task-manager",
    title: "Task Manager",
    category: "product",
    deviceType: "web",
    hero: "/images/portfolio/product/taskmanager.png",
  
    // adminPanel: {
    //   description: "A comprehensive team management system that enables organizations to control projects, employees, and workflows through a centralized and scalable admin dashboard.",
    //   capabilities: [
    //     { 
    //       label: "Dashboard", 
    //       feature: "Real-time overview of team productivity, active tasks, and project progress.",
    //       image: "/images/portfolio/product/taskmanager/dashboard.png" 
    //     },
    //     { 
    //       label: "Projects", 
    //       feature: "Create and manage projects with task allocation, deadlines, and progress tracking.",
    //       image: "/images/portfolio/product/taskmanager/projects.png" 
    //     },
    //     { 
    //       label: "Tasks", 
    //       feature: "Detailed task management with statuses, priorities, and assignments.",
    //       image: "/images/portfolio/product/taskmanager/tasks.png" 
    //     },
    //     { 
    //       label: "Employees", 
    //       feature: "Manage team members, roles, permissions, and performance tracking.",
    //       image: "/images/portfolio/product/taskmanager/employees.png" 
    //     },
    //     { 
    //       label: "Attendance & Leave", 
    //       feature: "Track employee attendance and manage leave requests efficiently.",
    //       image: "/images/portfolio/product/taskmanager/attendance.png" 
    //     },
    //     { 
    //       label: "Reports", 
    //       feature: "Generate productivity reports and insights for better decision-making.",
    //       image: "/images/portfolio/product/taskmanager/reports.png" 
    //     }
    //   ]
    // },
  
    gallery: [
      "/images/portfolio/product/taskmanager/1.png",
      "/images/portfolio/product/taskmanager/2.png",
      "/images/portfolio/product/taskmanager/3.png"
    ],
  
    // demoVideo: "/videos/demo.mp4",
  
    description: 
      "A scalable productivity and team management platform inspired by modern workflow tools, designed to help teams manage projects, track performance, and streamline daily operations in a single system.",
  
    overview: 
      `Task Manager was built as a complete productivity solution aimed at teams and organizations that need better control over their workflows and internal operations.
  
      The platform combines project management, task tracking, employee monitoring, and attendance systems into one unified interface. Unlike traditional tools that focus only on tasks, this system provides a holistic view of team productivity.
  
      Designed with a product-first approach, it has strong potential to evolve into a full SaaS platform competing with industry tools by offering simplicity and customization.`,
  
    problem: 
      `The project addresses several common challenges faced by teams:
      • Fragmented Tools: Teams were using separate tools for tasks, attendance, and communication.
      • Lack of Visibility: Managers struggled to track progress and productivity.
      • Inefficient Workflows: Manual tracking led to delays and miscommunication.
      • Poor Team Coordination: No centralized system for collaboration and updates.`,
  
    solution: 
      `We implemented a "Unified Productivity System" approach:
  
      • Centralized Dashboard: One place to monitor all team activities.
      • Smart Task Management: Organized workflows with clear task ownership.
      • Employee Tracking: Integrated attendance and leave management.
      • Reporting System: Insights into team performance and project status.
      • Scalable Architecture: Designed for growing teams and organizations.`,
  
    techStack: [
      { name: "Next.js", icon: "Globe" },
      { name: "TypeScript", icon: "Code2" },
      { name: "TailwindCSS", icon: "Palette" },
      { name: "Node.js", icon: "Server" },
      { name: "MongoDB", icon: "Zap" },
      { name: "Responsive Design", icon: "Smartphone" }
    ],
  
    features: [
      "Project and task management system",
      "Task assignment with priorities and deadlines",
      "Employee attendance and leave tracking",
      "Role-based access control system",
      "Real-time dashboard with productivity insights",
      "Reports and analytics for performance tracking"
    ],
  
    impact: [
      { 
        label: "Team Productivity", 
        value: "Better Workflow", 
        description: "Centralized system improves efficiency and task completion." 
      },
      { 
        label: "Management Control", 
        value: "Full Visibility", 
        description: "Managers can track projects and employee performance easily." 
      },
      { 
        label: "Operational Efficiency", 
        value: "All-in-One Tool", 
        description: "Reduces dependency on multiple tools." 
      },
      { 
        label: "Scalability", 
        value: "SaaS Ready", 
        description: "Built to scale into a full productivity platform." 
      }
    ],
  
    link: "https://ds-task-manager-web.vercel.app/"
  },



  {
    slug: "social-media",
    title: "Social Media",
    category: "mobile",
    deviceType: "mobile",
    hero: "/images/portfolio/mobile/social.png",
  
    // adminPanel: {
    //   description: "A scalable moderation and content management system that allows administrators to oversee user activity, manage content, and maintain platform quality.",
    //   capabilities: [
    //     { 
    //       label: "Dashboard", 
    //       feature: "Overview of user activity, posts, engagement metrics, and platform growth.",
    //       image: "/images/portfolio/mobile/social/dashboard.png" 
    //     },
    //     { 
    //       label: "Users", 
    //       feature: "Manage user profiles, reports, bans, and account verification.",
    //       image: "/images/portfolio/mobile/social/users.png" 
    //     },
    //     { 
    //       label: "Posts", 
    //       feature: "Moderate user-generated content including images, captions, and comments.",
    //       image: "/images/portfolio/mobile/social/posts.png" 
    //     },
    //     { 
    //       label: "Comments", 
    //       feature: "Control and monitor user interactions to maintain community standards.",
    //       image: "/images/portfolio/mobile/social/comments.png" 
    //     },
    //     { 
    //       label: "Reports", 
    //       feature: "Handle flagged content and user reports efficiently.",
    //       image: "/images/portfolio/mobile/social/reports.png" 
    //     },
    //     { 
    //       label: "Settings", 
    //       feature: "Configure platform rules, privacy settings, and engagement features.",
    //       image: "/images/portfolio/mobile/social/settings.png" 
    //     }
    //   ]
    // },
  
    gallery: [
      "/images/portfolio/mobile/social/1.png",
      "/images/portfolio/mobile/social/2.png",
      "/images/portfolio/mobile/social/3.png"
    ],
  
    // demoVideo: "/videos/demo.mp4",
  
    description: 
      "A modern social media mobile application designed to deliver a seamless content-sharing and interaction experience with real-time engagement, intuitive UI, and scalable architecture.",
  
    overview: 
      `Social Media was developed as a mobile-first platform inspired by modern social networking apps, focusing on user engagement, content discovery, and seamless interaction.
  
      The application allows users to create and share posts, explore trending content, and interact through likes, comments, and profiles. The goal was to build a highly engaging and visually appealing experience that encourages continuous user interaction.
  
      Designed with scalability in mind, the platform can evolve into a full-scale social network with features like messaging, reels, and AI-based recommendations.`,
  
    problem: 
      `Building a social platform involves multiple challenges:
      • High Engagement Demand: Users expect real-time interactions and smooth performance.
      • Content Management: Handling large volumes of user-generated content efficiently.
      • Retention Issues: Keeping users active and engaged over time.
      • Scalability: Supporting a growing user base without performance degradation.`,
  
    solution: 
      `We implemented an "Engagement-First Architecture":
  
      • Real-Time Interactions: Instant likes, comments, and updates.
      • Optimized Feed System: Smooth scrolling and dynamic content loading.
      • Scalable Backend: Designed to handle high concurrency and data flow.
      • Clean UI/UX: Familiar and intuitive interface inspired by leading platforms.
      • Performance Optimization: Ensured fast loading and responsive interactions.`,
  
    techStack: [
      { name: "Flutter", icon: "Smartphone" },
      { name: "Firebase", icon: "Zap" },
      { name: "Node.js", icon: "Server" },
      { name: "TypeScript", icon: "Code2" },
      { name: "REST APIs", icon: "Globe" },
      { name: "Responsive UI", icon: "Palette" }
    ],
  
    features: [
      "User authentication and profile management",
      "Post creation with images and captions",
      "Like and comment system with real-time updates",
      "Explore feed for discovering new content",
      "Responsive and smooth mobile UI experience",
      "Admin moderation system for content control"
    ],
  
    impact: [
      { 
        label: "User Engagement", 
        value: "High Interaction", 
        description: "Real-time features increase user activity and retention." 
      },
      { 
        label: "Scalability", 
        value: "Growth Ready", 
        description: "Architecture supports expansion to large user bases." 
      },
      { 
        label: "User Experience", 
        value: "Smooth UI", 
        description: "Optimized performance ensures seamless interactions." 
      },
      { 
        label: "Product Potential", 
        value: "Social Platform", 
        description: "Can evolve into a full-featured social networking app." 
      }
    ],
  
    link: "/maintenance"
  },



  {
    slug: "carplay",
    title: "Carplay",
    category: "mobile",
    deviceType: "mobile",
    hero: "/images/portfolio/mobile/carplay.png",
  
    // adminPanel: {
    //   description: "A lightweight backend control system designed to manage app configurations, content delivery, and user preferences for a seamless in-car experience.",
    //   capabilities: [
    //     { 
    //       label: "Dashboard", 
    //       feature: "Overview of app usage, active sessions, and interaction analytics.",
    //       image: "/images/portfolio/mobile/carplay/dashboard.png" 
    //     },
    //     { 
    //       label: "Content", 
    //       feature: "Manage media, navigation data, and dynamic content shown in the app.",
    //       image: "/images/portfolio/mobile/carplay/content.png" 
    //     },
    //     { 
    //       label: "Users", 
    //       feature: "Monitor user activity and preferences across the platform.",
    //       image: "/images/portfolio/mobile/carplay/users.png" 
    //     },
    //     { 
    //       label: "Integrations", 
    //       feature: "Configure APIs for maps, media streaming, and third-party services.",
    //       image: "/images/portfolio/mobile/carplay/integrations.png" 
    //     },
    //     { 
    //       label: "Settings", 
    //       feature: "Control app behavior, permissions, and system-level configurations.",
    //       image: "/images/portfolio/mobile/carplay/settings.png" 
    //     }
    //   ]
    // },
  
    gallery: [
      "/images/portfolio/mobile/carplay/1.png",
      "/images/portfolio/mobile/carplay/2.png",
      "/images/portfolio/mobile/carplay/3.png"
    ],
  
    // demoVideo: "/videos/demo.mp4",
  
    description: 
      "A native iOS application with Apple CarPlay integration, designed to deliver a safe, distraction-free, and intuitive in-car experience for navigation, media, and essential interactions.",
  
    overview: 
      `Carplay was developed as a specialized iOS application that integrates seamlessly with Apple CarPlay, enabling users to interact with core app features directly from their vehicle’s infotainment system.
  
      The focus was on creating a minimal, distraction-free interface that adheres to Apple's strict CarPlay design guidelines while ensuring usability and performance. The app allows drivers to access navigation, media controls, and essential services without compromising safety.
  
      Built using native iOS technologies, the application demonstrates deep platform-level integration and real-world usability in automotive environments.`,
  
    problem: 
      `Developing for in-car systems introduces unique challenges:
      • Safety Constraints: Interfaces must minimize driver distraction.
      • Platform Restrictions: Apple CarPlay has strict UI/UX guidelines.
      • Limited Interaction: Reduced touch and input capabilities.
      • Performance Requirements: Real-time responsiveness is critical.`,
  
    solution: 
      `We implemented a "Safety-First UX + Native Integration" approach:
  
      • CarPlay Optimized UI: Designed simplified layouts with large touch targets.
      • Voice & Minimal Input: Reduced dependency on manual interaction.
      • Native iOS Integration: Leveraged Apple frameworks for seamless performance.
      • Real-Time Updates: Ensured smooth navigation and media control.
      • Compliance with Guidelines: Followed Apple CarPlay standards strictly.`,
  
    techStack: [
      { name: "Swift (iOS)", icon: "Smartphone" },
      { name: "Apple CarPlay Framework", icon: "Globe" },
      { name: "UIKit / SwiftUI", icon: "Palette" },
      { name: "AVFoundation", icon: "Zap" },
      { name: "Node.js API", icon: "Server" },
      { name: "REST APIs", icon: "Code2" }
    ],
  
    features: [
      "Apple CarPlay integration for in-car usage",
      "Navigation and route assistance support",
      "Media playback and control functionality",
      "Minimal and distraction-free UI design",
      "Real-time interaction with vehicle interface",
      "Optimized performance for automotive environments"
    ],
  
    impact: [
      { 
        label: "User Safety", 
        value: "Distraction-Free", 
        description: "Simplified UI ensures safe interaction while driving." 
      },
      { 
        label: "Technical Depth", 
        value: "Advanced iOS", 
        description: "Demonstrates deep integration with Apple ecosystem." 
      },
      { 
        label: "User Experience", 
        value: "Seamless Control", 
        description: "Smooth interaction between mobile app and car system." 
      },
      { 
        label: "Product Potential", 
        value: "Automotive Tech", 
        description: "Can evolve into a full in-car digital assistant platform." 
      }
    ],
  
    link: "/maintenance"
  },



  {
    slug: "music-player",
    title: "Music Player",
    category: "mobile",
    deviceType: "mobile",
    hero: "/images/portfolio/mobile/music.png",
  
    // adminPanel: {
    //   description: "A centralized content management system designed to manage music libraries, playlists, and user activity while ensuring smooth media delivery across platforms.",
    //   capabilities: [
    //     { 
    //       label: "Dashboard", 
    //       feature: "Overview of total songs, users, streams, and platform activity.",
    //       image: "/images/portfolio/mobile/music/dashboard.png" 
    //     },
    //     { 
    //       label: "Songs", 
    //       feature: "Upload, update, and manage music tracks with metadata and media files.",
    //       image: "/images/portfolio/mobile/music/songs.png" 
    //     },
    //     { 
    //       label: "Playlists", 
    //       feature: "Create and manage playlists for curated user experiences.",
    //       image: "/images/portfolio/mobile/music/playlists.png" 
    //     },
    //     { 
    //       label: "Users", 
    //       feature: "Manage user accounts, listening history, and preferences.",
    //       image: "/images/portfolio/mobile/music/users.png" 
    //     },
    //     { 
    //       label: "Analytics", 
    //       feature: "Track song performance, streams, and user engagement metrics.",
    //       image: "/images/portfolio/mobile/music/analytics.png" 
    //     },
    //     { 
    //       label: "Settings", 
    //       feature: "Control streaming configurations, app settings, and integrations.",
    //       image: "/images/portfolio/mobile/music/settings.png" 
    //     }
    //   ]
    // },
  
    gallery: [
      "/images/portfolio/mobile/music/1.png",
      "/images/portfolio/mobile/music/2.png",
      "/images/portfolio/mobile/music/3.png"
    ],
  
    // demoVideo: "/videos/demo.mp4",
  
    description: 
      "A cross-platform mobile music player application designed to deliver seamless audio streaming, background playback, and an intuitive listening experience across iOS and Android devices.",
  
    overview: 
      `Music Player was developed as a modern audio streaming application focused on delivering a smooth and uninterrupted listening experience.
  
      The platform allows users to browse songs, create playlists, and control playback with features like background play and notification controls. The goal was to build a responsive and user-friendly music app that handles real-time audio streaming efficiently.
  
      Designed with scalability in mind, the system can evolve into a full-fledged music streaming service with features like recommendations, offline downloads, and subscriptions.`,
  
    problem: 
      `Building a music streaming app involves several challenges:
      • Audio Performance: Ensuring smooth playback without buffering.
      • Background Handling: Managing playback while the app is minimized.
      • Media Management: Handling large volumes of audio files efficiently.
      • User Experience: Providing intuitive controls for playback and navigation.`,
  
    solution: 
      `We implemented a "Seamless Audio Experience" strategy:
  
      • Optimized Audio Engine: Smooth playback with minimal buffering.
      • Background Playback: Music continues even when the app is not active.
      • Notification Controls: Play, pause, and skip directly from notifications.
      • Efficient Media Handling: Structured storage and fast loading of audio files.
      • Cross-Platform Support: Consistent experience across iOS and Android.`,
  
    techStack: [
      { name: "Flutter", icon: "Smartphone" },
      { name: "Firebase Storage", icon: "Zap" },
      { name: "Node.js", icon: "Server" },
      { name: "AVFoundation (iOS)", icon: "Code2" },
      { name: "Audio Plugins", icon: "Globe" },
      { name: "Responsive UI", icon: "Palette" }
    ],
  
    features: [
      "Audio streaming with smooth playback",
      "Background music play functionality",
      "Notification-based playback controls",
      "Playlist creation and management",
      "Cross-platform support (iOS & Android)",
      "Admin panel for managing songs and content"
    ],
  
    impact: [
      { 
        label: "User Experience", 
        value: "Seamless Playback", 
        description: "Smooth audio streaming enhances listening experience." 
      },
      { 
        label: "Engagement", 
        value: "Continuous Usage", 
        description: "Background play keeps users engaged longer." 
      },
      { 
        label: "Technical Capability", 
        value: "Media Handling", 
        description: "Efficient handling of audio streaming and storage." 
      },
      { 
        label: "Scalability", 
        value: "Streaming Platform", 
        description: "Ready to evolve into a full music streaming service." 
      }
    ],
  
    link: "/maintenance"
  }
]




// const categories = [
//   { label: 'All Work', value: 'all' },
//   { label: 'Web Platforms', value: 'web' }, // DelegateSpace, Catanarry, DeleateHost, VKS 
//   { label: 'MVP', value: 'mvp' }, // Spinny Clone, Social Media Clone, Bundle script, just home
//   { label: 'Mobile Apps', value: 'mobile' }, // Music Player, Social Media app, Car Play, Muslim pro
//   { label: 'Products', value: 'product' }, // DelegateCampus, Task Manager
// ]

// const projects = [
//   {
//     id: 1,
//     title: 'DelegateSpaces',
//     category: 'web',
//     image: '/images/portfolio/web/delegatespace.png',
//     link: 'https://delegatespace.vercel.app/',
//     description: 'A modern multi-page website for an IT company that provides software development and technology services. The platform highlights company offerings, solutions, and expertise with a clean design, responsive layout, and well-structured pages for a professional digital presence.'
//   },

//   {
//     id: 2,
//     title: 'Catenally',
//     category: 'web',
//     image: '/images/portfolio/web/catenally.png',
//     link: 'https://catenally-y5.vercel.app/',
//     description: 'A modern multi-page IT company website designed to showcase software solutions and services. The platform includes a sleek UI with both light and dark themes, responsive design, and well-organized sections that help businesses present their services professionally.'
//   },

//   {
//     id: 3,
//     title: 'DelegateHost',
//     category: 'web',
//     image: '/images/portfolio/web/delegatehost.png',
//     link: 'https://delegatehost.vercel.app/',
//     description: 'A complete multi-page website for a hosting and technology services provider. It presents hosting plans, technical services, and support features with a modern design, structured pages, and responsive layout to ensure a seamless browsing experience.'
//   },

//   {
//     id: 4,
//     title: 'VSK Global Infotech',
//     category: 'web',
//     image: '/images/portfolio/web/vks.png',
//     link: 'https://vks-web.vercel.app/',
//     description: 'A job portal website for a recruitment and job provider company. Users can search, explore, and apply for job opportunities while the admin panel allows administrators to manage job listings, applications, and candidate data efficiently.'
//   },

//   {
//     id: 5,
//     title: 'Spinny Clone',
//     category: 'mvp',
//     image: '/images/portfolio/mvp/spinny.png',
//     link: 'https://core-ecommerce-web.vercel.app/',
//     description: 'A car marketplace platform inspired by Spinny, featuring advanced car listings, detailed filtering options, and interactive 360-degree vehicle views. The system includes sharing features and a powerful admin panel to manage vehicles, listings, and platform content.'
//   },

//   {
//     id: 6,
//     title: 'Bundle Script',
//     category: 'mvp',
//     image: '/images/portfolio/mvp/bundles.png',
//     link: 'https://ds-bundlescript-web.vercel.app/',
//     description: 'A community platform script designed to connect people and manage multiple activities in one place. It supports plugins such as event management, job listings, and eCommerce store features along with user authentication, making it a flexible community-building solution.'
//   },

//   {
//     id: 7,
//     title: 'Just Home',
//     category: 'mvp',
//     image: '/images/portfolio/mvp/justhome.png',
//     link: '/maintenance',
//     description: 'A real estate software solution with a multi-page website that showcases property listings with detailed property pages. The platform includes an admin panel for managing properties, listings, and updates, making property discovery simple and efficient.'
//   },

//   {
//     id: 8,
//     title: 'Campus',
//     category: 'product',
//     image: '/images/portfolio/product/campus.png',
//     link: 'https://delegatecampus1.vercel.app/',
//     description: 'A complete community mobile application with an integrated admin panel. The platform enables users to connect, share updates, and access features such as job postings, events, blogs, polls, and discussions within a single interactive environment.'
//   },

//   {
//     id: 9,
//     title: 'Task Manager',
//     category: 'product',
//     image: '/images/portfolio/product/taskmanager.png',
//     link: 'https://ds-task-manager-web.vercel.app/',
//     description: 'A productivity platform similar to Jira that helps teams manage projects and daily work efficiently. It includes task management, leave tracking, attendance monitoring, and multiple collaboration features, supported by a powerful admin control system.'
//   },

//   {
//     id: 10,
//     title: 'Social Media',
//     category: 'mobile',
//     image: '/images/portfolio/mobile/social.png',
//     link: '/maintenance',
//     description: 'A social media mobile application inspired by platforms like Instagram. It allows users to share posts, connect with others, explore content, and interact through likes, comments, and profiles within a modern and user-friendly mobile experience.'
//   },

//   {
//     id: 11,
//     title: 'Carplay',
//     category: 'mobile',
//     image: '/images/portfolio/mobile/carplay.png',
//     link: '/maintenance',
//     description: 'A native iOS application built with Apple CarPlay integration, designed to provide a safe and convenient in-car experience. The app enables drivers to access key features, navigation support, and media functionality directly from the vehicle interface.'
//   },

//   {
//     id: 12,
//     title: 'Music Player',
//     category: 'mobile',
//     image: '/images/portfolio/mobile/music.png',
//     link: '/maintenance',
//     description: 'A cross-platform mobile music player application for iOS and Android that allows users to stream and play music seamlessly. The platform includes core music features along with an admin panel to manage songs, content, and application settings.'
//   }
// ]