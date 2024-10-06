import Image from "next/image";

export default function Header({ isDarkMode }) {
  console.log("isDarkMode2 ", isDarkMode);

  const logoUrl = isDarkMode
    ? "/spotify-logo-primary-horizontal-green-background-rgb_0.png"
    : "/spotify-logo-primary-horizontal-dark-background-rgb_0.png";

  return (
    <div
      className={`w-full h-1/5 bg-fixed sticky top-0 z-10 ${
        isDarkMode ? "dark:bg-black" : "bg-white"
      }`}
      style={{
        backgroundImage: `url(${logoUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        src={logoUrl}
        alt="Spotify Logo"
        width={300}
        height={100}
        className="w-full h-full max-w-xs md:max-w-md lg:max-w-lg"
      />
    </div>
  );
}
