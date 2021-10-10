import React from 'react'

export default function Alert(props) {
    const capatalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    const { alert } = props;
    return (
        <div style={{ height: '50px' }}>
            {alert && <div className={`alert alert-${alert.type}`} role="alert">
                <strong>{alert.type === "danger" ? "Error" : capatalize(alert.type)}:</strong> {alert.message}
            </div>}
        </div>
    )
}
