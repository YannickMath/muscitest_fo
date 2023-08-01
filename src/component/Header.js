


export default function Header({isDarkMode}) {
    console.log("isDarkMode2 ", isDarkMode)
    return (
        <div className="bg-fixed w-full h-1/5 dark:bg-black bg-white" 
            style={{backgroundImage: isDarkMode ? "url(/Colored_Full_White@2x.png)" : "url(/Colored_Full_Black@2x.png)",
            backgroundPosition: "center",
            backgroundSize: "contain",
            // backgroundRepeat: "no-repeat",
            // display: "inline-block"
            }}>
                
        </div>
    )
}
