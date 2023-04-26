import { Layout } from './components'
import { CountryPage, HomePage } from './pages'
import { Routes, Route } from "react-router-dom"

function App(): JSX.Element {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/country/:name" element={<CountryPage />} />
                <Route path="*" element={<div>Not Found</div>} />
            </Routes>
        </Layout>
    )
}

export default App
