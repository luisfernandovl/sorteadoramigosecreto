import React, { PropsWithChildren, ReactNode } from "react"
import './estilos.css'

export default function Card(props: PropsWithChildren<ReactNode | undefined>) {
    return (
        <div className="card">
            {props.children}
        </div>
    )
}
