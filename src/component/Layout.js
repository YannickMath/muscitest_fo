import Header from "./Header";


export default function Layout({children, isDarkMode, setIsDarkMode, toogleDarkMode}) {
    
    return (
        <div className="w-full h-screen">
            <Header className="h-1/4" isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} toogleDarkMode={toogleDarkMode} />
            {children}
            </div>
    )
}