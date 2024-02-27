import React from 'react'

const Served = ({data}: any) => {
    return (
        <div className="w-2/3 mx-auto">
            <h2 className="text-4xl font-bold text-white text-center bg-green-900 rounded-3xl p-4 w-2/3 mx-auto mt-3 mb-8">Omgeroepen</h2>
            <div className="w-2/3 py-8 bg-green-900 rounded-3xl mx-auto">
                { data.map((order: any) => {
                    return (
                        <div key={`order-` + order.id} className="w-1/2 mx-auto mb-4">
                            <h2 className="text-5xl text-slate-300 text-center rounded-3xl py-4">{order.orderNumber}</h2>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Served
