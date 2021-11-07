type committee =
  | "Studio"
  | "ICPC"
  | "Design"
  | "Cyber"
  | "TeachLA"
  | "W"
  | "AI"
  | "Hack"
  | "JEDI"
  | "Impact";

enum Committees {
  "Studio" = "Studio",
  "ICPC" = "ICPC",
  "Design" = "Design",
  "Cyber" = "Cyber",
  "TeachLA" = "TeachLA",
  "W" = "W",
  "AI" = "AI",
  "Hack" = "Hack",
  "JEDI" = "JEDI",
  "Impact" = "Impact",
  "Internal" = "Internal",
}

export interface PageInfo {
  url: string;
  description: string;
  statusPath?: string;
}

type CommitteeSites = {
  [committee in Committees]?: PageInfo[];
};

type CommitteeSiteHashType = {
  [committee in Committees]?: boolean;
};

export const committees = Object.keys(Committees);

export const sites: CommitteeSites = {
  Internal: [
    {
      description:
        "The official website for ACM at UCLA, the largest tech community on campus!",
      url: "https://www.uclaacm.com",
    },
    {
      description: "Vanity URL creator for ACM",
      url: "http://links.uclaacm.com",
    },
  ],
  TeachLA: [
    {
      description: "🌱a website showcasing how awesome Teach LA is!",
      url: "https://teachla.uclaacm.com",
    },
  ],
  Hack: [
    {
      description: "Official website of ACM Hack",
      url: "https://hack.uclaacm.com",
    },
  ],
  ICPC: [
    {
      description: "Official Website for ACM ICPC at UCLA",
      url: "https://icpc.uclaacm.com/",
    },
  ],
  W: [
    {
      description: "Official Website of ACM-W at UCLA",
      url: "https://w.uclaacm.com",
    },
  ],
  AI: [
    {
      description: "ACM AI's tech blog",
      url: "https://uclaacmai.github.io",
    },
  ],
  Cyber: [
    {
      description: "CTF Platform!",
      url: "https://acmcyber.com",
    },
  ],
  Design: [
    {
      description:
        "Foundational guidelines for developers and designers on how to represent ACM's identity, created by the ACM Design Team",
      url: "https://design.uclaacm.com",
    },
  ],
  Impact: [
    {
      description: "Official Page of ACM's Impact Initiative",
      url: "https://acm.cs.ucla.edu",
    },
  ],
  JEDI: [
    {
      description: "Official Page of ACM's JEDI Initiative",
      url: "https://acm.cs.ucla.edu",
    },
  ],
};
