


export default function Header({isDarkMode}) {
    console.log("isDarkMode2 ", isDarkMode)
    return (
        <div className="bg-fixed w-full h-1/5 dark:bg-black bg-white sticky top-0 z-5"
            style={{backgroundImage: isDarkMode ? "url(/spotify-logo-primary-horizontal-green-background-rgb_0.png)" :"url(/spotify-logo-primary-horizontal-dark-background-rgb_0.png)",
            backgroundPosition: "center",
            backgroundSize: "contain",
            // backgroundRepeat: "no-repeat",
            // display: "inline-block"
            }}>

        </div>
    )
}
