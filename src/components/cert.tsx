interface CertType {
  name: string;
  org: string;
  year: string;
}

const CERTS: CertType[] = [
  { name: "Technology Software Development Job Simulation", org: "Forage - Citi", year: "2025" },
  { name: "Microsoft Certified: Azure Fundamentals", org: "Microsoft", year: "2025" },
];

export default CERTS;
export type { CertType };