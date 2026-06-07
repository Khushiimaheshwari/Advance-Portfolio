interface ProfileType {
  name: string;
  roles: (string | number)[];
  email: string;
  linkedin: string;
  github: string;
  resume: string;
}

const PROFILE: ProfileType = {
  name: "Khushi Maheshwari",
  roles: [
    "Software Developer",
    1500,
    "Full Stack Developer",
    1500,
    "Backend Developer",
    1500,
    "Frontend Developer",
    1500,
  ],
  email: "khushimaheshwari35official@gmail.com",
  linkedin: "https://www.linkedin.com/in/khushimaheshwari04/",
  github: "https://github.com/Khushiimaheshwari",
  resume: "/KhushiMaheshwari_Resume.pdf",
};

export default PROFILE;