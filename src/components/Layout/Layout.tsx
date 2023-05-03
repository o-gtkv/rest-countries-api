import { PropsWithChildren } from 'react'
import Header from '../Header/Header'

export default function Layout(props: PropsWithChildren) {
    return (
        <>
            <Header />
            <main>
                {props.children}
            </main>
        </>
    )
}
