

const Logo = () => {
    return (

        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="68" viewBox="0 0 420 88" role="img" aria-labelledby="title">
                <title id="title">CelestialScans Manga Logo</title>

                {/* <!-- Gradient defs --> */}
                <defs>
                    <linearGradient id="accent" x1="0" x2="1">
                        <stop offset="0" stopColor="#7fb3ff" />
                        <stop offset="1" stopColor="#5f95ff" />
                    </linearGradient>
                    <linearGradient id="textFade" x1="0" x2="1">
                        <stop offset="0" stopColor="#ffffff" />
                        <stop offset="1" stopColor="#dbeafc" />
                    </linearGradient>
                </defs>

                {/* <!-- Icon: moon + manga panel scanlines --> */}
                <g transform="translate(16,12)">
                    {/* <!-- dark bg circle --> */}
                    <circle cx="32" cy="32" r="32" fill="#0f1724" stroke="url(#accent)" strokeWidth="2" />
                    {/* <!-- crescent --> */}
                    <path d="M42 22c-5.8-8.4-17.2-11.0-26-5.5 4.4 2.8 7.6 7.9 8.2 13.8 0.7 7.3-3.2 14.3-10.5 16.7 8.6 3.7 18.7-0.6 24.7-9.4 3.8-5.7 3.6-13.3 0.9-15.6z"
                        fill="url(#accent)" opacity="0.95" />
                    {/* <!-- manga scanlines --> */}
                    <g stroke="#ffffff" strokeWidth="2" opacity="0.12">
                        <line x1="10" y1="18" x2="54" y2="18" />
                        <line x1="10" y1="26" x2="54" y2="26" />
                        <line x1="10" y1="34" x2="54" y2="34" />
                        <line x1="10" y1="42" x2="54" y2="42" />
                    </g>
                </g>

                {/* <!-- Wordmark --> */}
                <text x="96" y="56" fontFamily="Impact, 'Anton', 'Bebas Neue', sans-serif"
                    fontSize="34" fontWeight="700" fill="url(#textFade)" letterSpacing="1">
                    Celestial<tspan fill="url(#accent)">Scans</tspan>
                </text>
            </svg>


        </>
    )
}


export default Logo