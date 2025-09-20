import Hero from './Hero'
import LatestUpdates from './LatestUpdates'
import PopularToday from './PopularToday'

function Home() {
    return (
        <main>
            <Hero />
            <PopularToday />
            <LatestUpdates />
        </main>
    )
}

export default Home
