// @/lib/data/projects.ts
import { Globe, Code2, Palette, Zap, Server, Smartphone } from 'lucide-react'

export const projects = [
  {
    slug: "delegatespaces",
    title: "DelegateSpaces",
    category: "web",
    deviceType: "web",
    hero: "/images/portfolio/web/delegatespace.png",
    gallery: [
      "/images/portfolio/web/ds/1.png",
      "/images/portfolio/web/ds/2.png",
      "/images/portfolio/web/ds/3.png"
    ],
    demoVideo: "/videos/demo.mp4",
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
  }
]