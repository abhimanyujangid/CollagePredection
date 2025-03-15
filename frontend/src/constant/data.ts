const landingPageLinks: INavLink[] = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Features", path: "/features" },
    { id: 3, name: "How It Works", path: "/how-it-works" },
    { id: 4, name: "Get Started", path: "/get-started" },
    { id: 5, name: "Colleges", path: "/colleges" },
    { id: 6, name: "FAQ", path: "/faq" },
    { id: 7, name: "Contact", path: "/contact" },
  ];

export interface INavLink {
  id: number;
  name: string;
  path: string;
}







export { landingPageLinks };