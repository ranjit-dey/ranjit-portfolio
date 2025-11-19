import React, { useEffect, useState } from 'react'

export default function Loader({ title = 'loading' }) {
    const [progress, setProgress] = useState(6)

    useEffect(() => {
        let id = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(id)
                    return 100
                }
                return Math.min(100, p + Math.floor(Math.random() * 10))
            })
        }, 160)
        return () => clearInterval(id)
    }, [])

    return (
        <div className="loader-wrap">
            <div className="loader-card">
                <div className="text-xl font-bold">{title}</div>
                <div className="text-xs text-gray-500">Loading portfolio</div>
                <div className="loader-bar mt-3">
                    <div className="loader-progress" style={{ width: `${progress}%` }} />
                </div>
                <div className="text-xs text-gray-600">{progress}%</div>
            </div>
        </div>
    )
}
